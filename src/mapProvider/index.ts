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
  private baseManager: any;
  private lineManager: any;
  private markerManager: any;
  private polygonManager: any;
  private searchManager: any;
  static providerSerivces: Record<
    MapProviderEnum,
    Record<MapProviderServiceEnum, any>
  > = {} as Record<MapProviderEnum, Record<MapProviderServiceEnum, any>>;
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
    // this.searchManager = initializeService("searchManager", loader);
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
    throw new Error("Method not implemented.");
  }
  getPolygonArea(path: Array<{ lat: number; lng: number }>): Promise<number> {
    throw new Error("Method not implemented.");
  }
  searchPlaceByKeyword(options: IUnifiedSearchOptions): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
