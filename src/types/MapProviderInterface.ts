/**
 * 约定：A 表示 高德地图，G 表示 google 地图，H 表示 华为地图
 */

import {
  IUnifiedMapMarkerOptions,
  IUnifiedMarkerClusterOptions,
  IUnifiedPolylineOptions,
  IUnifiedPolygonOptions,
  IUnifiedCircleOptions,
  IUnifiedRectangleOptions,
  IUnifiedSearchByKeywordOptions,
  IUnifiedSearchNearbyOptions,
  IUnifiedPlaceResults,
  IUnifiedGeocodeOptions,
  IUnifiedReverseGeocodeOptions,
  IUnifiedRouteDriveOptions,
  IUnifiedRouteWalkOptions,
  IUnifiedRouteRideOptions,
  ILnglatToPixelOptions,
  IPixelToLnglatOptions,
  IPathAnimateOptions,
  IInfoWindowOptions,
} from "../mapProvider/serviceParamsType";

export interface IMapProvider {
  /** 地图实例 */
  map: any; 
  /** 初始化地图对象 */
  initMap(options: IInitMapOptions): Promise<void>; 
  /** 设置地图中心点 */
  setCenter(position: { lat: number; lng: number }): void;
  /** 设置地图缩放级别 */
  setZoom(level: number): void;

  /** 添加标记 */
  addMarker(options: IUnifiedMapMarkerOptions): Promise<any>;
  /** 移除标记 */
  removeMarker(marker: any): void;
  /** 添加标记聚类 */
  addMarkerCluster(options: IUnifiedMarkerClusterOptions): Promise<any>;

  /** 添加折线 */
  addPolyline(options: IUnifiedPolylineOptions): Promise<any>;
  /** 移除折线 */
  removePolyline(polyline: any): void;

  /** 添加多边形 */
  addPolygon(options: IUnifiedPolygonOptions): Promise<any>;
  /** 移除多边形 */
  removePolygon(polygon: any): void;
  /** 添加圆形 */
  addCircle(options: IUnifiedCircleOptions): Promise<any>;
  /** 移除圆形 */
  removeCircle(circle: any): void;
  /** 添加矩形 */
  addRectangle(options: IUnifiedRectangleOptions): Promise<any>;
  /** 移除矩形 */
  removeRectangle(rectangle: any): void;

  /** 获取两点之间的距离 */
  getDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number>;
  /** 获取多边形面积 */
  getPolygonArea(path: Array<{ lat: number; lng: number }>): Promise<number>;

  /** 搜索地点 */
  searchPlaceByKeyword(
    options: IUnifiedSearchByKeywordOptions
  ): Promise<Array<IUnifiedPlaceResults>>;
  /** 搜索附近地点 */
  searchPlaceNearby(
    options: IUnifiedSearchNearbyOptions
  ): Promise<Array<IUnifiedPlaceResults>>;

