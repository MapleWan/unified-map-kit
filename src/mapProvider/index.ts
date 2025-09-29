import { IInitMapOptions, IMapProvider } from "../types/MapProviderInterface";
import {
  MapProviderServiceEnum,
  MapProviderEnum,
} from "../types/MapIndexInterface";
import {
  IUnifiedMapMarkerOptions,
  IUnifiedPolylineOptions,
  IUnifiedPolygonOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
  IUnifiedSearchByKeywordOptions,
  IUnifiedSearchNearbyOptions,
  IUnifiedPlaceResults,
  IUnifiedGeocodeOptions,
  IUnifiedReverseGeocodeOptions,
  IUnifiedRouteDriveOptions,
  IUnifiedRouteWalkOptions,
  IUnifiedRouteRideOptions,
  ILnglatToPixelOptions,
  IPixelToLnglatOptions,
  IPathAnimateOptions,
  ITimeBasedPathAnimateOptions,
  ITimeBasedPathAnimationController,
  IUnifiedMarkerClusterOptions,
  IInfoWindowOptions,
} from "./serviceParamsType";
import { formatOptions } from "../utils";

// import { LineManager as amapLineManager } from "./amap/lineServices/lineImpl";
// import { MarkerManager } from "./amap/pointServices/markerImpl";
// import { PolygonManager } from "./amap/polygonServices/polygonImpl";

// const di = {
//   amap: {
//     lineManager: amapLineManager,
//     markerManager: MarkerManager,
//     polygonManager: PolygonManager,
//   },
// };

export class UnifiedProvider implements IMapProvider {
  map: any;
  mapProvider: MapProviderEnum;
  private loader: any;
  private baseManager: any; // 基础服务，比如初始化地图，设置中心点，设置缩放级别等
  private lineManager: any; // 线服务，比如添加线，删除线等
  private markerManager: any; // 标记服务，比如添加标记，删除标记等
  private polygonManager: any; // 多边形服务，比如添加多边形，删除多边形等
  private geometryManager: any; // 几何服务，比如计算距离，面积等
  private searchManager: any; // 搜索服务，比如搜索地址，POI等
  private geocoderManager: any; // 地理编码服务，比如地址转经纬度，经纬度转地址等
  private directionManager: any; // 路径规划服务，比如驾车，步行，骑行等
  private coordinateManager: any; // 坐标服务，比如坐标转换相关
  private widgetManager: any; // 控件相关，比如信息弹窗控件

  // 外部注册的 service 实现类
  static providerSerivces: Record<
    MapProviderEnum,
    Record<MapProviderServiceEnum, any>
  > = {} as Record<MapProviderEnum, Record<MapProviderServiceEnum, any>>;
  // 外部 service 向 此处提供注册 service
  static registerServiceToUnifiedProvider(
    mapProvider: MapProviderEnum,
    serviceName: MapProviderServiceEnum,
    serviceClass: any
  ) {
    if (UnifiedProvider.providerSerivces[mapProvider]) {
      UnifiedProvider.providerSerivces[mapProvider][serviceName] = serviceClass;
    } else {
      UnifiedProvider.providerSerivces[mapProvider] = {} as Record<
        MapProviderServiceEnum,
        any
      >;
      UnifiedProvider.providerSerivces[mapProvider][serviceName] = serviceClass;
    }
  }

  // 预留以后可能要改为工具函数
  // static geocode(
  //   provider: MapProviderEnum,
  //   options: IUnifiedGeocodeOptions
  // ): Promise<Array<IUnifiedPlaceResults>> {
  //   const formattedOptions = formatOptions<IUnifiedGeocodeOptions>(options, [
  //     "address",
  //   ]);
  //   const geocoderManager = new UnifiedProvider.providerSerivces[provider]["geocoderManager"]
  //   return geocoderManager.geocode(null, formattedOptions);
  // }
  // static reverseGeocode(
  //   provider: MapProviderEnum,
  //   options: IUnifiedReverseGeocodeOptions
  // ): Promise<Array<IUnifiedPlaceResults>> {
  //   const formattedOptions = formatOptions<IUnifiedGeocodeOptions>(options, [
  //     "location",
  //   ]);
  //   const geocoderManager = new UnifiedProvider.providerSerivces[provider]["geocoderManager"]
  //   return geocoderManager.reverseGeocode(null, formattedOptions);
  // }

