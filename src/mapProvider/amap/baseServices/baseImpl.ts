import { IInitMapOptions } from "../../../types/MapProviderInterface";
import { UnifiedProvider } from "../../../mapProvider";
declare const AMap: any;
export class BaseManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 初始化地图
  initMap(options: IInitMapOptions): Promise<void> {
    const amapOptions: any = {
      ...options,
    };
    if (options?.center) {
      amapOptions.center = [options.center.lng, options.center.lat];
    }
    amapOptions.zooms = [options?.minZoom || 2, options?.maxZoom || 20];
    const map = new AMap.Map(options.container, amapOptions);
    return Promise.resolve(map);
  }
  // 设置中心
  setCenter(map: any, position: { lat: number; lng: number }): void {
    if (!position) {
      throw new Error("Parameter 'position' is required");
    }
    map.setCenter([position.lng, position.lat]);
  }
  // 设置缩放级别
  setZoom(map: any, level: number): void {
    if (!level) {
      throw new Error("Parameter 'level' is required");
    }
    map.setZoom(level);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "baseManager",
  BaseManager
);
