import { UnifiedProvider } from "../..";
declare const HWMapJsSDK: any;
export class GeometryManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加折线
  getDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number> {
    const DistanceClass = new HWMapJsSDK.HWDistanceCalculator();
    return Promise.resolve(DistanceClass.computeDistanceBetween(start, end));
  }

  // 删除折线
  getPolygonArea(
    map: any,
    path: Array<{ lat: number; lng: number }>
  ): Promise<number> {
    const polygon = new HWMapJsSDK.HWPolygon({
      map: map,
      paths: [path],
      fillColor: "#333",
      strokeColor: "#488",
      strokeWeight: 5,
      strokeLineDash: [20, 10],
    });
    const HWGeometryUtil = HWMapJsSDK.HWGeometryUtil;
    return Promise.resolve(HWGeometryUtil.getPolygonArea(polygon));
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "geometryManager",
  GeometryManager
);
