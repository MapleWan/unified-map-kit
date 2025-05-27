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
  IUnifiedSearchOptions,
  IUnifiedSearchResults,
} from "./types/MapFunctionParamsInterface";

import { MapProviderInterface } from "./types/MapProviderInterface";
import { LineManager } from "./mapProviderServices/amap/lineServices/lineImpl";
import { MarkerManager } from "./mapProviderServices/amap/pointServices/markerImpl";
import { PolygonManager } from "./mapProviderServices/amap/polygonServices/polygonImpl";
declare const AMap: any;

export class AMapProvider implements MapProviderInterface {
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

    window._AMapSecurityConfig = {
      securityJsCode: "8215d7d759a5b8c28827e3f89a65d2a4",
    };

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
  async zvosAddMarker(options: IUnifiedMapMarkerOptions): Promise<any> {
    if (!options.position) {
      throw new Error("Parameter 'position' is required");
    }
    let markerOptions = {
      map: this.map,
      ...options?.sourceOptions,
      position: [options.position.lng, options.position.lat],
      zIndex: options?.zIndex || 10,
      draggable: options.draggable || false,
      title: options?.title || "",
      extData: options?.customData || {},
    };
    if (options?.label) {
      if (options.label instanceof HTMLElement) {
        markerOptions.content = options.label;
      } else {
        const customLabel = document.createElement("span");
        customLabel.style.display = "inline-block";
        customLabel.style.width = "fit-content";
        customLabel.style.fontSize = options.label?.fontSize || "12px";
        customLabel.style.color = options.label?.color || "#000";
        customLabel.innerHTML = (options.label?.content as string) || "";
        markerOptions.content = customLabel;
      }
    }
    if (options?.icon) {
      if (typeof options.icon === "object" && options.icon !== null) {
        const icon = options.icon;
        const customIcon = document.createElement("img");
        customIcon.src = icon.url;
        if (icon?.size) {
          customIcon.style.width = icon.size[0] + "px";
          customIcon.style.height = icon.size[1] + "px";
        }
        markerOptions.content = customIcon;
      } else {
        const customIcon = document.createElement("img");
        customIcon.src = options.icon;
        markerOptions.content = customIcon;
      }
    }
    // return new AMap.Marker(markerOptions);
    return Promise.resolve(new AMap.Marker(markerOptions));
  }
  // 删除标记
  zvosRemoveMarker(marker: any): void {
    if (!marker) {
      throw new Error("Parameter 'marker' is required");
    }
    marker.setMap(null);
    marker = null;
  }

  // 添加折线
  async zvosAddPolyline(options: IUnifiedPolylineOptions): Promise<any> {
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
    this.map.add(polyline);
    // this.map.setFitView();
    return Promise.resolve(polyline);
  }
  // 删除折线
  zvosRemovePolyline(line: any): void {
    if (!line) {
      throw new Error("Parameter 'line' is required");
    }
    this.map.remove(line);
  }

  // 添加多边形
  async zvosAddPolygon(options: IUnifiedPolygonOptions): Promise<any> {
    if (!options.path) {
      throw new Error("Parameter 'path' is required");
    }
    let amapPath = [];
    if (options.path.length) {
      if (Array.isArray(options.path[0])) {
        amapPath = options.path.map((item: any) => {
          return item.map((item: any) => {
            return [item.lng, item.lat];
          });
        });
      } else {
        amapPath = options.path.map((item: any) => {
          return [item.lng, item.lat];
        });
      }
    }
    const polygonOptions = {
      ...options?.sourceOptions,
      path: amapPath,
      strokeOpacity:
        options?.strokeOpacity || options.strokeOpacity !== 0
          ? options.strokeOpacity
          : 1,
      fillOpacity:
        options?.fillOpacity || options.fillOpacity !== 0
          ? options.fillOpacity
          : 1,
    };
    if (options?.strokeColor) polygonOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight)
      polygonOptions.strokeWeight = options.strokeWeight;

