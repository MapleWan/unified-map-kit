import { UnifiedProvider } from "../..";
import {
  IUnifiedPolygonOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
} from "../../serviceParamsType";
declare const HWMapJsSDK: any;

export class PolygonManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加多边形
  async addPolygon(map: any, options: IUnifiedPolygonOptions): Promise<any> {
    let polygonOptions = {
      map: map,
      ...options,
      paths:
        options.path.length && Array.isArray(options.path[0])
          ? options.path
          : [options.path],
    };

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
  addPolygonSync(map: any, options: IUnifiedPolygonOptions): any {
    let polygonOptions = {
      map: map,
      ...options,
      paths:
        options.path.length && Array.isArray(options.path[0])
          ? options.path
          : [options.path],
    };

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
    return polygon;
  }
  // 删除多边形
  removePolygon(map: any, polygon: any): void {
    if (!polygon) {
      throw new Error("Parameter 'polygon' is required");
    }
    polygon.setMap(null);
    polygon = null;
  }

  // 添加圆
  async addCircle(map: any, options: IUnifiedCircleOptions): Promise<any> {
    const circleOptions = {
      ...options,
      map: map,
    };

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
  addCircleSync(map: any, options: IUnifiedCircleOptions): any {
    const circleOptions = {
      ...options,
      map: map,
    };

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
    return circle;
  }
  // 删除圆
  removeCircle(map: any, circle: any) {
    if (!circle) {
      throw new Error("Parameter 'circle' is required");
    }
    circle.setMap(null);
    circle = null;
  }

  // 添加矩形
  async addRectangle(map: any, options: IUnifiedRectangleOptions) {
    const path = [
      { lat: options.bounds.north, lng: options.bounds.east },
      { lat: options.bounds.south, lng: options.bounds.east },
      { lat: options.bounds.south, lng: options.bounds.west },
      { lat: options.bounds.north, lng: options.bounds.west },
    ];
    let rectangleOptions = {
      map: map,
      ...options,
      paths: [path],
    };

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
    rectangle.setMap(map);
    return Promise.resolve(rectangle);
  }
  addRectangleSync(map: any, options: IUnifiedRectangleOptions): any {
    const path = [
      { lat: options.bounds.north, lng: options.bounds.east },
      { lat: options.bounds.south, lng: options.bounds.east },
      { lat: options.bounds.south, lng: options.bounds.west },
      { lat: options.bounds.north, lng: options.bounds.west },
    ];
    let rectangleOptions = {
      map: map,
      ...options,
      paths: [path],
    };

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
    rectangle.setMap(map);
    return rectangle;
  }
  // 删除矩形
  removeRectangle(map: any, rectangle: any) {
    if (!rectangle) {
      throw new Error("Parameter 'rectangle' is required");
    }
    rectangle.setMap(null);
    rectangle = null;
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "polygonManager",
  PolygonManager
);
