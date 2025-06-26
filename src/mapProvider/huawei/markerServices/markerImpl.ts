import { UnifiedProvider } from "../../../mapProvider";
import {
  IUnifiedMapMarkerOptions,
  IUnifiedMarkerClusterOptions,
} from "../../serviceParamsType";
import { getIndexFromIntervalList, handleIconAndLabel } from "./utils";
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
    if (options?.icon) {
      const icon = options.icon;
      if (typeof icon === "object") {
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
      } else {
        marker.setIcon({
          url: icon,
        });
      }
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

  addMarkerCluster(
    map: any,
    options: IUnifiedMarkerClusterOptions
  ): Promise<any> {
    // var markers = [];
    // var markerCluster;
    // var locations = [
    //   { lat: 51.514516, lng: -0.127006 },
    //   { lat: 51.506449, lng: -0.124426 },
    //   { lat: 51.509708, lng: -0.120045 },
    //   { lat: 51.509068, lng: -0.142142 },
    //   { lat: 51.497608, lng: -0.145632 },
    //   { lat: 51.506159, lng: -0.14028 },
    //   { lat: 51.504742, lng: -0.147049 },
    //   { lat: 51.512676, lng: -0.118976 },
    //   { lat: 51.510848, lng: -0.120848 },
    // ];
    let markers = [];
    let markerCluster;
    let locations = [...options.points];
    for (let i = 0; i < locations.length; i++) {
      let opts = {
        position: locations[i],
      } as any;
      let tmpLabel, tmpIcon;
      if (options?.singlePointLabel) {
        tmpLabel = options?.singlePointLabel;
      }
      if (options?.singlePointIcon) {
        tmpIcon = options?.singlePointIcon;
      }
      if (locations[i]?.markerOptions) {
        tmpLabel = locations[i].markerOptions?.label;
        tmpIcon = locations[i].markerOptions?.icon;
      }

      // if (tmpLabel) {
      //   opts.label = {
      //     color: tmpLabel?.color || "#000",
      //     text: tmpLabel?.content,
      //     fontSize: tmpLabel?.fontSize || "12px",
      //   };
      // }
      // if (tmpIcon) {
      //   const icon = tmpIcon;
      //   if (typeof icon === "object") {
      //     const img = new Image();
      //     img.src = icon.url;
      //     img.onload = () => {
      //       const scale = icon?.size ? icon.size[0] / img.width : 1;
      //       marker.setIcon({
      //         scale,
      //         url: icon.url,
      //       });
      //     };

      //     img.onerror = () => {
      //       console.error("Failed to load image");
      //     };
      //   } else {
      //     marker.setIcon({
      //       url: icon,
      //     });
      //   }
      // }
      const res = handleIconAndLabel(tmpLabel, tmpIcon);
      opts.label = res.label;
      opts.icon = res.icon;
      const marker = new HWMapJsSDK.HWMarker(opts);
      markers.push(marker);
    }
    const renderClusterMarker = (markers: any) => {
      let tmpIcon: any, tmpLabel: any;
      const count = markers.length;
      if (options?.clusterPointLabel) tmpLabel = options.clusterPointLabel;
      if (options?.clusterPointIcon) tmpIcon = options.clusterPointIcon;
      if (
        options?.clusterPointIntervalList &&
        options.clusterPointIntervalList.length
      ) {
        let iconIndex = getIndexFromIntervalList(
          options?.clusterPointIntervalList.map((item) => item.maxNumber),
          count
        );
        tmpLabel =
          options?.clusterPointIntervalList[iconIndex]?.clusterPointLabel || tmpLabel;
        tmpIcon =
          options?.clusterPointIntervalList[iconIndex]?.clusterPointIcon || tmpIcon;
      }
      const res = handleIconAndLabel(tmpLabel, tmpIcon);
      tmpLabel = res.label;
      tmpIcon = res.icon;
      tmpLabel.text = count + "";
      return {
        label: tmpLabel,
        icon: tmpIcon,
      };
    };
    // 初始化聚合点
    markerCluster = new HWMapJsSDK.HWMarkerCluster(map, markers, {
      renderClusterMarker,
    });
    return Promise.resolve(markerCluster);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "markerManager",
  MarkerManager
);
