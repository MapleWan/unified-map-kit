import { UnifiedProvider } from "../../../mapProvider";
import {
  IUnifiedMapMarkerOptions,
  IUnifiedMarkerClusterOptions,
} from "../../serviceParamsType";
import { getIndexFromIntervalList, handleIconAndLabel } from "./utils";
declare const AMap: any;
export class MarkerManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加标记
  addMarker(map: any, options: IUnifiedMapMarkerOptions): Promise<void> {
    let markerOptions = {
      ...options,
      map: map,
      position: [options.position.lng, options.position.lat],
      extData: options?.customData || {},
    } as any;
    delete markerOptions.label;
    delete markerOptions.icon;
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
    //   if (typeof options.icon === "object" && options.icon !== null) {
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

    const res = handleIconAndLabel(options?.label, options?.icon);
    markerOptions.content = res.content;
    const marker = new AMap.Marker(markerOptions)
    marker.getPropertiesUinified = () => {
      return options?.customData || {}
    }
    // return new AMap.Marker(markerOptions);
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
    return new Promise((resolve, reject) => {
      // let points = [
      //   { weight: 8, lnglat: ["116.506647", "39.795337"] },
      //   { weight: 1, lnglat: ["116.843352", "40.377362"] },
      //   { weight: 1, lnglat: ["116.637122", "40.324272"] },
      //   { weight: 1, lnglat: ["116.105381", "39.937183"] },
      //   { weight: 1, lnglat: ["116.653525", "40.128936"] },
      //   { weight: 1, lnglat: ["116.486409", "39.921489"] },
      //   { weight: 1, lnglat: ["116.658603", "39.902486"] },
      //   { weight: 1, lnglat: ["116.338033", "39.728908"] },
      //   { weight: 1, lnglat: ["116.235906", "40.218085"] },
      //   { weight: 1, lnglat: ["116.366794", "39.915309"] },
      //   { weight: 1, lnglat: ["116.418757", "39.917544"] },
      //   { weight: 1, lnglat: ["116.139157", "39.735535"] },
      //   { weight: 1, lnglat: ["116.195445", "39.914601"] },
      //   { weight: 1, lnglat: ["116.310316", "39.956074"] },
      //   { weight: 1, lnglat: ["116.286968", "39.863642"] },
      // ];
      let points = options.points.map((item) => {
        return {
          ...item,
          lnglat: [item.lng, item.lat],
        };
      });

      //聚合点样式
      let _renderClusterMarker = function (context: any) {
        //context 为回调参数，
        //包含如下属性 marker:当前聚合点，count:当前聚合点内的点数量
        // let clusterCount = context.count; //聚合点内点数量
        // context.marker.setContent(
        //   '<div style="background-color:#00ff00">' + clusterCount + "</div>"
        // );

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
            context.count
          );
          const res = handleIconAndLabel(
            options?.clusterPointIntervalList[iconIndex]?.clusterPointLabel,
            options?.clusterPointIntervalList[iconIndex]?.clusterPointIcon
          );
          content = res?.content;
        }
        content.innerHTML = context.count;
        context.marker.setContent(content);
      };
      if(options?.amapClusterRendererFunc) _renderClusterMarker = options.amapClusterRendererFunc
      //非聚合点样式
      let _renderMarker = function (context: any) {
        //context 为回调参数，
        //包含如下属性 marker:当前非聚合点
        // console.log("非聚合点", context);
        // context.marker.setContent(
        //   '<div style="background-color:#ff0000">1</div>'
        // );
        let tmpLabel, tmpIcon;
        if (options?.singlePointLabel) {
          tmpLabel = options?.singlePointLabel;
        }
        if (options?.singlePointIcon) {
          tmpIcon = options?.singlePointIcon;
        }
        const pointData = context.data[0]?.markerOptions;
        if (pointData) {
          tmpLabel = pointData?.label;
          tmpIcon = pointData?.icon;
        }
        const { content } = handleIconAndLabel(tmpLabel, tmpIcon);
        context.marker.setContent(content);
      };

      const cluster = new AMap.MarkerCluster(
        map, //地图实例
        points, //海量点数据，数据中需包含经纬度信息字段 lnglat
        {
          gridSize: 60, //数据聚合计算时网格的像素大小
          renderClusterMarker: _renderClusterMarker, //上述步骤的自定义聚合点样式
          renderMarker: _renderMarker, //上述步骤的自定义非聚合点样式
        }
      );
      // const cluster = new AMap.MarkerCluster(
      //   map, //地图实例
      //   points, //海量点数据，数据中需包含经纬度信息字段 lnglat
      //   {
      //     styles: styles,
      //     gridSize: 60,
      //   }
      // );
      resolve(cluster);
    });
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "markerManager",
  MarkerManager
);
