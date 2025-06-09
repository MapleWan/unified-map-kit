import { UnifiedProvider } from "../..";
import { lnglatToPixel, pixelToLnglat } from "../../commonHandler";
import {
  IPixelToLnglatOptions,
  ILnglatToPixelOptions,
} from "../../serviceParamsType";

declare const google: any;
export class CoordinateManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 经纬度转换平面地图像素坐标
  lnglatToPixel(options: ILnglatToPixelOptions): {
    x: number;
    y: number;
  } {
    return lnglatToPixel(options.position, options.zoom);
  }

  // 平面地图像素坐标转换经纬度
  pixelToLngLat(options: IPixelToLnglatOptions): {
    lat: number;
    lng: number;
  } {
    return pixelToLnglat(options.pixel, options.zoom);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "coordinateManager",
  CoordinateManager
);
