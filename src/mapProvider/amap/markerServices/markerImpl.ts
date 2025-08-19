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
    const marker = new AMap.Marker(markerOptions);
    marker.getCustomDataUinified = () => {
      return options?.customData || {};
    };
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
      let points = options.points.map((item) => {
        return {
          ...item,
          lnglat: [item.position.lng, item.position.lat],
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
      if (options?.amapClusterRendererFunc)
        _renderClusterMarker = options.amapClusterRendererFunc;
      //非聚合点样式
      let _renderMarker = function (context: any) {
        console.log(context, "--------<<<<<");
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

        // 由于 context 拿不到原始 marker option 对象，这里通过经纬度唯一标识获取原始 option信息
        const markerOriginOption = options.points.find((item) => {
          if (
            item.position.lng + "" + item.position.lat ===
            context.data[0].position.lng + "" + context.data[0].position.lat
          )
            return item;
        });
        context.marker.getCustomDataUinified = () => {
          // return context.data[0]?.customData || {};  // 拿不到 customData 信息
          return markerOriginOption?.customData || {};
        };
        context.marker.setContent(content);
        if (options?.singlePointClickFunc) {
          if (options?.singlePointClickFuncThis) {
            // context.marker.on(
            //   "click",
            //   options.singlePointClickFunc.bind(
            //     options.singlePointClickFuncThis
            //   )
            // );
            context.marker.on("click", (c: any) => {
              const marker = c?.target;
              if (marker && options?.singlePointClickFunc) {
                if (options?.singlePointClickFuncThis) {
                  options.singlePointClickFunc.bind(
                    options.singlePointClickFuncThis
                  );
                }
                options.singlePointClickFunc(marker);
              }
            });
          } else {
            throw new Error("Parameter 'singlePointClickFuncThis' is required");
          }
        }
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