    if (options?.zIndex) polygonOptions.zIndex = options.zIndex;
    if (options?.fillColor) polygonOptions.fillColor = options.fillColor;
    if (options?.strokeLineDash) {
      polygonOptions.strokeDasharray = options.strokeLineDash;
      polygonOptions.strokeStyle = "dashed";
    }
    let polygon = new AMap.Polygon(polygonOptions);
    this.map.add(polygon);
    // this.map.setFitView();
    return Promise.resolve(polygon);
  }
  // 删除多边形
  zvosRemovePolygon(polygon: any): void {
    if (!polygon) {
      throw new Error("Parameter 'polygon' is required");
    }
    this.map.remove(polygon);
  }

  // 添加圆
  async zvosAddCircle(options: IUnifiedCircleOptions) {
    if (!options.center) {
      throw new Error("Parameter 'center' is required");
    }
    if (!options.radius) {
      throw new Error("Parameter 'radius' is required");
    }
    const circleOptions = {
      ...options?.sourceOptions,
      center: [options.center.lng, options.center.lat],
      radius: options.radius,
    };
    if (options?.zIndex) circleOptions.zIndex = options.zIndex;
    if (options?.fillColor) circleOptions.fillColor = options.fillColor;
    if (options?.strokeColor) circleOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight)
      circleOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeLineDash) {
      circleOptions.strokeDasharray = options.strokeLineDash;
      circleOptions.strokeStyle = "dashed";
    }

    if (options?.strokeOpacity)
      circleOptions.strokeOpacity = options.strokeOpacity;
    if (options?.fillOpacity) circleOptions.fillOpacity = options.fillOpacity;

    const circle = new AMap.Circle(circleOptions);
    this.map.add(circle);
    return Promise.resolve(circle);
  }
  // 删除圆
  zvosRemoveCircle(circle: any) {
    if (!circle) {
      throw new Error("Parameter 'circle' is required");
    }
    this.map.remove(circle);
  }

  // 添加矩形
  async zvosAddRectangle(options: IUnifiedRectangleOptions) {
    if (!options.bounds) {
      throw new Error("Parameter 'bounds' is required");
    }
    const southWest = new AMap.LngLat(
      options.bounds.west,
      options.bounds.south
    );
    const northEast = new AMap.LngLat(
      options.bounds.east,
      options.bounds.north
    );
    const bounds = new AMap.Bounds(southWest, northEast);

    const rectangleOptions = {
      ...options?.sourceOptions,
      map: this.map,
      bounds: bounds,
    };
    if (options?.zIndex) rectangleOptions.zIndex = options.zIndex;
    if (options?.fillColor) rectangleOptions.fillColor = options.fillColor;
    if (options?.strokeColor)
      rectangleOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight)
      rectangleOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeOpacity)
      rectangleOptions.strokeOpacity = options.strokeOpacity;
    if (options?.fillOpacity)
      rectangleOptions.fillOpacity = options.fillOpacity;

    // 设置虚线样式
    if (options?.strokeLineDash) {
      rectangleOptions.strokeDasharray = options.strokeLineDash;
      rectangleOptions.strokeStyle = "dashed";
    }
    const rectangle = new AMap.Rectangle(rectangleOptions);
    rectangle.setMap(this.map);
    return Promise.resolve(rectangle);
  }
  // 删除矩形
  zvosRemoveRectangle(rectangle: any) {
    if (!rectangle) {
      throw new Error("Parameter 'rectangle' is required");
    }
    this.map.remove(rectangle);
  }

  // 计算两点间距离
  async zvosGetDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number> {
    if (!start) {
      throw new Error("Parameter 'start' is required");
    }
    if (!end) {
      throw new Error("Parameter 'end' is required");
    }
    return Promise.resolve(
      AMap.GeometryUtil.distance([start.lng, start.lat], [end.lng, end.lat])
    );
  }
  // 计算多边形面积
  async zvosGetPolygonArea(
    path: Array<{ lat: number; lng: number }>
  ): Promise<number> {
    if (!path || path.length < 3) {
      throw new Error(
        "Parameter 'paths' is required and must be an array of at least 3 points"
      );
    }
    const ampPathList = path.map((item) => [item.lng, item.lat]);
    return Promise.resolve(AMap.GeometryUtil.ringArea(ampPathList));
  }

  // 搜索地点
  async zvosSearchPlaceByKeyword(
    options: IUnifiedSearchOptions
  ): Promise<Array<IUnifiedSearchResults>> {
    function handleSearchResult(
      status: any,
      result: any,
      resolve: (value: Array<IUnifiedSearchResults>) => void,
      reject: (reason?: any) => void
    ): void {
      let resPositionList: Array<IUnifiedSearchResults> = [];
      if (status === "complete" || status === "no_data") {
        if (result === 0) {
          resolve(resPositionList);
          return;
        }

        const results = result.poiList.pois;
        for (let i = 0; i < results.length; i++) {
          resPositionList.push({
            name: results[i].name,
            formatAddress: results[i].address,
            position: results[i].location,
            sourceResult: results[i],
          });
        }
        resolve(resPositionList);
      } else {
        reject(new Error("Search failed with AMap, status: " + status));
      }
    }
    return new Promise((resolve, reject) => {
      // 初始化请求参数对象
      AMap.plugin("AMap.PlaceSearch", () => {
        const placeSearch = new AMap.PlaceSearch({
          map: this.map,
          type: options?.poiType || "",
          pageSize: 20, // google 地图最多支持 20  保持一致
          // extension: "base",
        });

        if (options?.location) {
          placeSearch.searchNearBy(
            options?.query || "",
            [options.location.lng, options.location.lat],
            options?.radius || 10000,
            (status: any, result: any) => {
              handleSearchResult(status, result, resolve, reject);
            }
          );
        } else {
          placeSearch.search(
            options?.query || "",
            (status: any, result: any) => {
              handleSearchResult(status, result, resolve, reject);
            }
          );
        }
      });
    });
  }
}
