import { IUnifiedPolylineOptions } from "../../../types/MapFunctionParamsInterface";
declare const AMap: any;
export class LineManager {
  // 添加折线
  async addPolyline(options: IUnifiedPolylineOptions): Promise<any> {
    if (!options.map) {
      throw new Error("Parameter 'map' is required");
    }
    if (!options.path || options.path.length === 0) {
      throw new Error(
        "Parameter 'path' is required and must be an array of at least one point"
      );
    }
    const lineOptions = {
      ...options?.sourceOptions,
      path: options.path.map((p: any) => [p.lng, p.lat]),
      strokeOpacity:
        options?.strokeOpacity || options.strokeOpacity !== 0
          ? options.strokeOpacity
          : 1,
      showDir: options?.showDirection || false,
    };
    if (options?.zIndex) lineOptions.zIndex = options.zIndex;

    if (options?.strokeColor) lineOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight) lineOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeLineDash) {
      lineOptions.strokeDasharray = options.strokeLineDash;
      lineOptions.strokeStyle = "dashed";
    }
    let polyline = new AMap.Polyline(lineOptions);
    options.map.add(polyline);
    // this.map.setFitView();
    return Promise.resolve(polyline);
  }
  // 删除折线
  removePolyline(map: any, line: any): void {
    if (!map) {
      throw new Error("Parameter 'map' is required");
    }
    if (!line) {
      throw new Error("Parameter 'line' is required");
    }
    map.remove(line);
  }
}
