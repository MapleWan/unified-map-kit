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
    const map = new HWMapJsSDK.HWMap(options.container, options);
    return Promise.resolve(map);
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
}
// export function registerService() {
UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "baseManager",
  BaseManager
);
// }
