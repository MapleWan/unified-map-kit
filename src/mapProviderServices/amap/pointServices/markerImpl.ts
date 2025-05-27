import { IUnifiedMapMarkerOptions } from "../../../types/MapFunctionParamsInterface";
declare const AMap: any;

export class MarkerManager {
  // 添加标记
  async zvosAddMarker(options: IUnifiedMapMarkerOptions): Promise<any> {
    if (!options.map) {
      throw new Error("Parameter 'map' is required");
    }
    if (!options.position) {
      throw new Error("Parameter 'position' is required");
    }
    let markerOptions = {
      map: options.map,
      ...options?.sourceOptions,
      position: [options.position.lng, options.position.lat],
      zIndex: options?.zIndex || 10,
      draggable: options.draggable || false,
      title: options?.title || "",
      extData: options?.customData || {},
    };
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
      if (typeof options.icon === "object" && options.icon !== null) {
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
    // return new AMap.Marker(markerOptions);
    return Promise.resolve(new AMap.Marker(markerOptions));
  }
  // 删除标记
  zvosRemoveMarker(marker: any): void {
    if (!marker) {
      throw new Error("Parameter 'marker' is required");
    }
    marker.setMap(null);
    marker = null;
  }
}
