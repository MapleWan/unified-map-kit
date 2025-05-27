import { HuaweiMapLoader } from "./HuaweiMapLoader";
import {
  IMapInitOption,
  IUnifiedMapMarkerOptions,
  IUnifiedPolylineOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
  IUnifiedSearchOptions,
  IUnifiedSearchResults,
} from "./types/MapFunctionParamsInterface";

import { MapProviderInterface } from "./types/MapProviderInterface";

declare const HWMapJsSDK: any;

export class HuaweiMapProvider implements MapProviderInterface {
  private map: any;
  private loader: HuaweiMapLoader;

  constructor() {
    this.loader = new HuaweiMapLoader({ apiKey: "" });
  }

  get sourceMap() {
    return this.map;
  }

  async zvosLoadMap(
    container: HTMLElement,
    options: IMapInitOption
  ): Promise<void> {
    if (!options.apiKey) {
      throw new Error("Huawei Map API key is required");
    }

    this.loader = new HuaweiMapLoader({ apiKey: options.apiKey });
    await this.loader.load();

    this.map = new HWMapJsSDK.HWMap(container, {
      // center: options.center || { lng: 116.397428, lat: 39.90923 },
      center: {
        lng: options?.center?.lng || 116.397428,
        lat: options?.center?.lat || 39.90923,
      },
      zoom: options.zoom || 10,
      ...options?.sourceOptions,
    });
  }

  zvosAddMarker(options: IUnifiedMapMarkerOptions): Promise<any> {
    if (!options.position) {
      throw new Error("Parameter 'position' is required");
    }
    let markerOptions = {
      map: this.map,
      ...options?.sourceOptions,
      position: options.position,
      zIndex: options?.zIndex || 10,
      draggable: options?.draggable || false,
      properties: options?.customData || {},
    };
    if (options?.label) {
      markerOptions.label = {
        color: options.label?.color || "#000",
        text: options.label.content,
        fontSize: options.label?.fontSize || "12px",
      };
    }

    const marker = new HWMapJsSDK.HWMarker(markerOptions);
    if (options?.icon && typeof options.icon === "object") {
      const icon = options.icon;
      const img = new Image();
      img.src = icon.url;
      img.onload = () => {
        const scale = icon?.size ? icon.size[0] / img.width : 1;
        marker.setIcon({
          scale,
          url: icon.url,
        });
      };

      img.onerror = () => {
        console.error("Failed to load image");
      };
    }
    return Promise.resolve(marker);
  }

  zvosRemoveMarker(marker: any): void {
    if (!marker) {
      throw new Error("Parameter 'marker' is required");
    }
    marker.setMap(null);
    marker = null;
  }
  zvosSetCenter(position: { lat: number; lng: number }): void {
    if (!position) {
      throw new Error("Parameter 'position' is required");
    }
    this.map.setCenter(position);
  }

  zvosSetZoom(level: number): void {
    this.map.setZoom(level);
  }

