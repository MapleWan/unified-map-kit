/*
 * @Author: montisan i@hncoder.com
 * @Date: 2025-04-24 10:03:49
 * @LastEditors: montisan i@hncoder.com
 * @LastEditTime: 2025-04-24 11:46:05
 * @FilePath: /Map/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * zvos-map-kit - A pure JavaScript map utility library
 */

import { GoogleMapProvider } from "./GoogleMapProvider";
import { AMapProvider } from "./AMapProvider";
import { HuaweiMapProvider } from "./HuaweiMapProvider";

import { MapProvider } from "./types/MapProviderInterface";
import {
  MapProviderInterface,
} from "./types/MapProviderInterface";
import { IMapInitOption } from "./types/MapFunctionParamsInterface";

class MapFactory {
  static createProvider(type: MapProvider) {
    switch (type) {
      case "google":
        return new GoogleMapProvider();
      case "amap":
        return new AMapProvider();
      case "huawei":
        return new HuaweiMapProvider();
      default:
        throw new Error("Unsupported map provider");
    }
  }
}

const methodCache = new WeakMap(); // 缓存方法

export function createMap(
  options: IMapInitOption
): Promise<MapProviderInterface> {
  // createMap 用于前端直接创建地图服务
  const mapProvider = MapFactory.createProvider(options.provider);
  const mapProxy = new Proxy(mapProvider, {
    get(target, prop, receiver) {
      if (prop === "map") {
        return undefined;
      }
      if (prop in target) {
        // return Reflect.get(target, prop, receiver).bind(target);

        let cached = methodCache.get(target);
        if (!cached) {
          cached = {};
          methodCache.set(target, cached);
        }
        if (!cached[prop]) {
          const tmpGetter = Reflect.get(target, prop, receiver)
          cached[prop] = typeof tmpGetter === 'function' ? Reflect.get(target, prop, receiver).bind(target): tmpGetter
        }

        return cached[prop];
      }

      if (target.sourceMap && prop in target.sourceMap) {
        //   return Reflect.get(target.sourceMap, prop, receiver).bind(
        //     target.sourceMap
        //   );
        let cached = methodCache.get(target.sourceMap);
        if (!cached) {
          cached = {};
          methodCache.set(target.sourceMap, cached);
        }

        if (!cached[prop]) {
          const tmpGetter = Reflect.get(target.sourceMap, prop, receiver)
          cached[prop] = typeof tmpGetter === 'function' ? Reflect.get(target.sourceMap, prop, receiver).bind(target.sourceMap): tmpGetter
        }

        return cached[prop];
      }

      console.warn(
        `Property ${String(
          prop
        )} not found in both provider and provider.sourceMap.`
      );
      return undefined;
    },
    set(target, prop, value, receiver) {
      if (prop in target) {
        return Reflect.set(target, prop, value, receiver);
      }
      if (target.sourceMap && prop in target.sourceMap) {
        return Reflect.set(target.sourceMap, prop, value, receiver);
      }
      console.warn(
        `Property ${String(
          prop
        )} not found in both provider and provider.sourceMap. Assignment ignored.`
      );
      return false;
    },
  });
  return mapProvider
    .zvosLoadMap(options.container, options || {})
    .then(() => mapProxy as MapProviderInterface);
}

/**
 * 初始化地图配置
 * @param {IMapInitOption} options - 地图初始化选项
 * @returns {Promise<MapProviderInterface>} 返回Promise，解析为地图提供者实例
 * @description 目前只是简单调用createMap，后续可以扩展更多初始化逻辑
 */
export function init(options: IMapInitOption){
  // 这里的 options 可能需要后端提供  后续再完善
  return createMap(options)
}