/*
 * @Author: montisan i@hncoder.com
 * @Date: 2025-04-24 10:40:00
 * @LastEditors: montisan i@hncoder.com
 * @LastEditTime: 2025-04-25 15:57:06
 * @FilePath: /Map/src/GoogleMapProvider.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Loader } from "@googlemaps/js-api-loader";
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

declare const google: any;

export class GoogleMapProvider implements MapProviderInterface {
  private map: any;
  private loader!: Loader;

  constructor() {}

  get sourceMap() {
    return this.map;
  }

  async zvosLoadMap(
    container: HTMLElement,
    options: IMapInitOption
  ): Promise<void> {
    if (!options.apiKey) {
      throw new Error("Google Map API key is required");
    }

    this.loader = new Loader({
      apiKey: options.apiKey,
      // libraries: ["maps", "marker"],
      // libraries: ["places"], // 按需加载库
      version: "weekly",
      ...options?.sourceOptions,
    });

    const { Map } = await this.loader.importLibrary("maps");

    this.map = new Map(container, {
      // center: options.center || { lng: -122.4194, lat: 37.7749 },
      center: {
        lng: options?.center?.lng || 116.397428,
        lat: options?.center?.lat || 39.90923,
      },
      zoom: options.zoom || 10,
      mapId: "DEMO_MAP_ID",
    });
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

  async zvosAddMarker(options: IUnifiedMapMarkerOptions): Promise<any> {
    if (!options.position) {
      throw new Error("Parameter 'position' is required");
    }
    let markerOptions = {
      map: this.map,
      ...options?.sourceOptions,
      position: options.position,
      title: options?.title || "",
      zIndex: options?.zIndex || 10,
      gmpDraggable: options?.draggable || false,
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
      if (typeof options.icon === "object") {
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

    // this.loader.importLibrary("marker").then(({ Marker }) => {
    //   // new Marker({
    //   //   map: this.map,
    //   //   position,
    //   //   ...options,
    //   // });
    // this.loader.importLibrary("marker").then(({ AdvancedMarkerElement }) => {
    //   return new AdvancedMarkerElement(markerOptions);
    // });
    const { AdvancedMarkerElement } = await this.loader.importLibrary("marker");
    return new AdvancedMarkerElement(markerOptions);
  }

  zvosRemoveMarker(marker: any): void {
    if (!marker) {
      throw new Error("Parameter 'marker' is required");
    }
    marker.map = null;
    marker = null;
  }

  // 添加折线
  async zvosAddPolyline(options: IUnifiedPolylineOptions): Promise<any> {
    if (!options.path || options.path.length === 0) {
      throw new Error(
        "Parameter 'path' is required and must be an array of at least one point"
      );
    }
    const { Polyline } = await this.loader.importLibrary("maps");
    let lineOptions = {
      geodesic: false,
      ...options?.sourceOptions,
      path: options.path,
    };
    if (options?.zIndex) lineOptions.zIndex = options.zIndex;
    if (options?.strokeColor) lineOptions.strokeColor = options.strokeColor;
    if (options?.strokeOpacity)
      lineOptions.strokeOpacity = options.strokeOpacity;
    if (options?.strokeWeight) lineOptions.strokeWeight = options.strokeWeight;

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
    polyline.setMap(this.map);
    return Promise.resolve(polyline);
  }
  // 删除折线
  zvosRemovePolyline(line: any): void {
    if (!line) {
      throw new Error("Parameter 'line' is required");
    }
    line.setMap(null);
    line = null;
  }

  // 添加多边形
  async zvosAddPolygon(options: any): Promise<any> {
    const { Polygon } = await this.loader.importLibrary("maps");

    if (!options.path) {
      throw new Error("Parameter 'path' is required");
    }
    let polygonOptions = {
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
    if (options?.strokeOpacity)
      polygonOptions.strokeOpacity = options.strokeOpacity;
    if (options?.strokeWeight)
      polygonOptions.strokeWeight = options.strokeWeight;
    // 设置虚线样式
    if (options?.strokeLineDash) {
      console.warn("google map does not support strokeLineDash");
    }
    const polygon = new Polygon(polygonOptions);
    polygon.setMap(this.map);
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
    const { Circle } = await this.loader.importLibrary("maps");

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
    if (options?.strokeOpacity) circleOptions.strokeOpacity = options.fillColor;
    if (options?.fillOpacity) circleOptions.fillOpacity = options.fillOpacity;

    // 设置虚线样式
    if (options?.strokeLineDash) {
      console.warn("google map does not support strokeLineDash");
    }
    const circle = new Circle(circleOptions);
    circle.setMap(this.map);
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
    const { Rectangle } = await this.loader.importLibrary("maps");

    const rectangleOptions = {
      ...options?.sourceOptions,
      map: this.map,
      bounds: options.bounds,
    };
    if (options?.zIndex) rectangleOptions.zIndex = options.zIndex;
    if (options?.fillColor) rectangleOptions.fillColor = options.fillColor;
    if (options?.strokeColor)
      rectangleOptions.strokeColor = options.strokeColor;
    if (options?.strokeWeight)
      rectangleOptions.strokeWeight = options.strokeWeight;
    if (options?.strokeOpacity)
      rectangleOptions.strokeOpacity = options.fillColor;
    if (options?.fillOpacity)
      rectangleOptions.fillOpacity = options.fillOpacity;

    // 设置虚线样式
    if (options?.strokeLineDash) {
      console.warn("google map does not support strokeLineDash");
    }
    const rectangle = new Rectangle(rectangleOptions);
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
    const { spherical } = await google.maps.importLibrary("geometry");
    return spherical.computeDistanceBetween(start, end);
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
    const { spherical } = await google.maps.importLibrary("geometry");
    return spherical.computeArea(path);
  }

  // 关键字搜索 或 周边搜索
  async zvosSearchPlaceByKeyword(
    options: IUnifiedSearchOptions
  ): Promise<Array<IUnifiedSearchResults>> {
    const { Place } = await google.maps.importLibrary("places");
    let resPositionList: Array<IUnifiedSearchResults> = [];
    // 初始化请求参数对象
    let requestOption: any = {
      textQuery: options?.query || "",
      fields: ["*"],
    };
    if (options?.poiType) requestOption.includedType = options.poiType;
    if (options?.language) requestOption.language = options.language;
    if (options?.location) {
      // searchMethod = Place.searchNearby;
      requestOption.locationRestriction = {
        center: options.location,
        radius: options?.radius || 10000,
        includedPrimaryTypes: options?.poiType ? [options.poiType] : [],
      };
      const res = await Place.searchNearby(requestOption);
      const result = res?.places || [];
      for (let i = 0; i < result.length; i++) {
        resPositionList.push({
          name: result[i].displayName,
          formatAddress: result[i].formattedAddress,
          position: result[i].location,
          sourceResult: result[i], // 保存原始结果
        });
      }
    } else {
      const res = await Place.searchByText(requestOption);
      const result = res?.places || [];
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].location)
        resPositionList.push({
          name: result[i].displayName,
          formatAddress: result[i].formattedAddress,
          position: {
            lat: result[i].location.lat(),
            lng: result[i].location.lng(),
          },
          sourceResult: result[i], // 保存原始结果
        });
      }
    }
    return Promise.resolve(resPositionList);
  }
}
