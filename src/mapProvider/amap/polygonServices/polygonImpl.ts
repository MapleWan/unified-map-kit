import {
  IUnifiedPolygonOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
} from "../../../types/MapFunctionParamsInterface";

declare const AMap: any;

export class PolygonManager {
  // 添加多边形
  async addPolygon(options: IUnifiedPolygonOptions): Promise<any> {
    if (!options.map) {
      throw new Error("Parameter 'map' is required");
    }
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
    options.map.add(polygon);
    // this.map.setFitView();
    return Promise.resolve(polygon);
  }
  // 删除多边形
  removePolygon(map: any, polygon: any): void {
    if (!map) {
      throw new Error("Parameter 'map' is required");
    }
    if (!polygon) {
      throw new Error("Parameter 'polygon' is required");
    }
    map.remove(polygon);
  }

  // 添加圆
  async addCircle(options: IUnifiedCircleOptions) {
    if (!options.map) {
      throw new Error("Parameter 'map' is required");
    }
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
    options.map.add(circle);
    return Promise.resolve(circle);
  }
  // 删除圆
  removeCircle(map: any, circle: any) {
    if (!map) {
      throw new Error("Parameter 'map' is required");
    }
    if (!circle) {
      throw new Error("Parameter 'circle' is required");
    }
    map.remove(circle);
  }

  // 添加矩形
  async addRectangle(options: IUnifiedRectangleOptions) {
    if (!options.map) {
      throw new Error("Parameter 'map' is required");
    }
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
      map: options.map,
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
    rectangle.setMap(options.map);
    return Promise.resolve(rectangle);
  }
  // 删除矩形
  removeRectangle(map: any, rectangle: any) {
    if (!map) {
      throw new Error("Parameter 'map' is required");
    }
    if (!rectangle) {
      throw new Error("Parameter 'rectangle' is required");
    }
    map.remove(rectangle);
  }
}
