import { UnifiedProvider } from "../../../mapProvider";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { handleIconAndLabel, getIndexFromIntervalList } from "./utils";
declare const google: any;
import {
  IUnifiedMapMarkerOptions,
  IUnifiedMarkerClusterOptions,
} from "../../serviceParamsType";
export class MarkerManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加标记
  async addMarker(map: any, options: IUnifiedMapMarkerOptions): Promise<any> {
    if (options?.customData) {
      console.warn("google map does not support customData");
    }
    let markerOptions = {
      ...options,
      map: map,
      gmpDraggable: options?.draggable,
    } as any;
    // 传入 customData AdanceMarkerElement 构造函数会报错
    if ("customData" in markerOptions) {
      delete markerOptions.customData
    }
    delete markerOptions.label;
    delete markerOptions.icon;
    const res = handleIconAndLabel(options?.label, options?.icon);
    markerOptions.content = res.content;

    // if (options?.label) {
    //   if (options.label?.content instanceof HTMLElement) {
    //     markerOptions.content = options.label.content;
    //   } else {
    //     const customLabel = document.createElement("span");
    //     customLabel.style.display = "inline-block";
    //     customLabel.style.width = "fit-content";
    //     customLabel.style.fontSize = options.label?.fontSize || "12px";
    //     customLabel.style.color = options.label?.color || "#000";
    //     customLabel.innerHTML = (options.label?.content as string) || "";
    //     markerOptions.content = customLabel;
    //   }
    // }
    // if (options?.icon) {
    //   if (typeof options.icon === "object") {
    //     const icon = options.icon;
    //     const customIcon = document.createElement("img");
    //     customIcon.src = icon.url;
    //     if (icon?.size) {
    //       customIcon.style.width = icon.size[0] + "px";
    //       customIcon.style.height = icon.size[1] + "px";
    //     }
    //     markerOptions.content = customIcon;
    //   } else {
    //     const customIcon = document.createElement("img");
    //     customIcon.src = options.icon;
    //     markerOptions.content = customIcon;
    //   }
    // }
    const { AdvancedMarkerElement } = await this.loader.importLibrary("marker");
    const marker = new AdvancedMarkerElement(markerOptions);
    marker.getPropertiesUinified = () => {
      return options?.customData || {}
    }
    return Promise.resolve(marker);
  }

  // 删除标记
  removeMarker(marker: any): void {
    if (!marker) {
      throw new Error("Parameter 'marker' is required");
    }
    marker.map = null;
    marker = null;
  }

  async addMarkerCluster(
    map: any,
    options: IUnifiedMarkerClusterOptions
  ): Promise<any> {
    // const locations = [
    //   { lat: -31.56391, lng: 147.154312 },
    //   { lat: -33.718234, lng: 150.363181 },
    //   { lat: -33.727111, lng: 150.371124 },
    //   { lat: -33.848588, lng: 151.209834 },
    //   { lat: -33.851702, lng: 151.216968 },
    //   { lat: -34.671264, lng: 150.863657 },
    //   { lat: -35.304724, lng: 148.662905 },
    //   { lat: -36.817685, lng: 175.699196 },
    //   { lat: -36.828611, lng: 175.790222 },
    //   { lat: -37.75, lng: 145.116667 },
    //   { lat: -37.759859, lng: 145.128708 },
    //   { lat: -37.765015, lng: 145.133858 },
    //   { lat: -37.770104, lng: 145.143299 },
    //   { lat: -37.7737, lng: 145.145187 },
    //   { lat: -37.774785, lng: 145.137978 },
    //   { lat: -37.819616, lng: 144.968119 },
    //   { lat: -38.330766, lng: 144.695692 },
    //   { lat: -39.927193, lng: 175.053218 },
    //   { lat: -41.330162, lng: 174.865694 },
    //   { lat: -42.734358, lng: 147.439506 },
    //   { lat: -42.734358, lng: 147.501315 },
    //   { lat: -42.735258, lng: 147.438 },
    //   { lat: -43.999792, lng: 170.463352 },
    // ];
    const locations = [...options.points];
    const { AdvancedMarkerElement, PinElement } =
      await this.loader.importLibrary("marker");
    // Add some markers to the map.
    const markers = locations.map((position, i) => {
      let tmpLabel, tmpIcon;

      if (options?.singlePointLabel) {
        tmpLabel = options?.singlePointLabel;
      }
      if (options?.singlePointIcon) {
        tmpIcon = options?.singlePointIcon;
      }
      // 优先使用点的自定义配置
      if (position.markerOptions) {
        tmpLabel = position.markerOptions?.label;
        tmpIcon = position.markerOptions?.icon;
      }

      const { content } = handleIconAndLabel(tmpLabel, tmpIcon);
      const marker = new AdvancedMarkerElement({
        position: { lat: position.lat, lng: position.lng },
        content,
      });
      return marker;
    });
    // Add a marker clusterer to manage the markers.
    let clusterPointRenderer = function render(obj: any) {
      let content = undefined;
      if (options?.clusterPointLabel) {
        const res = handleIconAndLabel(
          options?.clusterPointLabel,
          options?.clusterPointIcon
        );
        content = res?.content;
      }
      if (options?.clusterPointIcon) {
        const res = handleIconAndLabel(
          options?.clusterPointLabel,
          options?.clusterPointIcon
        );
        content = res?.content;
      }
      if (
        options?.clusterPointIntervalList &&
        options.clusterPointIntervalList.length
      ) {
        let iconIndex = getIndexFromIntervalList(
          options?.clusterPointIntervalList.map((item) => item.maxNumber),
          obj.count
        );
        const res = handleIconAndLabel(
          options?.clusterPointIntervalList[iconIndex]?.clusterPointLabel,
          options?.clusterPointIntervalList[iconIndex]?.clusterPointIcon
        );
        content = res?.content;
      }
      content.innerHTML = obj.count;
      return new AdvancedMarkerElement({
        position: obj._position,
        content: content,
      });
    };
    if(options?.googleClusterRendererFunc) clusterPointRenderer = options.googleClusterRendererFunc
    new MarkerClusterer({
      markers,
      map,
      renderer: { render: clusterPointRenderer },
    });
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "markerManager",
  MarkerManager
);
