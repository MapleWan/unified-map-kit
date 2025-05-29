/**
 * 约定：A 表示 高德地图，G 表示 google 地图，H 表示 华为地图
 */

export interface IUnifiedMapMarkerOptions {
  // ----------- 所有平台都支持的共性属性 -----------
  /** 地图实例 */
  map?: any;

  /** 坐标位置 */
  position: { lat: number; lng: number }; // google:position, huawei:position, amap:[position.lng, position.lat]

  /** 层级高度（默认由地图实现决定） */
  zIndex?: number;

  /** 是否可拖拽（默认 false） */
  draggable?: boolean; // google:gmpDraggable, huawei:draggable, amap:draggable

  /** 鼠标悬停标题（google:title, huawei 不支持, amap:title） */
  title?: string;

  /** 自定义数据 */
  customData?: any; // google 不支持, huawei:properties, amap:extData

  // ----------- 跨平台兼容设计属性 -----------
  /** 图标配置（支持三种格式转换） */
  icon?:
    | string // 直接使用图片 URL
    | {
        url: string; // google:创建HTMLElement 传给content.glyph, huawei:icon.url, amap:icon.image
        size?: [number, number]; // 宽高，google:创建HTMLElement 传给content.glyph, huawei:icon.scale(要将传入的参数转换成 0-1 的 scale), amap:icon.size
      };

  /** 标记的文本描述 */
  label?: {
    content: string | HTMLElement; // google:content.glyph<string, HTMLElement>, huawei:label.text<string>, amap:content<string, HTMLElement>
    fontSize?: string; // 设置字体大小
    color?: string; // 字体颜色
  };

  // ----------- 平台专属扩展属性 -----------
  /** 平台特有配置（使用时需配合对应 SDK） */
  sourceOptions?: any;
}

export interface IUnifiedPolylineOptions {
  // ----------- 所有平台都支持的共性属性 -----------
  /** 地图实例（可选） */
  map?: any;

  /** 路径坐标集合 */
  path: Array<{ lat: number; lng: number }>; // google: path, huawei: path, amap: path<Array<Array<number>>>

  /** 层级高度（默认由地图实现决定） */
  zIndex?: number;
  /** 线条颜色 */
  strokeColor?: string;

  /** 线条宽度（单位像素） */
  strokeWeight?: number;

  // ----------- 跨平台兼容设计属性 -----------
  /** 虚线样式（需要平台转换逻辑） */
  strokeLineDash?: Array<number>; // 华为: strokeLineDash / AMap: strokeDasharray / Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素

  /** 线条透明度（0-1，默认 1） */
  strokeOpacity?: number; // AMap/Google 原生支持，华为需通过颜色透明度实现

  /** 是否显示方向箭头（默认 false） */
  showDirection?: boolean; // 华为: showDir / AMap: showDir / Google 无原生支持

  // ---------- 部分支持属性 --------------
  /** 是否大地曲线（默认 false） */
  // geodesic?: boolean; // Google/AMap 原生支持，华为需特殊处理
  /** 自定义数据属性 */
  // customData?: any; // AMap: extData / 华为: 无原生支持 / Google: 无原生支持
  /** 是否可拖拽（默认 false） */
  // draggable?: boolean;        // AMap/Google 原生支持，华为需通过自定义逻辑实现

  // ----------- 平台专属扩展属性 -----------
  /** 平台特有配置（使用时需配合对应 SDK） */
  sourceOptions?: any;
}

export interface IUnifiedPolygonOptions {
  // ----------- 所有平台都支持的共性属性 -----------
  /** 地图实例（可选） */
  map?: any;

  /** 路径坐标集合 */
  path:
    | Array<{ lat: number; lng: number }>
    | Array<Array<{ lat: number; lng: number }>>; // google: paths, huawei: paths, amap: path

  /** 层级高度（默认由地图实现决定） */
  zIndex?: number;
  fillColor?: string; // 填充颜色
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  /** 线条颜色 */
  strokeColor?: string;

  /** 线条宽度（单位像素） */
  strokeWeight?: number;

  // ----------- 跨平台兼容设计属性 -----------
  /** 虚线样式（需要平台转换逻辑） */
  strokeLineDash?: Array<number>; // 华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持