  constructor(provider: MapProviderEnum, loader: any) {
    this.loader = loader;
    this.mapProvider = provider;
    const initializeService = (
      serviceName: MapProviderServiceEnum,
      loader: any
    ) => {
      try {
        const ServiceClass =
          UnifiedProvider.providerSerivces[provider][serviceName];
        if (!ServiceClass) {
          throw new Error(
            `Service ${serviceName} not registered for ${provider}`
          );
        }
        return new ServiceClass(loader);
      } catch (error) {
        console.error(`Initialize ${serviceName} failed:`, error);
        return null; // 或返回兜底实现
      }
    };
    this.baseManager = initializeService("baseManager", loader);
    this.lineManager = initializeService("lineManager", loader);
    this.markerManager = initializeService("markerManager", loader);
    this.polygonManager = initializeService("polygonManager", loader);
    this.geometryManager = initializeService("geometryManager", loader);
    this.searchManager = initializeService("searchManager", loader);
    this.geocoderManager = initializeService("geocoderManager", loader);
    this.directionManager = initializeService("directionManager", loader);
    this.coordinateManager = initializeService("coordinateManager", loader);
    this.widgetManager = initializeService("widgetManager", loader);
  }

  /**
   * 地图基础服务
   * 1. 初始化
   * 2. 设置中心点
   * 3. 设置缩放级别
   */
  async initMap(options: IInitMapOptions): Promise<void> {
    const formattedOptions = formatOptions<IInitMapOptions>(options, [
      "container",
    ]);
    const map = await this.baseManager.initMap(options);
    this.map = map;
    return Promise.resolve();
  }
  setCenter(position: { lat: number; lng: number }): void {
    this.baseManager.setCenter(this.map, position);
  }
  setZoom(level: number): void {
    this.baseManager.setZoom(this.map, level);
  }
  fitBounds(bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }): void {
    // 西南 116.274645,39.867461
    // 东北 116.460773,39.969328
    if (!bounds) {
      throw new Error("Parameter 'bounds' is required");
    }
    if (!bounds.north || !bounds.south || !bounds.east || !bounds.west) {
      throw new Error(
        "Parameter 'bounds' is required and must be an object with 'north', 'south', 'east', and 'west' properties"
      );
    }
    this.baseManager.fitBounds(this.map, bounds);
  }
  // 监听 zoom 变化
  onZoomChange(callback: (zoom: number) => void): void {
    this.baseManager.onZoomChange(this.map, callback);
  }

  /**
   * 1. 添加点标记
   * 2. 删除点标记
   */
  addMarker(options: IUnifiedMapMarkerOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedMapMarkerOptions>(
      options,
      ["position"],
      {
        draggable: false,
      }
    );
    return this.markerManager.addMarker(this.map, formattedOptions);
  }
  addMarkerSync(options: IUnifiedMapMarkerOptions): any {
    const formattedOptions = formatOptions<IUnifiedMapMarkerOptions>(
      options,
      ["position"],
      {
        draggable: false,
      }
    );
    return this.markerManager.addMarkerSync(this.map, formattedOptions);
  }
  removeMarker(marker: any): void {
    this.markerManager.removeMarker(marker);
  }
  addMarkerCluster(options: IUnifiedMarkerClusterOptions): Promise<any> {
    return this.markerManager.addMarkerCluster(this.map, options);
  }
  addMarkerClusterSync(options: IUnifiedMarkerClusterOptions): any {
    return this.markerManager.addMarkerClusterSync(this.map, options);
  }

  addPolyline(options: IUnifiedPolylineOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedPolylineOptions>(options, [
      "path",
    ]);

    // if (options.path.length < 1) {
    //   throw new Error(
    //     "Parameter 'path' is required and must be an array of at least one point"
    //   );
    // }
    return this.lineManager.addPolyline(this.map, formattedOptions);
  }
  addPolylineSync(options: IUnifiedPolylineOptions): any {
    const formattedOptions = formatOptions<IUnifiedPolylineOptions>(options, [
      "path",
    ]);
    return this.lineManager.addPolylineSync(this.map, formattedOptions);
  }
  removePolyline(polyline: any): void {
    this.lineManager.removePolyline(this.map, polyline);
  }

  addPolygon(options: IUnifiedPolygonOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedPolygonOptions>(options, [
      "path",
    ]);
    if (options.path.length < 3) {
      throw new Error(
        "Parameter 'path' is required and must be an array of at least three points"
      );
    }
    return this.polygonManager.addPolygon(this.map, formattedOptions);
  }
  addPolygonSync(options: IUnifiedPolygonOptions): any {
    const formattedOptions = formatOptions<IUnifiedPolygonOptions>(options, [
      "path",
    ]);
    if (options.path.length < 3) {
      throw new Error(
        "Parameter 'path' is required and must be an array of at least three points"
      );
    }
    return this.polygonManager.addPolygonSync(this.map, formattedOptions);
  }
  removePolygon(polygon: any): void {
    this.polygonManager.removePolygon(this.map, polygon);
  }
  addCircle(options: IUnifiedCircleOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedCircleOptions>(options, [
      "center",
      "radius",
    ]);
    return this.polygonManager.addCircle(this.map, formattedOptions);
  }
  addCircleSync(options: IUnifiedCircleOptions): any {
    const formattedOptions = formatOptions<IUnifiedCircleOptions>(options, [
      "center",
      "radius",
    ]);
    return this.polygonManager.addCircleSync(this.map, formattedOptions);
  }
  removeCircle(circle: any): void {
    this.polygonManager.removeCircle(this.map, circle);
  }
  addRectangle(options: IUnifiedRectangleOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedRectangleOptions>(options, [
      "bounds",
    ]);
    return this.polygonManager.addRectangle(this.map, formattedOptions);
  }
  addRectangleSync(options: IUnifiedRectangleOptions): any {
    const formattedOptions = formatOptions<IUnifiedRectangleOptions>(options, [
      "bounds",
    ]);
    return this.polygonManager.addRectangleSync(this.map, formattedOptions);
  }
  removeRectangle(rectangle: any): void {
    this.polygonManager.removeRectangle(this.map, rectangle);
  }

  getDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number> {
    if (!start) {
      throw new Error("Parameter 'start' is required");
    }
    if (!end) {
      throw new Error("Parameter 'end' is required");
    }
    return this.geometryManager.getDistanceBetween(start, end);
  }
  getDistanceBetweenSync(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): number {
    if (!start) {
      throw new Error("Parameter 'start' is required");
    }
    if (!end) {
      throw new Error("Parameter 'end' is required");
    }
    return this.geometryManager.getDistanceBetweenSync(start, end, this.map);
  }
  getPolygonArea(path: Array<{ lat: number; lng: number }>): Promise<number> {
    if (!path || path.length < 3) {
      throw new Error(
        "Parameter 'paths' is required and must be an array of at least 3 points"
      );
    }
    return this.geometryManager.getPolygonArea(this.map, path);
  }
  getPolygonAreaSync(path: Array<{ lat: number; lng: number }>): number {
    if (!path || path.length < 3) {
      throw new Error(
        "Parameter 'paths' is required and must be an array of at least 3 points"
      );
    }
    return this.geometryManager.getPolygonAreaSync(this.map, path);
  }

  searchPlaceByKeyword(
    options: IUnifiedSearchByKeywordOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    const formattedOptions = formatOptions<IUnifiedSearchByKeywordOptions>(
      options,
      ["query"]
    );
    return this.searchManager.searchPlaceByKeyword(this.map, formattedOptions);
  }
  searchPlaceNearby(
    options: IUnifiedSearchNearbyOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    const formattedOptions = formatOptions<IUnifiedSearchNearbyOptions>(
      options,
      ["location", "radius"]
    );
    return this.searchManager.searchPlaceNearby(this.map, formattedOptions);
  }

  geocode(
    options: IUnifiedGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    const formattedOptions = formatOptions<IUnifiedGeocodeOptions>(options, [
      "address",
    ]);
    return this.geocoderManager.geocode(this.map, formattedOptions);
  }
  reverseGeocode(
    options: IUnifiedReverseGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    const formattedOptions = formatOptions<IUnifiedGeocodeOptions>(options, [
      "location",
    ]);
    return this.geocoderManager.reverseGeocode(this.map, formattedOptions);
  }

  routeDrive(options: IUnifiedRouteDriveOptions): any {
    const formattedOptions = formatOptions<IUnifiedRouteDriveOptions>(options, [
      "origin",
      "destination",
    ], {isShowPath: true});
    return this.directionManager.routeDrive(this.map, formattedOptions);
  }
  routeWalk(options: IUnifiedRouteWalkOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedRouteWalkOptions>(options, [
      "origin",
      "destination",
    ]);
    return this.directionManager.routeWalk(this.map, formattedOptions);
  }
  routeRide(options: IUnifiedRouteRideOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedRouteRideOptions>(options, [
      "origin",
      "destination",
    ]);
    return this.directionManager.routeRide(this.map, formattedOptions);
  }
  animatePath(options: IPathAnimateOptions): any {
    const formattedOptions = formatOptions<IPathAnimateOptions>(
      options,
      ["path"],
      {
        isAutoPlay: false,
      }
    );
    return this.directionManager.animatePath(this.map, formattedOptions);
  }

  /**
   * 基于时间的路径动画
   * 支持倍速播放、时间点跳转等高级功能
   */
  animateTimeBasedPath(options: ITimeBasedPathAnimateOptions): Promise<ITimeBasedPathAnimationController> {
    const formattedOptions = formatOptions<ITimeBasedPathAnimateOptions>(
      options,
      ["path"],
      {
        speed: 1.0,
        autoPlay: false,
        loop: false,
        frameRate: 60
      }
    );
    return this.lineManager.animateTimeBasedPath(this.map, formattedOptions);
  }
  animateTimeBasedPathSync(options: ITimeBasedPathAnimateOptions): ITimeBasedPathAnimationController {
    const formattedOptions = formatOptions<ITimeBasedPathAnimateOptions>(
      options,
      ["path"],
      {
        speed: 1.0,
        autoPlay: false,
        loop: false,
        frameRate: 60
      }
    );
    return this.lineManager.animateTimeBasedPathSync(this.map, formattedOptions);
  }

  lnglatToPixel(options: ILnglatToPixelOptions): { x: number; y: number } {
    const formattedOptions = formatOptions<ILnglatToPixelOptions>(options, [
      "position",
      "zoom",
    ]);
    return this.coordinateManager.lnglatToPixel(formattedOptions);
  }
  pixelToLngLat(options: IPixelToLnglatOptions): { lat: number; lng: number } {
    const formattedOptions = formatOptions<IPixelToLnglatOptions>(options, [
      "pixel",
      "zoom",
    ]);
    return this.coordinateManager.pixelToLngLat(formattedOptions);
  }
  wgs84ToWebMercator(lng: number, lat: number): { x: number; y: number } {
    if (!lng || !lat || typeof lng !== "number" || typeof lat !== "number") {
      throw new Error("Parameter 'lng' and 'lat' is required");
    }
    return this.coordinateManager.wgs84ToWebMercator(lng, lat);
  }
  webMercatorToWgs84(x: number, y: number): { lng: number; lat: number } {
    if (!x || !y || typeof x !== "number" || typeof y !== "number") {
      throw new Error("Parameter 'x' and 'y' is required");
    }
    return this.coordinateManager.webMercatorToWgs84(x, y);
  }

  createInfoWindow(options: IInfoWindowOptions): Promise<any> {
    const formattedOptions = formatOptions(
      options,
      ["position", "content"],
      {}
    );
    return this.widgetManager.createInfoWindow(this.map, formattedOptions);
  }
  openInfoWindow(infoWindow: any, marker?: any): void {
    if (!infoWindow) {
      throw new Error("Parameter 'infoWindow' is required");
    }
    this.widgetManager.openInfoWindow(this.map, infoWindow, marker);
  }
  closeInfoWindow(infoWindow: any): void {
    if (!infoWindow) {
      throw new Error("Parameter 'infoWindow' is required");
    }
    this.widgetManager.closeInfoWindow(this.map, infoWindow);
  }
}
