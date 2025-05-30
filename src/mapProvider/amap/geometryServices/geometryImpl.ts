import { UnifiedProvider } from "../..";
declare const AMap: any;
export class GeometryManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 计算两点之间的距离
  getDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number> {
    return Promise.resolve(
      AMap.GeometryUtil.distance([start.lng, start.lat], [end.lng, end.lat])
    );
  }

  // 计算多边形面积
  getPolygonArea(
    map: any,
    path: Array<{ lat: number; lng: number }>
  ): Promise<number> {
    const amapPathList = path.map((item) => [item.lng, item.lat]);
    return Promise.resolve(AMap.GeometryUtil.ringArea(amapPathList));
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "geometryManager",
  GeometryManager
);
