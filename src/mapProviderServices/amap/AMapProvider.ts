/*
 * @Author: montisan i@hncoder.com
 * @Date: 2025-04-24 10:40:15
 * @LastEditors: montisan i@hncoder.com
 * @LastEditTime: 2025-04-25 15:55:18
 * @FilePath: /Map/src/AMapProvider.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import AMapLoader from "@amap/amap-jsapi-loader";
import {
  IMapInitOption,
  IUnifiedMapMarkerOptions,
  IUnifiedPolylineOptions,
  IUnifiedPolygonOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
} from "../../types/MapFunctionParamsInterface";
import { LineManager } from "./lineServices/lineImpl";
import { MarkerManager } from "./pointServices/markerImpl";
import { PolygonManager } from "./polygonServices/polygonImpl";
declare const AMap: any;

export class AMapProvider {
  private map: any;
  private markerManager = new MarkerManager();
  private lineManager = new LineManager();
  private polygonManager = new PolygonManager();
  constructor() {}

  get sourceMap() {
    return this.map;
  }

  async zvosLoadMap(
    container: HTMLElement,
    options: IMapInitOption
  ): Promise<void> {
    if (!options.apiKey) {
      throw new Error("AMap API key is required");
    }

    // window._AMapSecurityConfig = {
    //     securityJsCode: "00200196431644a471c9de0a9ce88514",
    //   };

    await AMapLoader.load({
      key: options.apiKey,
      version: "2.0",
      ...options?.sourceOptions,
    });
    this.map = new AMap.Map(container);
    this.map.setCenter([
      options?.center?.lng || 116.397428,
      options?.center?.lat || 39.90923,
    ]);
    this.map.setZoom(options.zoom || 10);
  }

  zvosSetCenter(position: { lat: number; lng: number }): void {
    if (!position) {
      throw new Error("Parameter 'position' is required");
    }
    this.map.setCenter([position.lng, position.lat]);
  }

  zvosSetZoom(level: number): void {
    this.map.setZoom(level);
  }
  // 添加标记
  zvosAddMarker(options: IUnifiedMapMarkerOptions): Promise<any> {
    return this.markerManager.zvosAddMarker({ map: this.map, ...options });
  }
  // 删除标记
  zvosRemoveMarker(marker: any): void {
    this.markerManager.zvosRemoveMarker(marker);
  }

  // 添加折线
  zvosAddPolyline(options: IUnifiedPolylineOptions): Promise<any> {
    if (!options.path || options.path.length === 0) {
      throw new Error(
        "Parameter 'path' is required and must be an array of at least one point"
      );
    }
    return this.lineManager.zvosAddPolyline({ map: this.map, ...options });
  }
  // 删除折线
  zvosRemovePolyline(line: any): void {
    this.lineManager.zvosRemovePolyline(this.map, line);
  }

  // 添加多边形
  zvosAddPolygon(options: IUnifiedPolygonOptions): Promise<any> {
    return this.polygonManager.zvosAddPolygon({ map: this.map, ...options });
  }
  // 删除多边形
  zvosRemovePolygon(polygon: any): void {
    this.polygonManager.zvosRemovePolygon(this.map, polygon);
  }

  // 添加圆
  zvosAddCircle(options: IUnifiedCircleOptions) {
    return this.polygonManager.zvosAddCircle({ map: this.map, ...options });
  }
  // 删除圆
  zvosRemoveCircle(circle: any) {
    this.polygonManager.zvosRemoveCircle(this.map, circle);
  }

  // 添加矩形
  async zvosAddRectangle(options: IUnifiedRectangleOptions) {
    return this.polygonManager.zvosAddRectangle({ map: this.map, ...options });
  }
  // 删除矩形
  zvosRemoveRectangle(rectangle: any) {
    return this.polygonManager.zvosRemoveRectangle(this.map, rectangle);
  }
}
