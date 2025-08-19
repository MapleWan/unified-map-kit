import { IInitMapOptions } from "../../../types/MapProviderInterface";
import { UnifiedProvider } from "../../../mapProvider";
declare const HWMapJsSDK: any;
export class BaseManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 初始化地图
  initMap(options: IInitMapOptions): Promise<void> {
    let map: any;
    try {
      map = new HWMapJsSDK.HWMap(options.container, options);
      return Promise.resolve(map);
    } catch (error) {
      console.error("Initialize map failed:", error);
      return Promise.reject("Initialize map failed");
    }
  }
  // 设置中心
  setCenter(map: any, position: { lat: number; lng: number }): void {
    if (!position) {
      throw new Error("Parameter 'position' is required");
    }
    map.setCenter(position);
  }
  // 设置缩放级别
  setZoom(map: any, level: number): void {
    if (!level) {
      throw new Error("Parameter 'level' is required");
    }
    map.setZoom(level);
  }

  // 设置地理区域
  fitBounds(
    map: any,
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    }
  ): void {
    map.fitBounds({
      ne: {
        lat: bounds.north,
        lng: bounds.east,
      },
      sw: {
        lat: bounds.south,
        lng: bounds.west,
      },
    });
  }

  // 监听 zoom 变化
  onZoomChange(
    map: any,
    callback: (originMapZoomChangeParams: any) => void
  ): void {
    map.onZoomChanged((e: any) => {
      callback(e);
    });
  }
}
// export function registerService() {
UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "baseManager",
  BaseManager
);
// }
