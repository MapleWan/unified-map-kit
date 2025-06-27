import { UnifiedProvider } from "../..";
import { IInfoWindowOptions } from "../../serviceParamsType";

declare const google: any;

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
    if (options?.offset) {
      infoOption.pixelOffset = options.offset;
    }
    const infoWindow = new google.maps.InfoWindow(infoOption);
    if (options.isAutoOpen) {
      infoWindow.open(map);
    }
    return Promise.resolve(infoWindow);
  }

  openInfoWindow(map: any, infoWindow: any, marker: any) {
    if (marker) {
      infoWindow.open({ anchor: marker });
    } else {
      infoWindow.open(map);
    }
  }

  closeInfoWindow(map: any, infoWindow: any) {
    infoWindow.close();
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "widgetManager",
  WidgetManager
);
