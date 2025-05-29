import { UnifiedProvider } from "../../../mapProvider";
import { IUnifiedMapMarkerOptions } from "../../serviceParamsType";
declare const HWMapJsSDK: any;

export class MarkerManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加标记
  addMarker(map: any, options: IUnifiedMapMarkerOptions): Promise<void> {
    if (options?.title) {
      console.warn("huawei map does not support title");
    }
    let markerOptions = {
      ...options,
      map: map,
      properties: options?.customData || {},
    } as any;
    if (options?.label) {
      markerOptions.label = {
        color: options.label?.color || "#000",
        text: options.label.content,
        fontSize: options.label?.fontSize || "12px",
      };
    }

    const marker = new HWMapJsSDK.HWMarker(markerOptions);
    if (options?.icon && typeof options.icon === "object") {
      const icon = options.icon;
      const img = new Image();
      img.src = icon.url;
      img.onload = () => {
        const scale = icon?.size ? icon.size[0] / img.width : 1;
        marker.setIcon({
          scale,
          url: icon.url,
        });
      };

      img.onerror = () => {
        console.error("Failed to load image");
      };
    }
    return Promise.resolve(marker);
  }

  // 删除标记
  removeMarker(marker: any): void {
    if (!marker) {
      throw new Error("Parameter 'marker' is required");
    }
    marker.setMap(null);
    marker = null;
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "markerManager",
  MarkerManager
);
