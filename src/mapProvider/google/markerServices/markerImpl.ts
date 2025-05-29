import { UnifiedProvider } from "../../../mapProvider";
import { IUnifiedMapMarkerOptions } from "../../serviceParamsType";
export class MarkerManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加标记
  async addMarker(map: any, options: IUnifiedMapMarkerOptions): Promise<void> {
    if (options?.customData) {
      console.warn("google map does not support customData");
    }
    let markerOptions = {
      ...options,
      map: map,
      gmpDraggable: options?.draggable,
    } as any;
    delete markerOptions.label;
    delete markerOptions.icon;
    if (options?.label) {
      if (options.label instanceof HTMLElement) {
        markerOptions.content = options.label;
      } else {
        const customLabel = document.createElement("span");
        customLabel.style.display = "inline-block";
        customLabel.style.width = "fit-content";
        customLabel.style.fontSize = options.label?.fontSize || "12px";
        customLabel.style.color = options.label?.color || "#000";
        customLabel.innerHTML = (options.label?.content as string) || "";
        markerOptions.content = customLabel;
      }
    }
    if (options?.icon) {
      if (typeof options.icon === "object") {
        const icon = options.icon;
        const customIcon = document.createElement("img");
        customIcon.src = icon.url;
        if (icon?.size) {
          customIcon.style.width = icon.size[0] + "px";
          customIcon.style.height = icon.size[1] + "px";
        }
        markerOptions.content = customIcon;
      } else {
        const customIcon = document.createElement("img");
        customIcon.src = options.icon;
        markerOptions.content = customIcon;
      }
    }
    const { AdvancedMarkerElement } = await this.loader.importLibrary("marker");
    return Promise.resolve(new AdvancedMarkerElement(markerOptions));
  }

  // 删除标记
  removeMarker(marker: any): void {
    if (!marker) {
      throw new Error("Parameter 'marker' is required");
    }
    marker.map = null;
    marker = null;
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "markerManager",
  MarkerManager
);
