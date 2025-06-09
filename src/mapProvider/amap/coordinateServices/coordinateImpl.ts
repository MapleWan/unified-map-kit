import { UnifiedProvider } from "../..";
import { lnglatToPixel, pixelToLnglat, webMercatorToWgs84, wgs84ToWebMercator } from "../../commonHandler";
import {
  ILnglatToPixelOptions,
  IPixelToLnglatOptions,
} from "../../serviceParamsType";

declare const AMap: any;
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

  // wgs84 -> EPSG:3857  WGS84经纬度转3857投影经纬度。
  wgs84ToWebMercator(lng: number, lat: number): { x: number; y: number } {
    return wgs84ToWebMercator(lng, lat);
  }

  // EPSGEPSG:3857 -> wgs84  3857投影经纬度转WGS84经纬度
  webMercatorToWgs84(x: number, y: number): { lng: number; lat: number } {
    return webMercatorToWgs84(x, y);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "coordinateManager",
  CoordinateManager
);