  /** 线条透明度（0-1，默认 1） */
  strokeOpacity?: number; // AMap/Google 原生支持，华为需通过颜色透明度实现

  /** 是否显示方向箭头（默认 false） */
  showDirection?: boolean; // 华为: showDir / AMap: showDir / Google 无原生支持

  // ---------- 部分支持属性 --------------
  /** 是否大地曲线（默认 false） */
  // geodesic?: boolean; // Google/AMap 原生支持，华为需特殊处理
  /** 自定义数据属性 */
  // customData?: any; // AMap: extData / 华为: 无原生支持 / Google: 无原生支持
  /** 是否可拖拽（默认 false） */
  // draggable?: boolean;        // AMap/Google 原生支持，华为需通过自定义逻辑实现

  // ----------- 平台专属扩展属性 -----------
  /** 平台特有配置（使用时需配合对应 SDK） */
  sourceOptions?: any;
}

export interface IUnifiedCircleOptions {
  // ----------- 所有平台都支持的共性属性 -----------
  /** 地图实例（可选） */
  map?: any;

  /** 路径坐标集合 */
  center: { lat: number; lng: number }; // google: paths, huawei: paths, amap: path

  /** 层级高度（默认由地图实现决定） */
  zIndex?: number;
  radius: number; // 圆半径 单位为米
  fillColor?: string; // 填充颜色
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置

  /** 线条颜色 */
  strokeColor?: string;

  /** 线条宽度（单位像素） */
  strokeWeight?: number;

  // ----------- 跨平台兼容设计属性 -----------
  /** 虚线样式（需要平台转换逻辑） */
  strokeLineDash?: Array<number>; // 华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持

  /** 线条透明度（0-1，默认 1） */
  strokeOpacity?: number; // AMap/Google 原生支持，华为需通过颜色透明度实现

  // ---------- 部分支持属性 --------------
  /** 是否大地曲线（默认 false） */
  // geodesic?: boolean; // Google/AMap 原生支持，华为需特殊处理
  /** 自定义数据属性 */
  // customData?: any; // AMap: extData / 华为: 无原生支持 / Google: 无原生支持
  /** 是否可拖拽（默认 false） */
  // draggable?: boolean;        // AMap/Google 原生支持，华为需通过自定义逻辑实现

  // ----------- 平台专属扩展属性 -----------
  /** 平台特有配置（使用时需配合对应 SDK） */
  sourceOptions?: any;
}

export interface IUnifiedRectangleOptions {
  // ----------- 所有平台都支持的共性属性 -----------
  /** 地图实例（可选） */
  map?: any;

  /** 坐标范围 */
  bounds: {
    north: any;
    south: any;
    east: any;
    west: any;
  }; // google: paths, huawei: paths, amap: path

  /** 层级高度（默认由地图实现决定） */
  zIndex?: number;
  fillColor?: string; // 填充颜色
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  /** 线条颜色 */
  strokeColor?: string;

  /** 线条宽度（单位像素） */
  strokeWeight?: number;

  // ----------- 跨平台兼容设计属性 -----------
  /** 虚线样式（需要平台转换逻辑） */
  strokeLineDash?: Array<number>; // 华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持

  /** 线条透明度（0-1，默认 1） */
  strokeOpacity?: number; // AMap/Google 原生支持，华为需通过颜色透明度实现

  // ----------- 平台专属扩展属性 -----------
  /** 平台特有配置（使用时需配合对应 SDK） */
  sourceOptions?: any;
}

export interface IUnifiedSearchOptions {
  query?: string; // 搜索关键字 huawei: query / AMap: keywords / Google: textQuery
  location?: { lat: number; lng: number }; // 搜索结果偏向的经纬度 huawei: location / AMap: center / Google: locationBias
  radius?: number; // 搜索半径，单位：米。 huawei: radius / AMap: radius / Google: radius
  poiType?: string; // 指定POI类型 huawei: poiType / AMap: type / Google: includedType
  language?: string; // 搜索结果的语种。如果不指定语种，使用地点的当地语言。 huawei: language / AMap: 不支持 / Google: language
}

export interface IUnifiedSearchResults {
  name: string; // 名称
  formatAddress: string; // 详细 地址
  position: { lat: number; lng: number }; // 经纬度
  sourceResult: any; // 原生返回结果
}