import { UnifiedProvider } from "../..";
import { IInfoWindowOptions } from "../../serviceParamsType";

declare const HWMapJsSDK: any;
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
      infoOption.offset = options.offset;
    }
    const infoWindow = new HWMapJsSDK.HWInfoWindow({
      ...infoOption,
      map,
    });
    if (options.isAutoOpen) {
      infoWindow.open();
    } else {
      infoWindow.close();
    }
    return Promise.resolve(infoWindow);
  }
  createInfoWindowSync(map: any, options: IInfoWindowOptions): any {
    let infoOption = { ...options } as any;
    if (options?.content instanceof HTMLElement) {
      infoOption.content = options.content.cloneNode(true) as HTMLElement;
    }
    if (options?.offset) {
      infoOption.offset = options.offset;
    }
    const infoWindow = new HWMapJsSDK.HWInfoWindow({
      ...infoOption,
      map,
    });
    if (options.isAutoOpen) {
      infoWindow.open();
    } else {
      infoWindow.close();
    }
    return infoWindow;
  }

  openInfoWindow(map: any, infoWindow: any, marker: any) {
    if (marker) {
      infoWindow.open(marker);
    } else {
      infoWindow.open();
    }
  }

  closeInfoWindow(map: any, infoWindow: any) {
    infoWindow.close();
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "widgetManager",
  WidgetManager
);
