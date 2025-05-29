import { UnifiedProvider } from "../..";
import { IUnifiedPolylineOptions } from "../../serviceParamsType";
declare const AMap: any;
export class LineManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加折线
  addPolyline(map: any, options: IUnifiedPolylineOptions): Promise<void> {
    if('visible' in options){
      console.warn("amap map does not support visible property")
    }
    const lineOptions = {
      path: options.path.map((p: any) => [p.lng, p.lat]),
      strokeOpacity:
        options?.strokeOpacity || options.strokeOpacity !== 0
          ? options.strokeOpacity
          : 1,
      showDir: options?.showDirection || false,
    } as any;
    if (options?.zIndex) lineOptions.zIndex = options.zIndex;

    if (options?.strokeColor) lineOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight) lineOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeLineDash) {
      lineOptions.strokeDasharray = options.strokeLineDash;
      lineOptions.strokeStyle = "dashed";
    }
    let polyline = new AMap.Polyline(lineOptions);
    map.add(polyline);
    return Promise.resolve(polyline);
  }

  // 删除折线
  removePolyline(map: any, line: any): void {
    if (!line) {
      throw new Error("Parameter 'line' is required");
    }
    map.remove(line);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "lineManager",
  LineManager
);
