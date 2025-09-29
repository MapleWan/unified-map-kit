import { IInitMapOptions } from "../../../types/MapProviderInterface";
import { UnifiedProvider } from "../../../mapProvider";
export class BaseManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 初始化地图
  async initMap(options: IInitMapOptions): Promise<void> {
    let map: any;
    try {
      const { Map } = await this.loader.importLibrary("maps");
      map = new Map(options.container, {
        ...options,
        mapId: "PLACEHOLDER_MAP_ID",
      });
      const { Marker, AdvancedMarkerElement } = await this.loader.importLibrary("marker");
      const { Polyline, Polygon, Circle, Rectangle } = await this.loader.importLibrary("maps");
      map.MarkerMapKit = Marker;
      map.AdvancedMarkerElementMapKit = AdvancedMarkerElement;
      map.PolylineMapKit = Polyline;
      map.PolygonMapKit = Polygon;
      map.CircleMapKit = Circle;
      map.RectangleMapKit = Rectangle;
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
    map.fitBounds(bounds);
  }

  // 监听 zoom 变化
  onZoomChange(
    map: any,
    callback: (originMapZoomChangeParams: any) => void
  ): void {
    map.addListener("zoom_changed", (e: any) => {
      callback(e);
    });
  }
}
// export function registerService() {
UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "baseManager",
  BaseManager
);
// }
