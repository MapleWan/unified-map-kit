/*
 * @Author: montisan i@hncoder.com
 * @Date: 2025-04-24 10:03:49
 * @LastEditors: montisan i@hncoder.com
 * @LastEditTime: 2025-04-24 11:46:05
 * @FilePath: /Map/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * map-kit - A pure JavaScript map utility library
 */

import AMapLoader from "@amap/amap-jsapi-loader";
import { Loader as GoogleMapLoader } from "@googlemaps/js-api-loader";
import { HuaweiMapLoader } from "./mapProvider/huawei/HuaweiMapLoader";
import { formatOptions } from "./utils";
import { IMapProvider, IInitMapOptions } from "./types/MapProviderInterface";
import { MapProviderEnum, ILoadScriptOptions } from "./types/MapIndexInterface";
import { UnifiedProvider } from "./mapProvider";

// import { BaseManager } from "./mapProvider/amap/baseServices/baseImpl";
// console.log(BaseManager, " ------ >inited");
// 注册地图提供者的 service 服务
import "virtual:auto-import-impl";

let cachedLoader: Record<string, any> = {}; // 缓存加载器

class MapSourceFactory {
  static loadScript(
    options: ILoadScriptOptions & IInitMapOptions
  ): Promise<any> {
    const formattedOptions = formatOptions<ILoadScriptOptions>(
      options,
      ["mapProvider", "apiKey"],
      {
        securityJsCode: "1",
      }
    );
    // amap 有些 api 需要配置 securityJsCode
    if (formattedOptions.mapProvider === "amap") {
      if (!formattedOptions?.securityJsCode) {
        console.warn(
          "When using amap, some functions may be required to be configured with securityJsCode, please refer to the official documentation of amap for details"
        );
      } else {
        window._AMapSecurityConfig = {
          securityJsCode: formattedOptions.securityJsCode,
        };
      }
    }

    switch (options.mapProvider) {
      case "amap":
        // 为高德地图加载默认插件 AMap.MarkerCluster
        let amapPlugins = []
        if (options?.plugins?.length) {
          amapPlugins = [...options.plugins, "AMap.MarkerCluster"];
        } else {
          amapPlugins = ["AMap.MarkerCluster"];
        }
        return AMapLoader.load({
          key: formattedOptions.apiKey,
          ...(formattedOptions as any),
          plugins: amapPlugins
        });
      case "google":
        return Promise.resolve(new GoogleMapLoader(formattedOptions as any));
      case "huawei":
        return new HuaweiMapLoader(formattedOptions as any).load();
      default:
        throw new Error("Unsupported map provider");
    }
  }
}

const methodCache = new WeakMap(); // 缓存方法

export async function createMap(
  options: ILoadScriptOptions & IInitMapOptions
): Promise<IMapProvider> {
  // createMap 用于前端直接创建地图服务

  // 检查必填参数 与默认参数
  let requiredOptions = ["mapProvider", "apiKey", "container"];
  if (options.mapProvider === "huawei") {
    requiredOptions.push("zoom");
  }
  const formattedOptions = formatOptions<ILoadScriptOptions & IInitMapOptions>(
    options,
    requiredOptions as Array<keyof ILoadScriptOptions & IInitMapOptions>,
    {
      zoom: 5,
      minZoom: 2,
      maxZoom: 20,
      scrollWheel: true,
      rotateControl: false,
      scaleControl: false,
      zoomControl: false,
    }
  );

  // loader 需要加缓存
  let loader; // 加载地图脚本
  if (cachedLoader[formattedOptions.mapProvider]) {
    console.log("加载缓存 loader");
    loader = cachedLoader[formattedOptions.mapProvider];
  } else {
    console.log("加载 loader");
    loader = await MapSourceFactory.loadScript(formattedOptions as any);
    cachedLoader[formattedOptions.mapProvider] = loader || true;
  }

  // 根据地图提供商创建对应的地图对象
  const mapProvider = new UnifiedProvider(formattedOptions.mapProvider, loader);

  // 对 用户使用地图组件的方法进行拦截
  // const mapProxy = new Proxy(mapProvider, {
  //   get(target, prop, receiver) {
  //     if (prop === "then") return undefined;
  //     if (prop === "map") return undefined;

  //     if (prop === "source") {
  //       // 在这里可以对用户访问原始地图对象的方法进行拦截，后续可能需要限制用户的访问
  //       return new Proxy(target.map, {
  //         get(targetMap, prop, receiver) {
  //           let cached = methodCache.get(targetMap);
  //           if (!cached) {
  //             cached = {};
  //             methodCache.set(targetMap, cached);
  //           }
  //           if (!cached[prop]) {
  //             const tmpGetter = Reflect.get(targetMap, prop, receiver);
  //             cached[prop] =
  //               typeof tmpGetter === "function"
  //                 ? tmpGetter.bind(targetMap)
  //                 : tmpGetter;
  //           }
  //           return cached[prop];
  //         },
  //       });
  //     }
  //     if (prop in target) {
  //       let cached = methodCache.get(target);
  //       if (!cached) {
  //         cached = {};
  //         methodCache.set(target, cached);
  //       }
  //       if (!cached[prop]) {
  //         const tmpGetter = Reflect.get(target, prop, receiver);
  //         cached[prop] =
  //           typeof tmpGetter === "function"
  //             ? tmpGetter.bind(target)
  //             : tmpGetter;
  //       }

  //       return cached[prop];
  //     }

  //     console.warn(
  //       `Property ${String(
  //         prop
  //       )} not found in provider, maybe you can use 'provider.source' to access it. 'provider.source' is a proxy object which can access all properties of provider map object.`
  //     );
  //     return undefined;
  //   },
  //   set(target, prop, value, receiver) {
  //     if (prop in target) {
  //       return Reflect.set(target, prop, value, receiver);
  //     }
  //     console.warn(
  //       `Property ${String(prop)} not found in provider. Assignment ignored.`
  //     );
  //     return false;
  //   },
  // });
  // return mapProxy
  //   .initMap(formattedOptions)
  //   .then(() => mapProxy as IMapProvider);

  return mapProvider
    .initMap(formattedOptions)
    .then(() => mapProvider as IMapProvider);
}

/**
 * 初始化地图配置
 * @param {IMapInitOption} options - 地图初始化选项
 * @returns {Promise<IMapProvider>} 返回Promise，解析为地图提供者实例
 * @description 目前只是简单调用createMap，后续可以扩展更多初始化逻辑
 */
export function init(options: ILoadScriptOptions & IInitMapOptions) {
  // 这里的 options 可能需要后端提供  后续再完善
  return createMap(options);
}
