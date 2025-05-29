import { UnifiedProvider } from "../..";
import { IUnifiedPolylineOptions } from "../../serviceParamsType";
declare const HWMapJsSDK: any;

export class LineManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加折线
  async addPolyline(map: any, options: IUnifiedPolylineOptions): Promise<void> {
    let lineOptions = {
      map: map,
      ...options,
      showDir: options?.showDirection || false,
    };

    if (options?.strokeOpacity) {
      console.warn(
        "huawei map does not support strokeOpacity, you can set color opacity by setting stokeColor with format '#RRGGBBAA' or 'HSL'"
      );
    }
    const polyline = new HWMapJsSDK.HWPolyline(lineOptions);
    return Promise.resolve(polyline);
  }

  // 删除折线
  removePolyline(map: any, line: any): void {
    if (!line) {
      throw new Error("Parameter 'line' is required");
    }
    line.setMap(null);
    line = null;
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "lineManager",
  LineManager
);
