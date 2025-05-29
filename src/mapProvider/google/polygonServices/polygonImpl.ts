import { UnifiedProvider } from "../..";
import {
  IUnifiedPolygonOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
} from "../../serviceParamsType";
export class PolygonManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加多边形
  async addPolygon(map: any, options: IUnifiedPolygonOptions): Promise<any> {
    const { Polygon } = await this.loader.importLibrary("maps");
    let polygonOptions = {
      ...options,
      map: map,
      paths:
        options.path.length && Array.isArray(options.path[0])
          ? options.path
          : [options.path],
    };
    // 设置虚线样式
    if (options?.strokeLineDash) {
      console.warn("google map does not support strokeLineDash");
    }
    const polygon = new Polygon(polygonOptions);
    polygon.setMap(map);
    return Promise.resolve(polygon);
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
  async addCircle(map: any, options: IUnifiedCircleOptions) {
    const { Circle } = await this.loader.importLibrary("maps");

    const circleOptions = {
      ...options,
      map: map,
    } as any;
    // 设置虚线样式
    if (options?.strokeLineDash) {
      console.warn("google map does not support strokeLineDash");
    }
    const circle = new Circle(circleOptions);
    circle.setMap(map);
    return Promise.resolve(circle);
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
    if (!options.bounds) {
      throw new Error("Parameter 'bounds' is required");
    }
    const { Rectangle } = await this.loader.importLibrary("maps");

    let rectangleOptions = {
      ...options,
      map: map,
    } as any;

    // 设置虚线样式
    if (options?.strokeLineDash) {
      console.warn("google map does not support strokeLineDash");
    }
    const rectangle = new Rectangle(rectangleOptions);
    rectangle.setMap(map);
    return Promise.resolve(rectangle);
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
  "google",
  "polygonManager",
  PolygonManager
);
