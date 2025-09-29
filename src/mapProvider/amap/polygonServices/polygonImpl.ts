import { UnifiedProvider } from "../..";
import {
  IUnifiedPolygonOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
} from "../../serviceParamsType";
declare const AMap: any;
export class PolygonManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加多边形
  async addPolygon(map: any, options: IUnifiedPolygonOptions): Promise<any> {
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
      ...options,
      path: amapPath,
    };
    if (options?.strokeLineDash) {
      polygonOptions.strokeDasharray = options.strokeLineDash;
      polygonOptions.strokeStyle = "dashed";
    }
    let polygon = new AMap.Polygon(polygonOptions);
    map.add(polygon);
    return Promise.resolve(polygon);
  }
  addPolygonSync(map: any, options: IUnifiedPolygonOptions): any {
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
      ...options,
      path: amapPath,
    };
    if (options?.strokeLineDash) {
      polygonOptions.strokeDasharray = options.strokeLineDash;
      polygonOptions.strokeStyle = "dashed";
    }
    let polygon = new AMap.Polygon(polygonOptions);
    map.add(polygon);
    return polygon;
  }
  // 删除多边形
  removePolygon(map: any, polygon: any): void {
    if (!polygon) {
      throw new Error("Parameter 'polygon' is required");
    }
    map.remove(polygon);
  }

  // 添加圆
  async addCircle(map: any, options: IUnifiedCircleOptions) {
    const circleOptions = {
      ...options,
      center: [options.center.lng, options.center.lat],
    };
    if (options?.strokeLineDash) {
      circleOptions.strokeDasharray = options.strokeLineDash;
      circleOptions.strokeStyle = "dashed";
    }
    const circle = new AMap.Circle(circleOptions);
    map.add(circle);
    return Promise.resolve(circle);
  }
  addCircleSync(map: any, options: IUnifiedCircleOptions) {
    const circleOptions = {
      ...options,
      center: [options.center.lng, options.center.lat],
    };
    if (options?.strokeLineDash) {
      circleOptions.strokeDasharray = options.strokeLineDash;
      circleOptions.strokeStyle = "dashed";
    }
    const circle = new AMap.Circle(circleOptions);
    map.add(circle);
    return circle;
  }
  // 删除圆
  removeCircle(map: any, circle: any) {
    if (!circle) {
      throw new Error("Parameter 'circle' is required");
    }
    map.remove(circle);
  }

  // 添加矩形
  async addRectangle(map: any, options: IUnifiedRectangleOptions) {
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
      ...options,
      map: map,
      bounds: bounds,
    } as any;

    // 设置虚线样式
    if (options?.strokeLineDash) {
      rectangleOptions.strokeDasharray = options.strokeLineDash;
      rectangleOptions.strokeStyle = "dashed";
    }
    const rectangle = new AMap.Rectangle(rectangleOptions);
    rectangle.setMap(map);
    return Promise.resolve(rectangle);
  }
  addRectangleSync(map: any, options: IUnifiedRectangleOptions) {
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
      ...options,
      map: map,
      bounds: bounds,
    } as any;

    // 设置虚线样式
    if (options?.strokeLineDash) {
      rectangleOptions.strokeDasharray = options.strokeLineDash;
      rectangleOptions.strokeStyle = "dashed";
    }
    const rectangle = new AMap.Rectangle(rectangleOptions);
    rectangle.setMap(map);
    return rectangle;
  }
  // 删除矩形
  removeRectangle(map: any, rectangle: any) {
    if (!rectangle) {
      throw new Error("Parameter 'rectangle' is required");
    }
    map.remove(rectangle);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "polygonManager",
  PolygonManager
);