  // 添加折线
  async zvosAddPolyline(options: IUnifiedPolylineOptions): Promise<any> {
    if (!options.path || options.path.length === 0) {
      throw new Error(
        "Parameter 'position' is required and must be an array of at least one point"
      );
    }
    let lineOptions = {
      map: this.map,
      geodesic: false,
      ...options?.sourceOptions,
      path: options.path,
      showDir: options?.showDirection || false,
    };
    if (options?.zIndex) lineOptions.zIndex = options.zIndex;
    if (options?.strokeColor) lineOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight) lineOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeLineDash)
      lineOptions.strokeLineDash = options.strokeLineDash;

    if (options?.strokeOpacity) {
      console.warn(
        "huawei map does not support strokeOpacity, you can set color opacity by setting stokeColor with format '#RRGGBBAA' or 'HSL'"
      );
    }
    const polyline = new HWMapJsSDK.HWPolyline(lineOptions);
    return Promise.resolve(polyline);
  }
  // 删除折线
  zvosRemovePolyline(line: any): void {
    line.setMap(null);
    line = null;
  }

  // 添加多边形
  async zvosAddPolygon(options: any): Promise<any> {
    if (!options.path) {
      throw new Error("Parameter 'path' is required");
    }
    let polygonOptions = {
      map: this.map,
      geodesic: false,
      ...options?.sourceOptions,
      paths:
        options.path.length && Array.isArray(options.path[0])
          ? options.path
          : [options.path],
    };
    if (options?.zIndex) polygonOptions.zIndex = options.zIndex;
    if (options?.fillColor) polygonOptions.fillColor = options.fillColor;
    if (options?.strokeColor) polygonOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight)
      polygonOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeLineDash)
      polygonOptions.strokeLineDash = options.strokeLineDash;

    if (options?.strokeOpacity) {
      console.warn(
        "huawei map does not support strokeOpacity, you can set color opacity by setting stokeColor with format '#RRGGBBAA' or 'HSL'"
      );
    }
    if (options?.fillOpacity) {
      console.warn(
        "huawei map does not support fillOpacity, you can set color opacity by setting fillColor with format '#RRGGBBAA' or 'HSL'"
      );
    }
    const polygon = new HWMapJsSDK.HWPolygon(polygonOptions);
    return Promise.resolve(polygon);
  }

  // 删除多边形
  zvosRemovePolygon(polygon: any): void {
    if (!polygon) {
      throw new Error("Parameter 'polygon' is required");
    }
    polygon.setMap(null);
    polygon = null;
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
      map: this.map,
      center: options.center,
      radius: options.radius,
    };
    if (options?.zIndex) circleOptions.zIndex = options.zIndex;
    if (options?.fillColor) circleOptions.fillColor = options.fillColor;
    if (options?.strokeColor) circleOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight)
      circleOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeLineDash)
      circleOptions.strokeLineDash = options.strokeLineDash;

    if (options?.strokeOpacity) {
      console.warn(
        "huawei map does not support strokeOpacity, you can set color opacity by setting stokeColor with format '#RRGGBBAA' or 'HSL'"
      );
    }
    if (options?.fillOpacity) {
      console.warn(
        "huawei map does not support fillOpacity, you can set color opacity by setting fillColor with format '#RRGGBBAA' or 'HSL'"
      );
    }
    const circle = new HWMapJsSDK.HWCircle(circleOptions);
    return Promise.resolve(circle);
  }

  // 删除圆
  zvosRemoveCircle(circle: any) {
    if (!circle) {
      throw new Error("Parameter 'circle' is required");
    }
    circle.setMap(null);
    circle = null;
  }

  // 添加矩形
  async zvosAddRectangle(options: IUnifiedRectangleOptions) {
    if (!options.bounds) {
      throw new Error("Parameter 'bounds' is required");
    }
    const path = [
      { lat: options.bounds.north, lng: options.bounds.east },
      { lat: options.bounds.south, lng: options.bounds.east },
      { lat: options.bounds.south, lng: options.bounds.west },
      { lat: options.bounds.north, lng: options.bounds.west },
    ];
    let rectangleOptions = {
      map: this.map,
      geodesic: false,
      ...options?.sourceOptions,
      paths: [path],
    };
    if (options?.zIndex) rectangleOptions.zIndex = options.zIndex;
    if (options?.fillColor) rectangleOptions.fillColor = options.fillColor;
    if (options?.strokeColor)
      rectangleOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight)
      rectangleOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeLineDash)
      rectangleOptions.strokeLineDash = options.strokeLineDash;

    if (options?.strokeOpacity) {
      console.warn(
        "huawei map does not support strokeOpacity, you can set color opacity by setting stokeColor with format '#RRGGBBAA' or 'HSL'"
      );
    }
    if (options?.fillOpacity) {
      console.warn(
        "huawei map does not support fillOpacity, you can set color opacity by setting fillColor with format '#RRGGBBAA' or 'HSL'"
      );
    }
    const rectangle = new HWMapJsSDK.HWPolygon(rectangleOptions);
    rectangle.setMap(this.map);
    return Promise.resolve(rectangle);
  }
  // 删除矩形
  zvosRemoveRectangle(rectangle: any) {
    if (!rectangle) {
      throw new Error("Parameter 'rectangle' is required");
    }
    rectangle.setMap(null);
    rectangle = null;
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
    const DistanceClass = new HWMapJsSDK.HWDistanceCalculator();
    return Promise.resolve(DistanceClass.computeDistanceBetween(start, end));
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
    const polygon = new HWMapJsSDK.HWPolygon({
      map: this.map,
      paths: [path],
      fillColor: "#333",
      strokeColor: "#488",
      strokeWeight: 5,
      strokeLineDash: [20, 10],
    });
    const HWGeometryUtil = HWMapJsSDK.HWGeometryUtil;
    return Promise.resolve(HWGeometryUtil.getPolygonArea(polygon));
  }

  // 关键字搜索 或 周边搜索
  async zvosSearchPlaceByKeyword(
    options: IUnifiedSearchOptions
  ): Promise<Array<IUnifiedSearchResults>> {
    return new Promise((resolve, reject) => {
      let siteService = new HWMapJsSDK.HWSiteService();
      let resPositionList: Array<IUnifiedSearchResults> = [];
      let searchMethod;
      if(options?.location){
        searchMethod = siteService.nearbySearch.bind(siteService);
      } else {
        searchMethod = siteService.searchByText.bind(siteService);
      }
      // 初始化请求参数对象
      let requestOption: any = {
        query: options?.query || "",
        radius: options?.radius || 10000,
      };
      if (options?.location) requestOption.location = options.location;
      if (options?.poiType) requestOption.poiType = options.poiType;
      if (options?.language) requestOption.language = options.language;
      // 调用搜索接口，result为返回结果，status为返回状态
      searchMethod(requestOption, (result: any, status: any) => {
        if (status == "0") {
          for (let i = 0; i < result.sites.length; i++) {
            resPositionList.push({
              name: result.sites[i].name,
              formatAddress: result.sites[i].formatAddress,
              position: result.sites[i].location,
              sourceResult: result.sites[i], // 保存原始结果
            });
          }
          resolve(resPositionList);
        } else {
          reject(
            new Error(
              "Search failed with searchByText of huawei map, status: " + status
            )
          );
        }
      });
    });
  }
}
