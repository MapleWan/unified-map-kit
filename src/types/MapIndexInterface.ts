/**
 * 约定：A 表示 高德地图，G 表示 google 地图，H 表示 华为地图
 */

/**
 * 地图提供商类型
 * 支持三种地图服务：高德、谷歌、华为
 */
export type MapProviderEnum = "amap" | "google" | "huawei";
export type MapProviderServiceEnum =
  | "baseManager"
  | "lineManager"
  | "markerManager"
  | "polygonManager"
  | "geometryManager"
  | "searchManager"
  | "geocoderManager"
  | "directionManager"
  | "coordinateManager";

export interface ILoadScriptOptions {
  /**
   * map-kit 需要的配置参数
   */
  mapProvider: MapProviderEnum;

  /**
   * 所有地图共有属性
   */
  apiKey: string; // 地图API密钥 A:key, G:apiKey, H:apiKey

  /**
   * AG 地图共有属性
   */
  version?: string; // 地图版本

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */

  /**
   * A 地图特有属性
   */
  securityJsCode?: string; // 地图API安全码
  plugins?: string[]; // 需要加载的插件
  AMapUI?: {
    version?: string; // AMapUI 缺省 1.1
    plugins?: string[]; // 需要加载的 AMapUI ui插件
  };
  // 是否加载 Loca， 缺省不加载
  Loca?: {
    version?: string; // Loca 版本，缺省 1.3.2
  };

  /**
   * G 地图特有属性
   */
  libraries?: string[]; // 需要加载的google地图库
  id?: string; // scritp 标签的id，如果存在，则不会添加新的script标签
  language?: string; // 默认浏览器中指定的用户首选语言设置，可以使用 language 属性强制其以特定语言
  region?: string; // 调整以提供地图域偏好设置（例如将地理编码结果偏向特定地区）

  /**
   * H 地图特有属性
   */
}
