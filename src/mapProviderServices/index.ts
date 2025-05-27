import { AMapProvider } from "../AMapProvider";
class UnitedProvider {
     private provider: any;
     

      constructor(provider: MapProviderInterface) {
        this.provider = provider;
      }
    
      zvosSetCenter(position: { lat: number; lng: number }): void {
        if (!position) {
          throw new Error("Parameter 'position' is required");
        }
        this.provider.map.setCenter([position.lng, position.lat]);
      }
    
      zvosSetZoom(level: number): void {
        this.map.setZoom(level);
      }
      // 添加标记
      zvosAddMarker(options: IUnifiedMapMarkerOptions): Promise<any> {
        return this.markerManager.zvosAddMarker({ map: this.map, ...options });
      }
      // 删除标记
      zvosRemoveMarker(marker: any): void {
        this.markerManager.zvosRemoveMarker(marker);
      }
    
      // 添加折线
      zvosAddPolyline(options: IUnifiedPolylineOptions): Promise<any> {
        if (!options.path || options.path.length === 0) {
          throw new Error(
            "Parameter 'path' is required and must be an array of at least one point"
          );
        }
        return this.lineManager.zvosAddPolyline({ map: this.map, ...options });
      }
      // 删除折线
      zvosRemovePolyline(line: any): void {
        this.lineManager.zvosRemovePolyline(this.map, line);
      }
    
      // 添加多边形
      zvosAddPolygon(options: IUnifiedPolygonOptions): Promise<any> {
        return this.polygonManager.zvosAddPolygon({ map: this.map, ...options });
      }
      // 删除多边形
      zvosRemovePolygon(polygon: any): void {
        this.polygonManager.zvosRemovePolygon(this.map, polygon);
      }
    
      // 添加圆
      zvosAddCircle(options: IUnifiedCircleOptions) {
        return this.polygonManager.zvosAddCircle({ map: this.map, ...options });
      }
      // 删除圆
      zvosRemoveCircle(circle: any) {
        this.polygonManager.zvosRemoveCircle(this.map, circle);
      }
    
      // 添加矩形
      async zvosAddRectangle(options: IUnifiedRectangleOptions) {
        return this.polygonManager.zvosAddRectangle({ map: this.map, ...options });
      }
      // 删除矩形
      zvosRemoveRectangle(rectangle: any) {
        return this.polygonManager.zvosRemoveRectangle(this.map, rectangle);
      }
}