import { UnifiedProvider } from "../..";
import { IUnifiedPolylineOptions } from "../../serviceParamsType";
declare const google: any;

export class LineManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加折线
  async addPolyline(map: any, options: IUnifiedPolylineOptions): Promise<void> {
    const { Polyline } = await this.loader.importLibrary("maps");
    let lineOptions = { ...options } as any;
    if (options?.showDirection) {
      lineOptions.icons = [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 4,
            strokeColor: options?.strokeColor || "#FF0000",
            strokeWeight: options?.strokeWeight || 2,
            fillOpacity: 1,
          },
          repeat: "30%", // 每隔 30% 长度重复一次箭头
          offset: "100%",
        },
      ];
    }
    // 设置虚线样式
    if (options?.strokeLineDash) {
      lineOptions.strokeOpacity = 0;
      lineOptions.icons.push({
        icon: {
          path: "M 0,-1 0,1", // 画一条短线段，代表虚线中的“实线段”
          strokeOpacity: 1,
          scale: 2,
        },
        offset: "0",
        repeat: `${options.strokeLineDash[0]}px`, // 控制虚线间隔
      });
    }
    const polyline = new Polyline(lineOptions);
    polyline.setMap(map);
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
  "google",
  "lineManager",
  LineManager
);
