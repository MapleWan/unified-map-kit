import { UnifiedProvider } from "../..";
declare const google: any;
export class GeometryManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 计算两点之间的距离
  async getDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number> {
    const { spherical } = await google.maps.importLibrary("geometry");
    return spherical.computeDistanceBetween(start, end);
  }

  // 计算多边形的面积
  async getPolygonArea(
    map: any,
    path: Array<{ lat: number; lng: number }>
  ): Promise<number> {
    const { spherical } = await google.maps.importLibrary("geometry");
    return spherical.computeArea(path);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "geometryManager",
  GeometryManager
);
