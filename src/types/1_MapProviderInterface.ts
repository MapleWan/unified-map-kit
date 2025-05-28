/*
 * @Author: montisan i@hncoder.com
 * @Date: 2025-04-24 10:03:49
 * @LastEditors: montisan i@hncoder.com
 * @LastEditTime: 2025-04-24 11:46:05
 * @FilePath: /Map/src/types/MapProviderInterface.ts
 * @Description: Map provider interface type declarations
 */
import {
  IMapInitOption,
  IUnifiedMapMarkerOptions,
  IUnifiedPolylineOptions,
  IUnifiedPolygonOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
  IUnifiedSearchOptions
} from "./MapFunctionParamsInterface";
export interface MapProviderInterface {
  sourceMap: any;

  zvosLoadMap(container: HTMLElement, options: IMapInitOption): Promise<void>;
  setCenter(position: { lat: number; lng: number }): void;
  setZoom(level: number): void;
  
  addMarker(options: IUnifiedMapMarkerOptions): Promise<any>;
  removeMarker(marker: any): void;

  addPolyline(options: IUnifiedPolylineOptions): Promise<any>;
  removePolyline(polyline: any): void;

  addPolygon(options: IUnifiedPolygonOptions): Promise<any>;
  removePolygon(polygon: any): void;

  addCircle(options: IUnifiedCircleOptions): Promise<any>;
  removeCircle(circle: any): void;

  addRectangle(options: IUnifiedRectangleOptions):  Promise<any>;
  removeRectangle(rectangle: any): void;

  getDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number>;
  getPolygonArea(path: Array<{ lat: number; lng: number }>): Promise<number>;

  searchPlaceByKeyword(options: IUnifiedSearchOptions): Promise<any>;
}

/**
 * 地图提供商类型
 * 支持三种地图服务：高德、谷歌、华为
 */
export type MapProvider = "google" | "amap" | "huawei";
