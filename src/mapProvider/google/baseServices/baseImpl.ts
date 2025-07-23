import { IInitMapOptions } from "../../../types/MapProviderInterface";
import { UnifiedProvider } from "../../../mapProvider";
export class BaseManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 初始化地图
  async initMap(options: IInitMapOptions): Promise<void> {
    const { Map } = await this.loader.importLibrary("maps");
    const map = new Map(options.container, {
      ...options,
      mapId: "PLACEHOLDER_MAP_ID",
    });
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
    map.fitBounds(bounds);
  }
}
// export function registerService() {
UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "baseManager",
  BaseManager
);
// }
