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
    options: any
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

  setCenter(position: { lat: number; lng: number }): void {
    if (!position) {
      throw new Error("Parameter 'position' is required");
    }
    this.map.setCenter([position.lng, position.lat]);
  }

  setZoom(level: number): void {
    this.map.setZoom(level);
  }
  // 添加标记
  addMarker(options: IUnifiedMapMarkerOptions): Promise<any> {
    return this.markerManager.addMarker({ map: this.map, ...options });
  }
  // 删除标记
  removeMarker(marker: any): void {
    this.markerManager.removeMarker(marker);
  }

  // 添加折线
  addPolyline(options: IUnifiedPolylineOptions): Promise<any> {
    if (!options.path || options.path.length === 0) {
      throw new Error(
        "Parameter 'path' is required and must be an array of at least one point"
      );
    }
    return this.lineManager.addPolyline({ map: this.map, ...options });
  }
  // 删除折线
  removePolyline(line: any): void {
    this.lineManager.removePolyline(this.map, line);
  }

  // 添加多边形
  addPolygon(options: IUnifiedPolygonOptions): Promise<any> {
    return this.polygonManager.addPolygon({ map: this.map, ...options });
  }
  // 删除多边形
  removePolygon(polygon: any): void {
    this.polygonManager.removePolygon(this.map, polygon);
  }

  // 添加圆
  addCircle(options: IUnifiedCircleOptions) {
    return this.polygonManager.addCircle({ map: this.map, ...options });
  }
  // 删除圆
  removeCircle(circle: any) {
    this.polygonManager.removeCircle(this.map, circle);
  }

  // 添加矩形
  async addRectangle(options: IUnifiedRectangleOptions) {
    return this.polygonManager.addRectangle({ map: this.map, ...options });
  }
  // 删除矩形
  removeRectangle(rectangle: any) {
    return this.polygonManager.removeRectangle(this.map, rectangle);
  }
}