  /** 地址解析 */
  geocode(
    options: IUnifiedGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>>;
  /** 逆地址解析 */
  reverseGeocode(
    options: IUnifiedReverseGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>>;

  /** 驾车路线规划 */
  routeDrive(options: IUnifiedRouteDriveOptions): Promise<any>;
  /** 步行路线规划 */
  routeWalk(options: IUnifiedRouteWalkOptions): Promise<any>;
  /** 骑行路线规划 */
  routeRide(options: IUnifiedRouteRideOptions): Promise<any>;
  /** 路径动画 */
  animatePath(options: IPathAnimateOptions): Promise<{
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
  }>;

  // containerToLnglat(options: any): Promise<any>;
  // lngLatToContainer(options: any): Promise<any>;
  /** 经纬度转像素 */
  lnglatToPixel(options: ILnglatToPixelOptions): {
    x: number;
    y: number;
  };
  /** 像素转经纬度 */
  pixelToLngLat(options: IPixelToLnglatOptions): {
    lat: number;
    lng: number;
  };

  /** WGS84转WebMercator */
  wgs84ToWebMercator(lng: number, lat: number): { x: number; y: number };
  /** WebMercator转WGS84 */
  webMercatorToWgs84(x: number, y: number): { lng: number; lat: number };

  /** 创建信息窗体 */
  createInfoWindow(options: IInfoWindowOptions): Promise<any>;
  /** 打开信息窗体 */
  openInfoWindow(infoWindow: any, marker?: any): void;
  /** 关闭信息窗体 */
  closeInfoWindow(infoWindow: any): void;

}
export interface IInitMapOptions {
  /**
   * map-kit 需要的配置参数
   */
  /** 地图容器 */
  container: HTMLElement; 

  /**
   * 所有地图共有属性
   */
  /** 地图中心点 A: [lng, lat], G: { lat: number; lng: number }, H: { lat: number; lng: number } */
  center?: { lat: number; lng: number }; 
  /** 地图初始化时缩放级别 */
  zoom?: number; 
  /** 华为和谷歌地图 minZoom，maxZoom，高德地图需要转为 zooms: [minZoom, maxZoom] */
  /** 最小缩放级别 地图最小缩放级别。A 取值范围 [2 ~ 26], H 范围：[2, 20], G 范围：[0, google service 获取最大缩放级别]。默认2 */
  minZoom?: number; 
  /** 最大缩放级别 地图最大缩放级别。A 取值范围 [2 ~ 26], H 范围：[2, 20], G 范围：[0, google service 获取最大缩放级别]。默认20 */
  maxZoom?: number; 

  /**
   * AG 地图共有属性
   */
  /** 地图是否可通过鼠标滚轮缩放浏览 默认 true */
  scrollWheel?: boolean; 

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  /** 是否显示地图指北针 默认 false */
  rotateControl?: boolean; 
  /** 是否显示地图比例尺 默认 false */
  scaleControl?: boolean; 
  /** 是否显示地图缩放按钮 默认 true */
  zoomControl?: boolean; 

  /**
   * A 地图特有属性
   */
  // center?: Array<number>; // 中心点 [lng, lat]
  // zoom: number; // 地图初始化时缩放级别
  // zooms?: Array<number>; // 地图显示的缩放级别范围, 默认为 [2, 20] ，取值范围 [2 ~ 26]
  // scrollWheel?: boolean; // 地图是否可通过鼠标滚轮缩放浏览 默认 true
  /** 地图顺时针旋转角度 */
  rotation?: number; 
  /** 地图俯仰角度 默认 0，最大值根据地图当前 zoom 级别不断增大， 2D 地图下无效 。 */
  pitch?: number; 
  /** 地图视图模式 取值范围：'2D'、'3D'，默认为'2D'。 */
  viewMode?: string; 
  /** 初始地图是否展示地形，此属性适用于 3D 地图。默认为值 false 不展示地形 */
  terrain?: boolean; 
  /** 设置地图上显示的元素种类, 支持 'bg' （地图背景）、 'point' （POI点）、 'road' （道路）、 'building' （建筑物），默认为['bg','point','road','building']; */
  features?: Array<string>; 
  /** 地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。当叠加多个图层，如：' https://lbs.amap.com/api/jsapi-v2/documentation#tilelayer ' 时，普通二维地图需通过实例化一个 TileLayer 类实现。如果你希望创建一个默认底图图层，使用 AMap.createDefaultLayer()； */
  layers?: Array<any>; 
  /** 是否支持鼠标拖拽平移 默认 true */
  dragEnable?: boolean; 
  /** 是否支持缩放 默认 true */
  zoomEnable?: boolean; 
  /** 地图是否使用缓动效果，默认值为 true */
  jogEnable?: boolean; 
  /** 是否允许设置俯仰角度, 3D 视图下为 true , 2D 视图下无效。 */
  pitchEnable?: boolean; 
  /** 地图是否可旋转, 图默认为 true 。 */
  rotateEnable?: boolean; 
  /** 是否使用动画效果 默认 true */
  animateEnable?: boolean; 
  /** 是否启用键盘快捷键操作，默认为 true */
  keyboardEnable?: boolean; 
  /** 地图是否可通过双击鼠标放大地图，默认为 true */
  doubleClickZoom?: boolean; 
  /** 地图是否可通过移动端触摸操作缩放浏览 默认 true */
  touchZoom?: boolean; 
  /** 可缺省，当 touchZoomCenter=1 的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心。默认值 1 */
  touchZoomCenter?: boolean; 
  /** 是否显示地图文字和 POI 信息。 默认 true */
  showLabel?: boolean; 
  /** 地图默认鼠标样式。 */
  defaultCursor?: string; 
  /** 是否开启地图热点和标注的 hover 效果。PC端默认是 true , 移动端默认是 false 。 */
  isHotspot?: boolean; 
  /** 设置地图的显示样式 */
  mapStyle?: string; 
  /** 地图 3D 模式下，3D 模型墙颜色 */
  wallColor?: string; 
  /** 地图 3D 模式下，3D 模型屋顶颜色 */
  roofColor?: string; 
  /** 是否显示 3D 楼块，默认 true */
  showBuildingBlock?: boolean; 
  /** 是否显示室内地图，默认 false */
  showIndoorMap?: boolean; 
  /** 是否显示室内地图标注 */
  showIndoorMapLabel?: boolean; 
  /** 天空颜色， 3D 模式下带有俯仰角时会显示 */
  skyColor?: string; 
  /** 文字是否拒绝掩模图层进行掩模 默认 false */
  labelRejectMask?: boolean; 
  /** 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像， 3D 视图下有效。 格式为一个经纬度的一维、二维或三维数组。 */
  mask?: Array<number>; 
  /** 额外配置的 WebGL 参数 eg: preserveDrawingBuffer */
  WebGLParams?: any; 

  /**
   * G 地图特有属性
   */
  // center?: { lat: number; lng: number }; // 地图的中心点坐标，默认为地图默认中心点。
  // maxZoom?: number; // 将会在地图上显示的最大缩放级别。如果省略或设置为 null，则系统会改用当前地图类型的最大缩放级别。有效的缩放值为介于 0 到支持的最大缩放级别之间的数字。
  // minZoom?: number; // 将会在地图上显示的最小缩放级别。如果省略或设置为 null，则系统会改用当前地图类型的最大缩放级别。有效的缩放值为介于 0 到支持的最大缩放级别之间的数字。 (最大级别需要访问 google service 获取)
  // rotateControl?: boolean; // 旋转控件的初始启用/停用状态。
  // scaleControl?: boolean; // 比例尺控件的初始启用/停用状态。
  // scrollwheel?: boolean; // 启用/停用滚动缩放。默认情况下启用滚动缩放。
  // zoom?: number; // 地图的初始缩放级别。有效的缩放值为介于 0 到支持的最大缩放级别之间的数字。缩放级别值越大，分辨率就越高。
  // zoomControl?: boolean; // 启用/停用缩放控件。
  /** 用于地图 div 背景的颜色。当用户平移时，如果图块尚未加载，系统会显示此颜色。仅在启动地图时，才能设置此选项。 */
  backgroundColor?: string; 
  /** 相机控件的启用/停用状态。 */
  cameraControl?: boolean; 
  /** 相机控件的选项。 */
  cameraControlOptions?: any; 
  /** 默认true, 当 false 时，地图图标不可点击。地图图标表示地图注点（也称为地图注点） */
  clickableIcons?: boolean; 
  /** 初始地图配色方案。仅在启动地图时，才能设置此选项。 */
  colorScheme?: string; 
  /** 地图上显示的控件的大小（以像素为单位）。在创建 Map 时必须直接提供此值，如果稍后更新此值，则可能会导致控件进入 undefined 状态。仅适用于 Maps API 本身进行的控制。不会缩放开发者创建的自定义控件。 */
  controlSize?: number; 
  /** 启用/停用所有默认界面按钮。可以单独替换。不会停用键盘控件，键盘控件由 MapOptions.keyboardShortcuts 选项单独控制。不会停用手势控制功能，该功能由 MapOptions.gestureHandling 选项单独控制。 */
  disableDefaultUI?: boolean; 
  /** 启用/停用在双击时缩放并居中。默认处于启用状态。注意：不建议使用此属性。如需停用双击缩放功能，您可以使用 gestureHandling 属性，并将其设置为 "none"。 */
  disableDoubleClickZoom?: boolean; 
  /** 将鼠标悬停在可拖动地图上时显示的光标的名称或网址。此属性使用 CSS cursor 属性更改图标。与 css 属性一样，您必须指定至少一个非网址的回退光标。例如：draggableCursor: 'url(http://www.example.com/icon.png), auto;'。 */
  draggableCursor?: string; 
  /** 拖动地图时显示的光标的名称或网址。此属性使用 CSS cursor 属性更改图标。与 css 属性一样，您必须指定至少一个非网址的回退光标。例如：draggingCursor: 'url(http://www.example.com/icon.png), auto;' */
  draggingCursor?: string; 
  /** 启用/停用全屏控件。 */
  fullscreenControl?: boolean; 
  /** 全屏控件的选项。  具体配置参考google地图官方 api */
  fullscreenControlOptions?: any; 
  /** 此设置用于控制 API 如何处理地图上的手势。允许的值："cooperative"：滚动事件和单指触摸手势会滚动页面，而不会缩放或平移地图。双指触摸手势可平移和缩放地图。按住 Ctrl 键或 ⌘ 键滚动时，地图会缩放。在此模式下，地图与网页协作。"greedy"：所有触摸手势和滚动事件都会平移或缩放地图。"none"：用户无法通过手势平移或缩放地图。"auto"：（默认）手势处理是协作处理还是贪心处理，取决于网页是否可滚动或是否位于 iframe 中。 */
  gestureHandling?: string; 
  /** 航拍图像的方向值按顺时针方向计算（以度为单位），基本方向为北方。方向会与可以查看到图像的距离最近的可用角度相对齐。 */
  heading?: number; 
  /** 地图是否应允许用户控制摄像头朝向（旋转）。只有当地图是矢量地图时，此选项才有效。如果未在代码中设置，则系统将使用地图 ID 的云端配置（如果有）。 */
  headingInteractionEnabled?: boolean; 
  /** 向初始化程序添加了使用归因 ID，这有助于 Google 了解哪些库和示例对开发者有帮助，例如标记聚类库的使用情况。如需选择不发送使用归因 ID，您可以放心地删除此属性或将值替换为空字符串。系统只会发送不重复的值。实例化后对此值所做的更改可能会被忽略。 */
  internalUsageAttributionIds?: Iterable<string>; 
  /** 默认：true（对于矢量地图）和 false（对于光栅地图）。地图是否应允许小数缩放级别。监听 isfractionalzoomenabled_changed，了解何时设置了默认值。 */
  isFractionalZoomEnabled?: boolean; 
  /** 如果为 false，则会阻止地图通过键盘进行控制。默认情况下启用键盘快捷键 */
  keyboardShortcuts?: boolean; 
  /** 相应地图的地图 ID。映射实例化后，此参数便无法设置或更改。Map.DEMO_MAP_ID 可用于试用需要地图 ID 但不需要启用云端的功能。 */
  mapId?: string; 
  /** 地图类型控件的初始启用/停用状态。 */
  mapTypeControl?: boolean; 
  /** 地图类型控件的选项。  具体配置参考google地图官方 api */
  mapTypeControlOptions?: any; 
  /** 初始地图 mapTypeId。默认为 ROADMAP */
  mapTypeId?: string; 
  /** 如果为 true，请勿清除 Map div 的内容。 */
  noClear?: boolean; 
  /** 地图是栅格地图还是矢量地图。映射实例化后，此参数便无法设置或更改。如果未设置，则地图 ID 的云端配置将决定渲染类型（如果有）。请注意，矢量地图可能不适用于所有设备和浏览器，并且地图会根据需要回退为光栅地图。取值：RASTER表示地图是栅格地图。UNINITIALIZED	表示由于地图尚未完成初始化，因此尚不清楚地图是矢量地图还是光栅地图。VECTOR表示地图是矢量地图。 */
  renderingType?: string; 
  /** 定义边界，以限制用户可访问的地图区域。设置后，用户只能在摄像头视图保持在边界限制范围内时平移和缩放。 具体配置参考google地图官方 api */
  restriction?: any; 
  /** 旋转控件的选项。  具体配置参考google地图官方 api */
  rotateControlOptions?: any; 
  /** 比例尺控件的选项。  具体配置参考google地图官方 api */
  scaleControlOptions?: any; 
  /** 当街景小人放置在地图上时显示的 StreetViewPanorama。如果未指定全景图，则在放下地图钉人时，地图的 div 中会显示默认的 StreetViewPanorama。 具体配置参考google地图官方 api */
  streetView?: any; 
  /** 启用/停用街景小人控件。 */
  streetViewControl?: boolean; 
  /** 街景小人控件的选项。  具体配置参考google地图官方 api */
  streetViewControlOptions?: any; 
  /** 要应用于每种默认地图类型的样式。请注意，对于 satellite/hybrid 和 terrain 模式，这些样式仅适用于标签和几何图形。使用地图 ID 或矢量地图时，此功能不可用（请改用云端地图样式设置）。 具体配置参考google地图官方 api */
  styles?: any; 
  /** 对于矢量地图，设置地图的入射角。允许的值受地图缩放级别的限制。 具体配置参考google地图官方 api */
  tilt?: number; 
  /** 地图是否应允许用户控制摄像头倾斜度。只有当地图是矢量地图时，此选项才有效。如果未在代码中设置，则系统将使用地图 ID 的云端配置（如果有）。 */
  tiltInteractionEnabled?: boolean; 
  /** 缩放控件的选项。  具体配置参考google地图官方 api */
  zoomControlOptions?: any; 

  /**
   * H 地图特有属性
   */
  // center?: { lat: number; lng: number }; // 中心点
  // maxZoom?: number; // 最大缩放级别 地图最大缩放级别。取值范围：[2, 20]，默认20。
  // minZoom?: number; // 最小缩放级别 地图最小缩放级别。取值范围：[2, 20]，默认2。
  // rotateControl?: boolean; // 是否显示地图指北针 默认 false
  // scaleControl?: boolean; // 是否显示地图比例尺 默认 false
  // zoom: number; // 地图初始化时缩放级别
  // zoomControl?: boolean; // 是否显示地图缩放按钮 默认 true
  /** accessToken */
  authOptions?: { accessToken: string }; 
  /** 是否显示版权信息 */
  copyrightControl?: boolean; 
  /** 支持文本或HTML的dom元素，dom元素支持<font>标签，<a>标签，<img>标签 */
  copyrightControlOptions?: { value: string }; 
  /** 地图语言 */
  language?: string; 
  /** 是否显示当前位置定位按钮 */
  locationControl?: boolean; 
  /** logo位置 BOTTOM_LEFT(默认)：左下, BOTTOM_RIGHT：右下, TOP_LEFT：左上, TOP_RIGHT：右上 */
  logoPosition?: string; 
  /** 设置地图类型。取值包括：ROADMAP：基础地图, TERRAIN：地形图 */
  mapType?: string; 
  /** 是否显示地图平移按钮 默认 false */
  navigationControl?: boolean; 
  /** 设置预置地图样式。可选值为：standard、night、simple。 */
  presetStyleId?: string; 
  /** 设置地图加载时使用的瓦片类型，支持vector（矢量）或raster（栅格），默认为vector。 */
  sourceType?: string; 
  /** 是否显示地图缩放条 默认 false */
  zoomSlider?: boolean; 
  /** 是否开启栅格瓦片预加载，默认为false。 */
  rasterPreload?: boolean; 
}
