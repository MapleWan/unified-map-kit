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
  private loader: any;
  private baseManager: any; // 基础服务，比如初始化地图，设置中心点，设置缩放级别等
  private lineManager: any; // 线服务，比如添加线，删除线等
  private markerManager: any; // 标记服务，比如添加标记，删除标记等
  private polygonManager: any; // 多边形服务，比如添加多边形，删除多边形等
  private geometryManager: any; // 几何服务，比如计算距离，面积等
  private searchManager: any; // 搜索服务，比如搜索地址，POI等

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

  constructor(provider: MapProviderEnum, loader: any) {
    this.loader = loader;
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
  }

  /**
   * 地图基础服务
   * 1. 初始化
   * 2. 设置中心点
   * 3. 设置缩放级别
   */
  initMap(options: IInitMapOptions): Promise<void> {
    this.baseManager.initMap(options).then((map: any) => {
      this.map = map;
    });
    return Promise.resolve();
  }
  setCenter(position: { lat: number; lng: number }): void {
    this.baseManager.setCenter(this.map, position);
  }
  setZoom(level: number): void {
    this.baseManager.setZoom(this.map, level);
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
  removeMarker(marker: any): void {
    this.markerManager.removeMarker(marker);
  }
  addPolyline(options: IUnifiedPolylineOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedPolylineOptions>(options, [
      "path",
    ]);

    if (options.path.length < 1) {
      throw new Error(
        "Parameter 'path' is required and must be an array of at least one point"
      );
    }
    return this.lineManager.addPolyline(this.map, formattedOptions);
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
  removeCircle(circle: any): void {
    this.polygonManager.removeCircle(this.map, circle);
  }
  addRectangle(options: IUnifiedRectangleOptions): Promise<any> {
    const formattedOptions = formatOptions<IUnifiedRectangleOptions>(options, [
      "bounds",
    ]);
    return this.polygonManager.addRectangle(this.map, formattedOptions);
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
  getPolygonArea(path: Array<{ lat: number; lng: number }>): Promise<number> {
    if (!path || path.length < 3) {
      throw new Error(
        "Parameter 'paths' is required and must be an array of at least 3 points"
      );
    }
    return this.geometryManager.getPolygonArea(this.map, path);
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
}
