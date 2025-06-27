import { UnifiedProvider } from "../..";
import { IInfoWindowOptions } from "../../serviceParamsType";
declare const AMap: any;

export class WidgetManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  async createInfoWindow(map: any, options: IInfoWindowOptions) {
    let infoOption = { ...options } as any;
    if (options?.content instanceof HTMLElement) {
      infoOption.content = options.content.cloneNode(true) as HTMLElement;
    }
    if (options?.offset && options?.offset?.length >= 2) {
      infoOption.offset = new AMap.Pixel(options.offset[0], options.offset[1]);
    }
    infoOption.position = [options.position.lng, options.position.lat];
    const infoWindow = new AMap.InfoWindow(infoOption);
    if (options.isAutoOpen) {
      infoWindow.open(map);
    }
    return Promise.resolve(infoWindow);
  }

  openInfoWindow(map: any, infoWindow: any, marker: any) {
    infoWindow.open(map);
  }

  closeInfoWindow(map: any, infoWindow: any) {
    infoWindow.close();
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "widgetManager",
  WidgetManager
);
