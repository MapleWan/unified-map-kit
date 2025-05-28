import { AMapProvider } from "../AMapProvider";

import { LineManager } from "./amap/lineServices/lineImpl";
import { MarkerManager } from "./amap/pointServices/markerImpl";
import { PolygonManager } from "./amap/polygonServices/polygonImpl";
class UnitedProvider {
  private provider: any;

  constructor(provider: MapProviderInterface) {
    this.provider = provider;
  }

  setCenter(position: { lat: number; lng: number }): void {
    if (!position) {
      throw new Error("Parameter 'position' is required");
    }
    this.provider.map.setCenter([position.lng, position.lat]);
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
