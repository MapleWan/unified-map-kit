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
  zvosSetCenter(position: { lat: number; lng: number }): void;
  zvosSetZoom(level: number): void;
  
  zvosAddMarker(options: IUnifiedMapMarkerOptions): Promise<any>;
  zvosRemoveMarker(marker: any): void;

  zvosAddPolyline(options: IUnifiedPolylineOptions): Promise<any>;
  zvosRemovePolyline(polyline: any): void;

  zvosAddPolygon(options: IUnifiedPolygonOptions): Promise<any>;
  zvosRemovePolygon(polygon: any): void;

  zvosAddCircle(options: IUnifiedCircleOptions): Promise<any>;
  zvosRemoveCircle(circle: any): void;

  zvosAddRectangle(options: IUnifiedRectangleOptions):  Promise<any>;
  zvosRemoveRectangle(rectangle: any): void;

  zvosGetDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number>;
  zvosGetPolygonArea(path: Array<{ lat: number; lng: number }>): Promise<number>;

  zvosSearchPlaceByKeyword(options: IUnifiedSearchOptions): Promise<any>;
}

/**
 * 地图提供商类型
 * 支持三种地图服务：高德、谷歌、华为
 */
export type MapProvider = "google" | "amap" | "huawei";
