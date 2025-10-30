# map-kit 文档

`map-kit` 是一个前端地图工具库，提供统一的地图服务接口，支持多种地图提供商。

***\*注意：\****

1. 在此文档代码注释中，约定：<font color='red'>A 表示 高德地图，G 表示 google 地图，H 表示 华为地图</font>
2. map-kit 将提供三地图 api 公共参数与两两地图api 公共参数。如存在需使用原地图服务 api 特定参数的情况，也可以传入 option， map-kit 也对其适配（请谨慎使用）
3. 文档中关于高德、google、华为 API 参数整理仅供参考，详细请参考相关官方文档。

npm安装统一地图组件库：`npm install unified-map-kit`

在需要使用的地方引入：`import {createMap, init} from “unified-map-kit”`

---

## 支持的地图提供商

目前支持以下三种地图服务：

+ [高德地图（Amap）](https://lbs.amap.com/api/javascript-api-v2/guide/abc/load)
  - [https://a.amap.com/jsapi/static/doc/20230922/index.html](https://a.amap.com/jsapi/static/doc/20230922/index.html)
+ [谷歌地图（Google）](https://developers.google.com/maps/documentation/javascript/load-maps-js-api?hl=zh-cn)
  - [https://developers.google.com/maps/documentation/javascript/reference?hl=zh-cn](https://developers.google.com/maps/documentation/javascript/reference?hl=zh-cn)
+ [华为地图（Huawei）](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/javascript-api-0000001050162106)
  - [https://developer.huawei.com/consumer/cn/doc/HMSCore-References/js-api-0000001050710114](https://developer.huawei.com/consumer/cn/doc/HMSCore-References/js-api-0000001050710114)

## 注意

1. 在`zvos-map-kit`中，目前只统一了如标记、折线等对象的创建，暂未完全实现对相关返回对象的使用（仅一部分，如实现了标记聚类中点的单击监听），如监听单击双击等事件，如有需要，可以使用原生地图服务商实现，如后续可能有切换地图需求，可联系技术中心技术平台室改造`zvos-map-kit`相关 api 封装
2. 在后续的方法中，某些功能提供了 `xxx`和`xxxSync`两个方法，`xxx`方法返回的是一个`Promise`对象，这是早期版本中为了适配`google`地图中按需加载的逻辑，因此使用时需要注意异步的问题。`xxxSync`方法是一个同步方法，不存在异步的问题，为了避免已接入系统产生兼容性问题，保留了`xxx`方法，因此对于<font color="#ff0000">新接入的系统</font>，<font color="#ff0000">当两者都可使用时，尽量使用</font>`xxxSync`方法

`xxxSync`参考：
> addMarkerSync, addMarkerClusterSync, addPolylineSync, addPolygonSync, addCircleSync, addRectangleSync, getDistanceBetweenSync, getPolygonAreaSync, animateTimeBasedPathSync, createInfoWindowSync

---

## 初始化方法

### 创建地图：createMap

#### createMap 使用说明

**注意：**

1. **高德地图默认会加载 1.3.2 版本，但此文档关于高德地图 API 参考来自于 2.0 版本**
2. **关于三家地图的独有参数，此文档仅供参考，具体请参考官方文档**

##### createMap 方法声明

```typescript
createMap(options: ILoadScriptOptions & IInitMapOptions): Promise<IMapProvider>
```

##### createMap 参数说明

```typescript
type MapProviderEnum = "amap" | "google" | "huawei";
interface ILoadScriptOptions {
  /**
   * map-kit 需要的配置参数
   */
  mapProvider: MapProviderEnum;

  /**
   * 所有地图共有属性
   */
  // 地图API密钥 A:key, G:apiKey, H:apiKey
  apiKey: string; 
  /**
   * AG 地图共有属性
   */
  // 地图版本
  version?: string; 
}
export interface IInitMapOptions {
  /**
   * map-kit 需要的配置参数
   */
  container: HTMLElement; // 地图容器

  /**
   * 所有地图共有属性
   */
  center?: { lat: number; lng: number }; // A: [lng, lat], G: { lat: number; lng: number }, H: { lat: number; lng: number }
  zoom?: number; // 地图初始化时缩放级别
  // 华为和谷歌地图 minZoom，maxZoom，高德地图需要转为 zooms: [minZoom, maxZoom]
  minZoom?: number; // 最小缩放级别 地图最小缩放级别。A 取值范围 [2 ~ 26], H 范围：[2, 20], G 范围：[0, google service 获取最大缩放级别]。默认2
  maxZoom?: number; // 最大缩放级别 地图最大缩放级别。A 取值范围 [2 ~ 26], H 范围：[2, 20], G 范围：[0, google service 获取最大缩放级别]。默认20

  /**
   * AG 地图共有属性
   */
  scrollWheel?: boolean; // 地图是否可通过鼠标滚轮缩放浏览 默认 true

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  rotateControl?: boolean; // 是否显示地图指北针 默认 false
  scaleControl?: boolean; // 是否显示地图比例尺 默认 false
  zoomControl?: boolean; // 是否显示地图缩放按钮 默认 true
}
```

#### 示例代码

```javascript
const YOUR_HUAWEI_MAP_API_KEY = "xxx";
const YOUR_AMAP_API_KEY = "xxx";
const YOUR_GOOGLE_MAP_API_KEY = "xxx";
const initCommonMapOption = {
 center: { lat: 28.190884, lng: 112.81362 },
 zoom: 12,
 mapTypeControl: false,
 streetViewControl: false,
};
const huaweiMap = await createMap({
 container: document.getElementById("huawei-map"),
 mapProvider: "huawei",
 apiKey: YOUR_HUAWEI_MAP_API_KEY,
 ...initCommonMapOption
});
const amapMap = await createMap({
 container: document.getElementById("amap-map"),
 mapProvider: "amap",
 apiKey: YOUR_AMAP_API_KEY,
 ...initCommonMapOption
});
const googleMap = await createMap({
 container: document.getElementById("google-map"),
 mapProvider: "google",
 apiKey: YOUR_GOOGLE_MAP_API_KEY,
 ...initCommonMapOption
});
```

#### 完整参数（包括高德、google、华为地图所有参数） 参考

**包括高德、google、华为三家地图 api 支持的所有参数，<font color="red">特有属性中有一部分注释掉的参数表示这部分参数在统一 api 中已经支持</font>**

```typescript
interface ILoadScriptOptions {
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

export interface IInitMapOptions {
  /**
   * map-kit 需要的配置参数
   */
  container: HTMLElement; // 地图容器

  /**
   * 所有地图共有属性
   */
  center?: { lat: number; lng: number }; // A: [lng, lat], G: { lat: number; lng: number }, H: { lat: number; lng: number }
  zoom?: number; // 地图初始化时缩放级别
  // 华为和谷歌地图 minZoom，maxZoom，高德地图需要转为 zooms: [minZoom, maxZoom]
  minZoom?: number; // 最小缩放级别 地图最小缩放级别。A 取值范围 [2 ~ 26], H 范围：[2, 20], G 范围：[0, google service 获取最大缩放级别]。默认2
  maxZoom?: number; // 最大缩放级别 地图最大缩放级别。A 取值范围 [2 ~ 26], H 范围：[2, 20], G 范围：[0, google service 获取最大缩放级别]。默认20

  /**
   * AG 地图共有属性
   */
  scrollWheel?: boolean; // 地图是否可通过鼠标滚轮缩放浏览 默认 true

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  rotateControl?: boolean; // 是否显示地图指北针 默认 false
  scaleControl?: boolean; // 是否显示地图比例尺 默认 false
  zoomControl?: boolean; // 是否显示地图缩放按钮 默认 true

  /**
   * A 地图特有属性
   */
  // center?: Array<number>; // 中心点 [lng, lat]
  // zoom: number; // 地图初始化时缩放级别
  // zooms?: Array<number>; // 地图显示的缩放级别范围, 默认为 [2, 20] ，取值范围 [2 ~ 26]
  // scrollWheel?: boolean; // 地图是否可通过鼠标滚轮缩放浏览 默认 true
  rotation?: number; // 地图顺时针旋转角度
  pitch?: number; // 地图俯仰角度 默认 0，最大值根据地图当前 zoom 级别不断增大， 2D 地图下无效 。
  viewMode?: string; // 地图视图模式 取值范围：'2D'、'3D'，默认为'2D'。
  terrain?: boolean; // 初始地图是否展示地形，此属性适用于 3D 地图。默认为值 false 不展示地形
  features?: Array<string>; // 设置地图上显示的元素种类, 支持 'bg' （地图背景）、 'point' （POI点）、 'road' （道路）、 'building' （建筑物），默认为['bg','point','road','building'];
  layers?: Array<any>; // 地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。当叠加多个图层，如：' https://lbs.amap.com/api/jsapi-v2/documentation#tilelayer ' 时，普通二维地图需通过实例化一个 TileLayer 类实现。如果你希望创建一个默认底图图层，使用 AMap.createDefaultLayer()；
  dragEnable?: boolean; // 是否支持鼠标拖拽平移 默认 true
  zoomEnable?: boolean; // 是否支持缩放 默认 true
  jogEnable?: boolean; // 地图是否使用缓动效果，默认值为 true
  pitchEnable?: boolean; // 是否允许设置俯仰角度, 3D 视图下为 true , 2D 视图下无效。
  rotateEnable?: boolean; // 地图是否可旋转, 图默认为 true 。
  animateEnable?: boolean; // 是否使用动画效果 默认 true
  keyboardEnable?: boolean; // 是否启用键盘快捷键操作，默认为 true
  doubleClickZoom?: boolean; // 地图是否可通过双击鼠标放大地图，默认为 true
  touchZoom?: boolean; // 地图是否可通过移动端触摸操作缩放浏览 默认 true
  touchZoomCenter?: boolean; // 可缺省，当 touchZoomCenter=1 的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心。默认值 1
  showLabel?: boolean; // 是否显示地图文字和 POI 信息。 默认 true
  defaultCursor?: string; // 地图默认鼠标样式。
  isHotspot?: boolean; // 是否开启地图热点和标注的 hover 效果。PC端默认是 true , 移动端默认是 false 。
  mapStyle?: string; // 设置地图的显示样式
  wallColor?: string; // 地图 3D 模式下，3D 模型墙颜色
  roofColor?: string; // 地图 3D 模式下，3D 模型屋顶颜色
  showBuildingBlock?: boolean; // 是否显示 3D 楼块，默认 true
  showIndoorMap?: boolean; // 是否显示室内地图，默认 false
  showIndoorMapLabel?: boolean; // 是否显示室内地图标注
  skyColor?: string; // 天空颜色， 3D 模式下带有俯仰角时会显示
  labelRejectMask?: boolean; // 文字是否拒绝掩模图层进行掩模 默认 false
  mask?: Array<number>; // 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像， 3D 视图下有效。 格式为一个经纬度的一维、二维或三维数组。
  WebGLParams?: any; // 额外配置的 WebGL 参数 eg: preserveDrawingBuffer

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
  backgroundColor?: string; // 用于地图 div 背景的颜色。当用户平移时，如果图块尚未加载，系统会显示此颜色。仅在启动地图时，才能设置此选项。
  cameraControl?: boolean; // 相机控件的启用/停用状态。
  cameraControlOptions?: any; // 相机控件的选项。
  clickableIcons?: boolean; // 默认true, 当 false 时，地图图标不可点击。地图图标表示地图注点（也称为地图注点）
  colorScheme?: string; // 初始地图配色方案。仅在启动地图时，才能设置此选项。
  controlSize?: number; // 地图上显示的控件的大小（以像素为单位）。在创建 Map 时必须直接提供此值，如果稍后更新此值，则可能会导致控件进入 undefined 状态。仅适用于 Maps API 本身进行的控制。不会缩放开发者创建的自定义控件。
  disableDefaultUI?: boolean; // 启用/停用所有默认界面按钮。可以单独替换。不会停用键盘控件，键盘控件由 MapOptions.keyboardShortcuts 选项单独控制。不会停用手势控制功能，该功能由 MapOptions.gestureHandling 选项单独控制。
  disableDoubleClickZoom?: boolean; // 启用/停用在双击时缩放并居中。默认处于启用状态。注意：不建议使用此属性。如需停用双击缩放功能，您可以使用 gestureHandling 属性，并将其设置为 "none"。
  draggableCursor?: string; // 将鼠标悬停在可拖动地图上时显示的光标的名称或网址。此属性使用 CSS cursor 属性更改图标。与 css 属性一样，您必须指定至少一个非网址的回退光标。例如：draggableCursor: 'url(http://www.example.com/icon.png), auto;'。
  draggingCursor?: string; //拖动地图时显示的光标的名称或网址。此属性使用 CSS cursor 属性更改图标。与 css 属性一样，您必须指定至少一个非网址的回退光标。例如：draggingCursor: 'url(http://www.example.com/icon.png), auto;'
  fullscreenControl?: boolean; // 启用/停用全屏控件。
  fullscreenControlOptions?: any; // 全屏控件的选项。  具体配置参考google地图官方 api
  gestureHandling?: string; // 此设置用于控制 API 如何处理地图上的手势。允许的值："cooperative"：滚动事件和单指触摸手势会滚动页面，而不会缩放或平移地图。双指触摸手势可平移和缩放地图。按住 Ctrl 键或 ⌘ 键滚动时，地图会缩放。在此模式下，地图与网页协作。"greedy"：所有触摸手势和滚动事件都会平移或缩放地图。"none"：用户无法通过手势平移或缩放地图。"auto"：（默认）手势处理是协作处理还是贪心处理，取决于网页是否可滚动或是否位于 iframe 中。
  heading?: number; // 航拍图像的方向值按顺时针方向计算（以度为单位），基本方向为北方。方向会与可以查看到图像的距离最近的可用角度相对齐。
  headingInteractionEnabled?: boolean; // 地图是否应允许用户控制摄像头朝向（旋转）。只有当地图是矢量地图时，此选项才有效。如果未在代码中设置，则系统将使用地图 ID 的云端配置（如果有）。
  internalUsageAttributionIds?: Iterable<string>; //向初始化程序添加了使用归因 ID，这有助于 Google 了解哪些库和示例对开发者有帮助，例如标记聚类库的使用情况。如需选择不发送使用归因 ID，您可以放心地删除此属性或将值替换为空字符串。系统只会发送不重复的值。实例化后对此值所做的更改可能会被忽略。
  isFractionalZoomEnabled?: boolean; //默认：true（对于矢量地图）和 false（对于光栅地图）。地图是否应允许小数缩放级别。监听 isfractionalzoomenabled_changed，了解何时设置了默认值。
  keyboardShortcuts?: boolean; // 如果为 false，则会阻止地图通过键盘进行控制。默认情况下启用键盘快捷键
  mapId?: string; // 相应地图的地图 ID。映射实例化后，此参数便无法设置或更改。Map.DEMO_MAP_ID 可用于试用需要地图 ID 但不需要启用云端的功能。
  mapTypeControl?: boolean; // 地图类型控件的初始启用/停用状态。
  mapTypeControlOptions?: any; // 地图类型控件的选项。  具体配置参考google地图官方 api
  mapTypeId?: string; // 初始地图 mapTypeId。默认为 ROADMAP
  noClear?: boolean; // 如果为 true，请勿清除 Map div 的内容。
  renderingType?: string; // 地图是栅格地图还是矢量地图。映射实例化后，此参数便无法设置或更改。如果未设置，则地图 ID 的云端配置将决定渲染类型（如果有）。请注意，矢量地图可能不适用于所有设备和浏览器，并且地图会根据需要回退为光栅地图。取值：RASTER表示地图是栅格地图。UNINITIALIZED	表示由于地图尚未完成初始化，因此尚不清楚地图是矢量地图还是光栅地图。VECTOR表示地图是矢量地图。
  restriction?: any; // 定义边界，以限制用户可访问的地图区域。设置后，用户只能在摄像头视图保持在边界限制范围内时平移和缩放。 具体配置参考google地图官方 api
  rotateControlOptions?: any; // 旋转控件的选项。  具体配置参考google地图官方 api
  scaleControlOptions?: any; // 比例尺控件的选项。  具体配置参考google地图官方 api
  streetView?: any; // 当街景小人放置在地图上时显示的 StreetViewPanorama。如果未指定全景图，则在放下地图钉人时，地图的 div 中会显示默认的 StreetViewPanorama。 具体配置参考google地图官方 api
  streetViewControl?: boolean; // 启用/停用街景小人控件。
  streetViewControlOptions?: any; // 街景小人控件的选项。  具体配置参考google地图官方 api
  styles?: any; // 要应用于每种默认地图类型的样式。请注意，对于 satellite/hybrid 和 terrain 模式，这些样式仅适用于标签和几何图形。使用地图 ID 或矢量地图时，此功能不可用（请改用云端地图样式设置）。 具体配置参考google地图官方 api
  tilt?: number; // 对于矢量地图，设置地图的入射角。允许的值受地图缩放级别的限制。 具体配置参考google地图官方 api
  tiltInteractionEnabled?: boolean; // 地图是否应允许用户控制摄像头倾斜度。只有当地图是矢量地图时，此选项才有效。如果未在代码中设置，则系统将使用地图 ID 的云端配置（如果有）。
  zoomControlOptions?: any; // 缩放控件的选项。  具体配置参考google地图官方 api

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
  authOptions?: { accessToken: string }; // accessToken
  copyrightControl?: boolean; // 是否显示版权信息
  copyrightControlOptions?: { value: string }; // 支持文本或HTML的dom元素，dom元素支持<font>标签，<a>标签，<img>标签
  language?: string; // 地图语言
  locationControl?: boolean; // 是否显示当前位置定位按钮
  logoPosition?: string; // logo位置 BOTTOM_LEFT(默认)：左下, BOTTOM_RIGHT：右下, TOP_LEFT：左上, TOP_RIGHT：右上
  mapType?: string; // 设置地图类型。取值包括：ROADMAP：基础地图, TERRAIN：地形图
  navigationControl?: boolean; // 是否显示地图平移按钮 默认 false
  presetStyleId?: string; // 设置预置地图样式。可选值为：standard、night、simple。
  sourceType?: string; // 设置地图加载时使用的瓦片类型，支持vector（矢量）或raster（栅格），默认为vector。
  zoomSlider?: boolean; // 是否显示地图缩放条 默认 false
  rasterPreload?: boolean; // 是否开启栅格瓦片预加载，默认为false。
}
```

---

## 通用功能

### 设置中心点：setCenter

#### setCenter使用说明

##### setCenter 方法声明及参数

```javascript
setCenter(position: { lat: number; lng: number }): void;
```

#### 示例代码

```javascript
const initCommonMapOption = {
    center: { lat: 28.190884, lng: 112.81362 },
    zoom: 2,
};
const amapMap = await init({
	container: document.getElementById("amap-map"),
	mapProvider: "amap",
	apiKey: YOUR_AMAP_API_KEY,
	...initCommonMapOption,
  });

const position = { lat: 39.909, lng: 116.397 };
console.log("设置中心点");
amapMap.setCenter(position);
```

### 设置缩放等级：setZoom

#### setZoom使用说明

##### setZoom 方法声明及参数

```javascript
setZoom(level: number): void;
```

#### 示例代码

```javascript
const initCommonMapOption = {
    center: { lat: 28.190884, lng: 112.81362 },
    zoom: 2,
};
const amapMap = await init({
	container: document.getElementById("amap-map"),
	mapProvider: "amap",
	apiKey: YOUR_AMAP_API_KEY,
	...initCommonMapOption,
  });

console.log("设置缩放等级");
amapMap.setZoom(2);
```

### 设置地图显示区域：fitBounds

#### fitBounds使用说明

##### fitBounds 方法声明及参数
```javascript
fitBounds(bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }): void;
```

#### 示例代码

```javascript
const initCommonMapOption = {
    center: { lat: 28.190884, lng: 112.81362 },
    zoom: 2,
};

const amapMap = await init({
    container: document.getElementById("amap-map"),
    mapProvider: "amap",
    apiKey: YOUR_AMAP_API_KEY,
    ...initCommonMapOption,
});
// 西南 116.274645,39.867461
// 东北 116.460773,39.969328
const bounds = {
    north: 39.969328,
    south: 39.867461,
    east: 116.460773,
    west: 116.274645,
};
console.log("设置地图范围");
amapMap.fitBounds(bounds);
```

### 缩放等级监听：onZoomChange

#### onZoomChange使用说明

##### onZoomChange 方法声明及参数

```javascript
onZoomChange(
    map: any,
    callback: (originMapZoomChangeParams: any) => void
): void;
```

#### 示例代码

```javascript
const initCommonMapOption = {
    center: { lat: 28.190884, lng: 112.81362 },
    zoom: 2,
};

const amapMap = await init({
    container: document.getElementById("amap-map"),
    mapProvider: "amap",
    apiKey: YOUR_AMAP_API_KEY,
    ...initCommonMapOption,
});

const zoomChangeCallback = (params) => {
    console.log("zoom change:", params);
}
console.log("监听地图 zoom 变化");
amapMap.onZoomChange(zoomChangeCallback);
```

---

## 标记

### 添加标记: addMarker、addMarkerSync

#### addMarker、addMarkerSync 使用说明

**<font style="color:#DF2A3F;">注意：</font>**

1. **<font style="color:#DF2A3F;">使用 高德 和 谷歌 两种地图的时候，“icon 和 label 属性同时设置”且“label.content 中传入 HTMLElement”的时候会优先生效 icon</font>**
2. 提供对点的 `click` 事件监听方法，需要通过 `pointClickFunc`参数传入，其中`pointClickFunc(obj, e)`函数的入参分别为 ①`obj`：点击的点对象；②`e`:原地图事件对象。<font color="red">`pointClickFunc`可能中会使用`this`，使用时注意使用`bind`对`this`进行提前指定，可以参考一下的示例代码</font>
3. 高德地图在使用 2.0 版本的时候，请添加参数 `offset:{-width / 2, -height}`，其中 `width``height`的值分别为图片宽度和高度，如果图片设置了 `size`参数，则对应 `size`参数设置的宽高。 否则会出现“缩放或放大地图的时候，标记点不在指定经纬度上，对于需要高精确标记的需求场景有影响”。 此问题预计会在后续版本中修复【2025 年 10 月 30 日 18:38:36】

##### addMarker、addMarkerSync 方法声明

```typescript
addMarker(options: IUnifiedMapMarkerOptions): Promise<any>;
addMarkerSync(options: IUnifiedMapMarkerOptions): any;
```

##### addMarker、addMarkerSync参数

```typescript
interface IUnifiedMapMarkerOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例
  position: { lat: number; lng: number }; // 坐标位置，google:position, huawei:position, amap:[position.lng, position.lat]
  zIndex?: number; // 层级高度（默认由地图实现决定）
  draggable?: boolean; // 是否可拖拽（默认 false），google:gmpDraggable, huawei:draggable, amap:draggable
  /** 单个点点击方法 
   * obj: 单个点对象
   * e: 原地图事件对象
  */
  pointClickFunc?: (obj: any, e?: any) => any;

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
    offsetX?: number; // 单位 px, x轴偏移，相对 position 进行偏移
    offsetY?: number; // 单位 px, y轴偏移，相对 position 进行偏移
  };
  /**
   * AG 地图共有属性
   */
  title?: string; // 鼠标悬停标题（google:title, huawei 不支持, amap:title）

  /**
   * AH 地图共有属性
   */
  customData?: any; // 自定义数据 google 不支持, huawei:properties, amap:extData

  /**
   * GH 地图共有属性
   */
}
```

##### addMarker、addMarkerSync返回说明

对于参数`customData`：google原返回对象不支持自定义数据的获取，且华为地图返回对象`marker`需要调用`getProperties()`获取，高德地图返回对象`marker`需要调用`getExtData()`获取。

在返回各地图`marker`对象中，获取自定义属性的方法不一致，因此，我们为其添加了`getCustomDataUinified`函数，如`marker.getCustomDataUinified = () => { }`，用户可以通过 `marker.getCustomDataUinified()`获取自定义属性，可参照示例代码

#### 示例代码

```javascript
const initCommonMapOption = {
  center: { lat: 28.190884, lng: 112.81362 },
  zoom: 12,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  ...initCommonMapOption,
});

const commonOptions = {
  position: { lat: 28.190884, lng: 112.81362 },
  zIndex: 10,
  draggable: false,
  title: "demo",
  label: {
    color: "red",
    content: "cs",
    fontSize: "20px",
    offsetX: 10,
    offsetY: 10,
  },
  // icon: "../src/assets/images/location-icon.png"
  icon: {
    size: [20, 20],
    url: "../src/assets/images/location-icon.png",
  },
  customData: {
    test: 'test'
  }
};

setTimeout(async () => {
  console.log("添加 marker");
  const amapMarker = await amapMap.addMarker({
    ...commonOptions,
  });
  console.log(amapMarker.getCustomDataUinified(), "----->>>>> amap properties")
  setTimeout(() => {
    console.log("删除 marker");
    amapMap.removeMarker(amapMarker);
  }, 2000);
}, 2000);
```

#### 完整参数

```typescript
interface IUnifiedMapMarkerOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例
  position: { lat: number; lng: number }; // 坐标位置，google:position, huawei:position, amap:[position.lng, position.lat]
  zIndex?: number; // 层级高度（默认由地图实现决定）
  draggable?: boolean; // 是否可拖拽（默认 false），google:gmpDraggable, huawei:draggable, amap:draggable
  /** 单个点点击方法 
   * obj: 单个点对象
   * e: 原地图事件对象
  */
  pointClickFunc?: (obj: any, e?: any) => any;

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
    offsetX?: number; // 单位 px, x轴偏移，相对 position 进行偏移
    offsetY?: number; // 单位 px, y轴偏移，相对 position 进行偏移
  };
  /**
   * AG 地图共有属性
   */
  title?: string; // 鼠标悬停标题（google:title, huawei 不支持, amap:title）

  /**
   * AH 地图共有属性
   */
  customData?: any; // 自定义数据 google 不支持, huawei:properties, amap:extData

  /**
   * GH 地图共有属性
   */

  /**
   * A 地图特有属性
   */
  //   map: any; // 地图实例
  //   position: Array<number>; // [经度, 纬度]
  //   icon?:
  //     | string
  //     | {
  //         size: Array<number>; // [宽, 高]
  //         imageOffset: Array<number>; // 像素点位置[x, y]
  //         image: string; // 图片地址
  //         imageSize: Array<number>; // 图标所用背景大小
  //       };
  //   content?: string | HTMLElement; // 与 icon 二选一
  //   title?: string; // 鼠标滑过时显示的文字
  //   draggable?: boolean; // 是否可拖拽
  //   zIndex?: number; // 叠加顺序
  //   label?: {
  //     content: string; // 文本标注的内容
  //     offset?: Array<number>; // [x, y] 偏移量。如设置了 direction，以 direction 方位为基准点进行偏移。
  //     direction?: "top" | "right" | "bottom" | "left" | "center"; // 文本标注的方位
  //   }; // 文本标注
  visible?: boolean; // 标记是否显示
  offset?: Array<number>; // 锚点偏移量
  anchor?: string | Array<number>; // 锚点位置
  angle?: number; // 旋转角度
  clickable?: boolean; // 是否可点击
  bubble?: boolean; // 事件是否冒泡
  zooms?: Array<number>; // 点标记层级范围
  cursor?: string; // 鼠标样式
  topWhenClick?: boolean; // 点击时是否置顶
  height?: number; // 设置Marker点是否离地绘制，默认值为0，等于0时贴地绘制。大于0时离地绘制，此时Marker点高度等于height值加Marker点高程值（JSAPI v2.1新增属性目前只适用于v2.1版本）。
  extData?: any; // 用户自定义属性

  /**
   * G 地图特有属性
   */
  //   map: any; // 地图实例
  //   position: { lat: number; lng: number }; // 标记的位置。
  //   title: string; // 鼠标悬停时显示的标题
  //   zIndex?: number; // z轴方向的叠加关系
  //   content?: {
  //     background: string; // 背景颜色
  //     borderColor: string; // 边框颜色
  //     element: HTMLElement; // 只读属性
  //     glyph: string | HTMLElement | URL; // 在固定的标签页中显示的 DOM 元素
  //     glyphColor: string; // 标记颜色
  //     scale: number; // 缩放比例
  //   };
  //   gmpDraggable?: boolean; // 是否允许拖拽
  collisionBehavior?:
    | "OPTIONAL_AND_HIDES_LOWER_PRIORITY"
    | "REQUIRED"
    | "REQUIRED_AND_HIDES_OPTIONAL"; // 碰撞处理方式

  /**
   * H 地图特有属性
   */
  //   draggable?: boolean; // 是否允许拖拽
  //   icon?:
  //     | string
  //     | {
  //         anchor: Array<Number>; // 图片锚点，有效值为两个元素的数组[x, y]，默认为[0.5, 1]，表示锚点在图片的下边中心。
  //         anchorUnit?: "FRACTION" | "PIXEL"; // 锚点值的单位
  //         opacity?: number; // 不透明度，取值范围：[0, 1]。0：完全透明。1：完全不透明。默认值为1
  //         quantityUrls?: string[]; // 根据标记聚合数量定制图标数组。
  //         rotation?: number; // 旋转角度，单位：弧度。正数：顺时针旋转。如Math.PI/2，顺时针旋转90度。负数：逆时针旋转。如-Math.PI/2，逆时针旋转90度。以正北为0度，默认0，不旋转。
  //         scale?: number; // 图片缩放，用来控制图片缩放。取值范围：大于0，默认1
  //         url: string;
  //       }; // 标记的图标，可以是图片的url路径或文件路径。
  //   label?:
  //     | string
  //     | {
  //         color?: string; // 颜色
  //         fontSize?: string; // 文字大小
  //         fontFamily?: string; // 字体
  //         offsetX: number; // 横轴方向偏移值
  //         offsetY: number; // 纵轴方向偏移值
  //         strokeColor: string; // 描边颜色
  //         strokeWeight: number; // 描边大小 [0, 10] 默认0
  //         text?: string; // 文字内容
  //       }; // 标记的标签，文字或者详细信息
  //   map: any; // 地图实例
  //   position: { lat: number; lng: number }; // 标记的位置
  //   properties?: Object; // 自定义属性
  //   zIndex?: number; // z轴方向的叠加关系
  animation?: "DROP" | "BOUNCE" | null; // 标记点进入动画
}
```

###  删除标记：removeMarker

#### removeMarker 使用说明

##### removeMarker方法声明

```typescript
removeMarker(marker: any): void;
```

#### 示例代码

```javascript
amapMap.removeMarker(ampMarker) // 详细可参考 addMarker 中示例代码
```

### 添加标记聚类：addMarkerCluster、addMarkerClusterSync
#### addMarkerCluster、addMarkerClusterSync使用说明

1. <font color="red">在构造 MarkerCluster 的时候，各地图服务商构造方法的使用是不一致的，如华为和 google 使用 `xxx(markers, **args)`，需要传入构造好的`marker`对象；而高德使用`xxx([{position: [lng1, lat1]}, ...])`，只能传入具体的点的位置信息，甚至无法传入‘额外的对象信息’`customData`。对于以上差异，我们参考高德地图的使用方式，因为采用 google 或 华为地图的方式，暂时无法做到统一 api。</font>
2. addMarkerCluster、addMarkerClusterSync 中 `points` 参数为必传参数，类型为：`Array<IUnifiedMapMarkerOptions>`
3. 针对单点样式的设置，我们也可以在 `singlePointIcon` 和 `singlePointLabel`属性中设置整个 `points`中单点的样式，同时需要注意：“singlePointIcon 和 singlePointLabel 属性同时设置”且“singlePointLabel.content 中传入 HTMLElement”的时候会优先生效 icon
4. 针对聚类点样式的设置，可以通过 `clusterPointIcon` 和 `clusterPointLabel` 来设置，同样需要注意：“clusterPointIcon 和 clusterPointLabel 属性同时设置”且“clusterPointLabel.content 中传入 HTMLElement”的时候会优先生效 icon
5. 当需要根据聚类点里点的数量来自定义设置不同的聚类点样式时，可以通过 `clusterPointIntervalList` 数组参数来设置，此参数使用需要注意以下几点
	1. 数组中的元素需要按照 `maxNumber` 属性从小到大按照升序排列
	2. maxNumber 用于划分区间，区间为“左开右闭”。如：`[{maxNumber: 2， clusterPointIcon： icon1}, {maxNumber: 4, clusterPointIcon: icon2}, {maxNumber: 8, clusterPointIcon: icon3}]`表示`（0,2]`数量的点设置`icon1`，`(2,4]`数量的点设置 `icon2`，以此类推。当点数量 > 8 时，默认取`clusterPointIntervalList`中最后一个元素设置的样式，此示例中会设置为`icon3`
	3. “clusterPointIcon 和 clusterPointLabel 属性同时设置”且“clusterPointLabel.content 中传入 HTMLElement”的时候会优先生效 icon
6. 为了满足各地图的一些自定义的功能，提供`amapClusterRendererFunc`， `googleClusterRendererFunc`，`huaweiClusterRendererFunc`三个参数，支持用户传入对应地图的自定义聚类样式方法，可以参考以下示例代码以及官方文档 [高德地图自定义聚类样式参考](https://lbs.amap.com/api/javascript-api-v2/guide/amap-massmarker/marker-cluster#s3)，[google 地图自定义聚类样式参考](https://googlemaps.github.io/js-markerclusterer/classes/DefaultRenderer.html)，[huawei 地图自定义样式参考](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/javascript-api-marker-clustering-0000001064784288#section11832838155511)
7. 默认提供对 `points`中点的 `click` 事件监听方法，需要通过 `singlePointClickFunc`参数传入，其中`singlePointClickFunc(obj, e)`函数的入参分别为 ①`obj`：点击的点对象；②`e`:原地图事件对象。<font color="red">`singlePointClickFunc`可能中会使用`this`，使用时注意使用`bind`对`this`进行提前指定，可以参考一下的示例代码</font>

##### addMarkerCluster、addMarkerClusterSync 方法声明
```typescript
addMarkerCluster(options: IUnifiedMarkerClusterOptions): Promise<any>;
addMarkerClusterSync(options: IUnifiedMarkerClusterOptions): any;
```
##### addMarkerCluster、 addMarkerClusterSync参数
```typescript
interface IUnifiedMarkerClusterOptions {
  /** 点，weight属性只适用于高德地图, */
  points: Array<IUnifiedMapMarkerOptions>;

  /** 自定义聚合点和非聚合点的样式 */
  /** 非聚合点图标配置 */
  singlePointIcon?: // 直接使用图片 URL
  | string
    | {
        /** google:创建HTMLElement 传给content.glyph, huawei:icon.url, amap:icon.image */
        url: string;
        /** 宽高，google:创建HTMLElement 传给content.glyph, huawei:icon.scale(要将传入的参数转换成 0-1 的 scale), amap:icon.size */
        size?: [number, number];
      };
  /** 非聚合点文本配置 */
  singlePointLabel?: {
    /** google:content.glyph<string, HTMLElement>, huawei:label.text<string>, amap:content<string, HTMLElement> */
    content: string | HTMLElement;
    /** 设置字体大小 */
    fontSize?: string;
    /** 字体颜色 */
    color?: string;
  };
  /** 聚合点图标配置 */
  clusterPointIcon?:
    | string
    | {
        url: string;
        size?: [number, number];
      };
  /** 聚合点文本配置 */
  clusterPointLabel?: {
    content: string | HTMLElement;
    fontSize?: string;
    color?: string;
  };
  /** 聚合点分层样式, 必须按升序排列 clusterPointIntervalList[0] */
  clusterPointIntervalList?: Array<{
    /** 此分段最大支持的点数量，包含 maxNumber 数，区间为左开右闭 */
    maxNumber: number;
    /** 聚合点图标配置 */
    clusterPointIcon?:
      | string
      | {
          url: string;
          size?: [number, number];
        };
    /** 聚合点文本配置 */
    clusterPointLabel?: {
      content: string | HTMLElement;
      fontSize?: string;
      color?: string;
    };
  }>;
  /** 单个点点击方法 
   * obj: 单个点对象
   * e: 原地图事件对象
  */
  singlePointClickFunc?: (obj: any, e?: any) => any;
  
  /**
   * A
   */
  /** 自定义聚合点样式渲染函数 */
  amapClusterRendererFunc?: (obj: any) => any;
  /**
   * G
   */
  /** 自定义聚合点样式渲染函数 */
  googleClusterRendererFunc?: (obj: any) => any;
  /**
   * H
   */
  /** 自定义聚合点样式渲染函数 */
  huaweiClusterRendererFunc?: (obj: any) => any;
}
```

#### 示例代码
```javascript
const initCommonMapOption = {
  center: { lat: 39.904989, lng: 116.405285 },
  zoom: 8,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_JSSECRET_KEY,
  securityJsCode: "YOUR_SeJsCode",
  version: "2.0",
  ...initCommonMapOption,
  zoom: 8,
});


const div = document.createElement("div");
div.style.backgroundColor = "#95b223";
const size = 32;
div.style.width = div.style.height = size + "px";
div.style.borderRadius = size / 2 + "px";
div.style.lineHeight = size + "px";
div.style.color = "#ffffff";
div.style.fontSize = "14px";
div.style.textAlign = "center";

const div2 = document.createElement("div");
div2.style.backgroundColor = "green";
div2.style.width = div2.style.height = size + "px";
div2.style.borderRadius = size / 2 + "px";
div2.style.lineHeight = size + "px";
div2.style.color = "#ffffff";
div2.style.fontSize = "14px";
div2.style.textAlign = "center";

const div3 = document.createElement("div");
div3.style.backgroundColor = "blue";
div3.style.width = div3.style.height = size + "px";
div3.style.borderRadius = size / 2 + "px";
div3.style.lineHeight = size + "px";
div3.style.color = "#ffffff";
div3.style.fontSize = "14px";
div3.style.textAlign = "center";
const addMarkerClusterOptions = {
  points: [
    {
      position: {
        lng: 116.506647,
        lat: 39.795337,
      },
      // icon:
      //   "//a.amap.com/jsapi_demos/static/images/red.png",
      label: {
        content: "bj",
        fontSize: "16px",
        color: "#ffc6cc",
      },
    },
    { position: { lng: 116.843352, lat: 40.377362 }, customData: { a: 1 } },
    { position: { lng: 116.637122, lat: 40.324272 }, customData: { a: 2 } },
    { position: { lng: 116.105381, lat: 39.937183 }, customData: { a: 3 } },
    { position: { lng: 116.653525, lat: 40.128936 }, customData: { a: 4 } },
    { position: { lng: 116.486409, lat: 39.921489 }, customData: { a: 5 } },
    { position: { lng: 116.658603, lat: 39.902486 }, customData: { a: 6 } },
    { position: { lng: 116.338033, lat: 39.728908 }, customData: { a: 7 } },
    { position: { lng: 116.235906, lat: 40.218085 }, customData: { a: 8 } },
    { position: { lng: 116.366794, lat: 39.915309 }, customData: { a: 9 } },
    { position: { lng: 116.418757, lat: 39.917544 }, customData: { a: 10 } },
    { position: { lng: 116.139157, lat: 39.735535 }, customData: { a: 11 } },
    { position: { lng: 116.195445, lat: 39.914601 }, customData: { a: 12 } },
    { position: { lng: 116.310316, lat: 39.956074 }, customData: { a: 13 } },
    {
      position: { lng: 116.286968, lat: 39.863642 },
      customData: { a: 1 },
    },
  ],
  clusterPointIcon: "//a.amap.com/jsapi_demos/static/images/blue.png",
  clusterPointLabel: { content: div, color: "#fff" },
  clusterPointIntervalList: [
    {
      maxNumber: 2,
      clusterPointIcon:
        "//a.amap.com/jsapi_demos/static/images/blue.png",
      clusterPointLabel: { content: div },
    },
    {
      maxNumber: 4,
      // clusterPointLabel: { content: div2 },
      clusterPointIcon: {
        url: "//a.amap.com/jsapi_demos/static/images/green.png",
        size: [32, 32],
      },
    },
    {
      maxNumber: 6,
      // clusterPointLabel: { content: div3 },
      clusterPointIcon: {
        url: "//a.amap.com/jsapi_demos/static/images/red.png",
        size: [32, 32],
      },
    },
  ],
  singlePointClickFunc: function (context) {
    console.log(this, '>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<', context)
    console.log(context.getCustomDataUinified())
  }.bind({ "a": "2" }),
  amapClusterRendererFunc: function (context) {
    // 创建自定义的聚类点容器
    const clusterDiv = document.createElement("div");
    clusterDiv.style.cssText = `
                background-color: #4285f4;
                border: 2px solid #fff;
                border-radius: 50%;
                color: white;
                font-weight: bold;
                text-align: center;
                line-height: 40px;
                width: 40px;
                height: 40px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
              `;
    // 根据聚类点数量设置不同的样式
    const count = context.count;
    if (count <= 2) {
      clusterDiv.style.backgroundColor = "#4CAF50"; // 绿色
      clusterDiv.style.fontSize = "12px";
    } else if (count <= 4) {
      clusterDiv.style.backgroundColor = "#FF9800"; // 橙色
      clusterDiv.style.fontSize = "14px";
    } else if (count <= 8) {
      clusterDiv.style.backgroundColor = "#F44336"; // 红色
      clusterDiv.style.fontSize = "16px";
    } else {
      clusterDiv.style.backgroundColor = "#9C27B0"; // 紫色
      clusterDiv.style.fontSize = "18px";
      clusterDiv.style.width = "50px";
      clusterDiv.style.height = "50px";
      clusterDiv.style.lineHeight = "50px";
    }
    // 设置数量文本
    clusterDiv.innerHTML = count.toString();
    // content 也可以是 HTMLElement
    context.marker.setContent(clusterDiv);
  },
  googleClusterRendererFunc: function render(context) {
    // 创建自定义的聚类点容器
    const clusterDiv = document.createElement("div");
    clusterDiv.style.cssText = `
      background-color: #4285f4;
      border: 2px solid #fff;
      border-radius: 50%;
      color: white;
      font-weight: bold;
      text-align: center;
      line-height: 40px;
      width: 40px;
      height: 40px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    // 根据聚类点数量设置不同的样式
    const count = context.count;
    if (count <= 2) {
      clusterDiv.style.backgroundColor = "#4CAF50"; // 绿色
      clusterDiv.style.fontSize = "12px";
    } else if (count <= 4) {
      clusterDiv.style.backgroundColor = "#FF9800"; // 橙色
      clusterDiv.style.fontSize = "14px";
    } else if (count <= 8) {
      clusterDiv.style.backgroundColor = "#F44336"; // 红色
      clusterDiv.style.fontSize = "16px";
    } else {
      clusterDiv.style.backgroundColor = "#9C27B0"; // 紫色
      clusterDiv.style.fontSize = "18px";
      clusterDiv.style.width = "50px";
      clusterDiv.style.height = "50px";
      clusterDiv.style.lineHeight = "50px";
    }
    // 设置数量文本
    clusterDiv.innerHTML = count.toString();
    // 创建 Marker 对象
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: context.position, // 使用 obj.position
      content: clusterDiv,
    });
    return marker;
  },
  huaweiClusterRendererFunc: function renderClusterMarker(markers) {
    let count = markers.length;
    let icon = {
      url: "",
      anchor: [0.5, 0.5],
      anchorUnit: "fraction",
    };
    let label = {
      text: "",
      color: "#000",
      strokeColor: "white",
      strokeWeight: 2,
    };
    label.text = count.toString();
    if (count <= 4) {
      icon.url = "//a.amap.com/jsapi_demos/static/images/red.png";
    } else if (count < 10 && count > 4) {
      icon.url = "//a.amap.com/jsapi_demos/static/images/green.png";
    } else {
      icon.url = "//a.amap.com/jsapi_demos/static/images/blue.png";
    }
    return {
      label,
      icon,
    };
  },
};
const amapMarkerCluster = await amapMap.addMarkerCluster(addMarkerClusterOptions);
console.log(amapMarkerCluster, "---> amap");
```


## 线

### 添加折线：addPolyline、addPolylineSync

#### addPolyline、addPolylineSync使用说明

**<font style="color:#DF2A3F;">注意： strokeOpacity用于设置线条透明度 // AMap/Google 原生支持，华为需通过颜色透明度实现</font>**

##### addPolyline、addPolylineSync方法声明

```typescript
addPolyline(options: IUnifiedPolylineOptions): Promise<any>;
addPolylineSync(options: IUnifiedPolylineOptions): any;
```

##### addPolyline、addPolylineSync方法参数

```typescript
interface IUnifiedPolylineOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例（可选）
  path: Array<{ lat: number; lng: number }>; // 路径坐标集合。google: path, huawei: path, amap: path<Array<Array<number>>>
  zIndex?: number; // 层级高度（默认由地图实现决定）
  strokeColor?: string; // 线条颜色
  strokeWeight?: number; // 线条宽度（单位像素）
  strokeLineDash?: Array<number>; // 虚线样式（需要平台转换逻辑）。华为: strokeLineDash / AMap: strokeDasharray / Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素

  /**
   * AG 地图共有属性
   */
  strokeOpacity?: number; // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  draggable?: boolean; // 是否可拖动 默认 false
  geodesic?: boolean; // 折线是否是大地曲线，默认为false

  /**
   * AH 地图共有属性
   */
  showDirection?: boolean; // 是否显示方向箭头（默认 false）、华为: showDir / AMap: showDir / Google 无原生支持

  /**
   * GH 地图共有属性
   */
  visible?: boolean; // 折线是否可见
}
```

#### 示例代码

```javascript
const initCommonMapOption = {
  center: { lat: 0, lng: -180 },
  zoom: 12,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  ...initCommonMapOption,
});

const commonOptions = {
  path: [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ],
  strokeColor: "#00FF00",
  strokeWeight: 2,
  strokeLineDash: [10, 20],
  strokeOpacity: 0.5,
  showDirection: true,
};

setTimeout(async () => {
  console.log("添加 line");
  const amap = await amapMap.addPolyline({
    ...commonOptions,
  });

  setTimeout(() => {
    console.log("删除 line");
    amapMap.removePolyline(amap);
  }, 2000);
}, 2000);
```

#### 完整参数

```typescript
interface IUnifiedPolylineOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例（可选）
  path: Array<{ lat: number; lng: number }>; // 路径坐标集合。google: path, huawei: path, amap: path<Array<Array<number>>>
  zIndex?: number; // 层级高度（默认由地图实现决定）
  strokeColor?: string; // 线条颜色
  strokeWeight?: number; // 线条宽度（单位像素）
  strokeLineDash?: Array<number>; // 虚线样式（需要平台转换逻辑）。华为: strokeLineDash / AMap: strokeDasharray / Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素

  /**
   * AG 地图共有属性
   */
  strokeOpacity?: number; // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  draggable?: boolean; // 是否可拖动 默认 false
  geodesic?: boolean; // 折线是否是大地曲线，默认为false

  /**
   * AH 地图共有属性
   */
  showDirection?: boolean; // 是否显示方向箭头（默认 false）、华为: showDir / AMap: showDir / Google 无原生支持

  /**
   * GH 地图共有属性
   */
  visible?: boolean; // 折线是否可见

  /**
   * A 地图特有属性
   */
  //   path: Array<Array<number>> | Array<Array<Array<number>>>; // 经度 lng，纬度lat
  //   zIndex?: number; // 层级
  //   strokeColor?: string; // 线颜色
  //   strokeOpacity?: number; // 线透明度 0-1 1表示不透明
  //   strokeWeight?: number; // 线宽 px
  //   showDir?: boolean; // 是否显示方向
  //   draggable?: boolean; // 是否可拖动 默认 false
  //   geodesic?: boolean; // 折线是否是大地曲线，默认为false
  bubble?: boolean; // 是否将覆盖物的鼠标或 touch 事件冒泡至地图
  cursor?: string; // 鼠标悬停时的鼠标样式
  isOutline?: boolean; // 是否显示描边
  borderWeight?: number; // 描边宽度 px 默认 1
  outlineColor?: string; // 描边颜色
  height?: number; // 离地绘制的高度
  extData?: any; // 自定义属性
  strokeStyle?: string; // 线样式 solid | dashed
  strokeDasharray?: Array<number>; // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效。虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
  lineJoin?: string; // 折线拐点的绘制样式，可以是： round | bevel | miter,  圆角｜斜角｜尖角（默认）
  lineCap?: string; // 折线两端线帽的绘制样式，可以是： butt | round | square,   无头(默认)｜圆头｜方头

  /**
   * G 地图特有属性
   */
  //   map?: any; // 需要显示的地图实例
  //   path: Array<{ lat: number; lng: number }>; // 折线点集合
  //   strokeColor?: string; // 折线颜色
  //   strokeOpacity?: number; // 折线透明度
  //   strokeWeight?: number; // 折线宽度 px
  //   visible?: boolean; // 折线是否可见
  //   zIndex?: number; // 折线层级
  //   draggable?: boolean; // 折线是否可拖拽
  //   geodesic?: boolean; // 折线是否是大地曲线，默认为false
  clickable?: boolean; // 折线是否可点击
  editable?: boolean; // 是否可通过控制点编辑折线
  icons?: Array<any>; //  沿多段线渲染的图标

  /**
   * H 地图特有属性
   */
  //   map?: any;
  //   path: Array<{ lat: number; lng: number }>; // 纬度、经度
  //   strokeColor?: string; // 颜色
  //   strokeLineDash?: Array<number>; // 虚线类型，参数是一组描述交替绘制线段和间距长度的数字。如果数组元素的数量是奇数， 数组的元素会被复制并重复。 [5, 10, 15] 会变成 [5, 10, 15, 5, 10, 15]
  //   strokeWeight?: number; // 线宽  px
  //   visible?: boolean;
  //   zIndex?: number; // 层级
  //   showDir?: boolean; // 是否显示方向箭头
}
```

###  删除线：removePolyline

#### removePolyline 使用说明

##### removePolyline方法声明

```typescript
removePolyline(polyline: any): void;
```

#### 示例代码

```javascript
amapMap.removePolyline(ampPolyline) // 详细可参考 addPolyline 中示例代码
```

###  线的显隐：setPolylineVisible

#### setPolylineVisible 使用说明

##### setPolylineVisible方法声明

```typescript
setPolylineVisible(polyline: any, visible: boolean): void;
```

#### 示例代码

```javascript
amapMap.setPolylineVisible(ampPolyline, false) // 隐藏线
```

### 轨迹回放：animateTimeBasedPath、animateTimeBasedPathSync

#### 使用说明

##### animateTimeBasedPath、animateTimeBasedPathSync方法声明

```typescript
/** 基于时间的路径动画 */
animateTimeBasedPath(options: ITimeBasedPathAnimateOptions): Promise<ITimeBasedPathAnimationController>;
animateTimeBasedPathSync(options: ITimeBasedPathAnimateOptions): ITimeBasedPathAnimationController;
```

##### 方法参数

```typescript
/**
 * 基于时间的路径动画选项接口
 * 用于实现更高级的路径动画功能，包括倍速播放、时间点跳转等
 */
interface ITimeBasedPathAnimateOptions {
  /**
   * 路径点列表，每个点包含坐标和时间信息
   * 时间可以是Unix时间戳（毫秒）或相对时间（秒）
   */
  path: Array<{
    lat: number;
    lng: number;
    /** 该点所处的时间，可以是  "时间戳（毫秒）/ 1000" 或相对时间（秒） */
    time: number;
    /** 可选的额外数据，如速度、方向等 */
    data?: any;
  }>;

  /** 动画总时长（毫秒），如果未指定则根据路径点时间自动计算 */
  duration?: number;

  /** 播放速度倍率，默认1.0（正常速度），2.0表示2倍速，0.5表示0.5倍速 */
  speed?: number;

  /** 是否自动开始播放，默认false */
  autoPlay?: boolean;

  /** 是否循环播放，默认false */
  loop?: boolean;

  /** 路径线条样式 */
  pathStyle?: {
    /** 完整路径线条颜色 */
    strokeColor?: string;
    /** 完整路径线条宽度 */
    strokeWeight?: number;
    /** 完整路径线条透明度 */
    strokeOpacity?: number;
    /** 是否显示方向箭头 */
    showDirection?: boolean;
  };

  /** 已走过路径的样式 */
  passedStyle?: {
    /** 已走过路径线条颜色 */
    strokeColor?: string;
    /** 已走过路径线条宽度 */
    strokeWeight?: number;
    /** 已走过路径线条透明度 */
    strokeOpacity?: number;
    /** 是否显示方向箭头 */
    showDirection?: boolean;
  };

  /** 移动标记的样式 */
  markerStyle?: {
    /** 标记图标 */
    icon?:
      | string
      | {
          url: string;
          size?: [number, number];
        };
    /** 标记大小 */
    size?: [number, number];
    /** 是否显示标记 */
    visible?: boolean;
  };

  /** 平滑插值设置 */
  interpolation?: {
    /** 是否启用插值，默认true */
    enabled?: boolean;
    /** 插值类型：'linear' 或自定义插值函数 */
    type?:
      | "linear"
      | (( p0: any, p1: any, path: Array<{ lat: number; lng: number; time: number; data?: any;}> ) => { lat: number; lng: number; time: number; data?: any });
  };

  /** 事件回调 */
  callbacks?: {
    /** 动画开始回调 */
    onStart?: () => void;
    /** 动画暂停回调 */
    onPause?: () => void;
    /** 动画恢复回调 */
    onResume?: () => void;
    /** 动画停止回调 */
    onStop?: () => void;
    /** 动画重置回调 */
    onReset?: () => void;
    /** 动画结束回调 */
    onEnd?: () => void;
    /** 时间更新回调，返回当前时间和进度 */
    onTimeUpdate?: (currentTime: number, progress: number) => void;
    /** 到达路径点回调 */
    onReachPoint?: (point: any, index: number) => void;
  };
}
```

##### 返回参数
```typescript
/**
 * 时间基础路径动画的控制器接口
 * 提供动画播放控制和状态查询功能
 */
export interface ITimeBasedPathAnimationController {
  /** 开始/重新开始动画 */
  start(): void;

  /** 暂停动画 */
  pause(): void;

  /** 恢复动画 */
  resume(): void;

  /** 停止动画 */
  stop(): void;

  /** 重置动画到初始状态 */
  reset(): void;

  /** 设置播放速度 */
  setSpeed(speed: number): void;

  /** 跳转到指定时间点 */
  seekToTime(time: number): void;

  /** 跳转到指定路径点 */
  seekToPoint(index: number): void;

  /** 获取当前播放状态 */
  getState(): {
    /** 是否正在播放 */
    isPlaying: boolean;
    /** 是否已暂停 */
    isPaused: boolean;
    /** 当前时间 */
    currentTime: number;
    /** 播放进度 (0-1) */
    progress: number;
    /** 当前路径点索引 */
    currentPointIndex: number;
    /** 当前播放速度 */
    speed: number;
  };

  /** 获取总时长 */
  getDuration(): number;

  /** 销毁动画控制器，清理资源 */
  destroy(): void;
}
```
#### 示例代码

```javascript
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>高德地图时间基础路径动画演示</title>
    <style>
      #container {
        width: 100%;
        height: 500px;
      }
      .control-panel {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
      }
      .control-group {
        margin: 10px 0;
      }
      label {
        display: inline-block;
        width: 120px;
      }
      button {
        margin: 5px;
        padding: 5px 10px;
      }
      .status {
        margin-top: 10px;
        padding: 10px;
        background-color: #e9ecef;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <h1>高德地图时间基础路径动画演示</h1>

    <div class="control-panel">
      <div class="control-group">
        <button id="startBtn">开始动画</button>
        <button id="pauseBtn">暂停动画</button>
        <button id="resumeBtn">恢复动画</button>
        <button id="stopBtn">停止动画</button>
        <button id="resetBtn">重置动画</button>
      </div>

      <div class="control-group">
        <label for="speedInput">播放速度:</label>
        <input
          type="range"
          id="speedInput"
          min="0.1"
          max="3"
          step="0.1"
          value="1"
        />
        <span id="speedValue">1.0</span>
      </div>

      <div class="control-group">
        <label for="timeSlider">时间控制:</label>
        <input type="range" id="timeSlider" min="0" max="100" value="0" />
        <span id="timeValue">0%</span>
      </div>

      <div class="control-group">
        <label for="pointSelector">跳转到点:</label>
        <select id="pointSelector">
          <option value="">选择路径点</option>
        </select>
      </div>

      <div class="status">
        <strong>状态:</strong>
        <span id="statusText">未开始</span>
      </div>
    </div>

    <div id="container"></div>

    <script type="module">
      import { init } from "../src/index";

      // 初始化地图
      let map;
      let animationController = null;
      let pathData = []; // 保存路径数据用于跳转

      (async () => {
        try {
          map = await init({
            container: document.getElementById("container"),
            mapProvider: "amap",
            apiKey: "xxx",
            securityJsCode: "xxx",
            center: { lat: 39.997761, lng: 116.478935 },
            zoom: 16,
          });

          // 创建测试路径数据
          const now = Date.now();
          pathData = [
            { lat: 39.997761, lng: 116.478935, time: 0 },
            { lat: 39.997825, lng: 116.478939, time: 10 },
            { lat: 39.998549, lng: 116.478912, time: 20 },
            { lat: 39.998555, lng: 116.478998, time: 30 },
            { lat: 39.99856, lng: 116.479282, time: 40 },
            { lat: 39.998528, lng: 116.479658, time: 50 },
            { lat: 39.998453, lng: 116.480151, time: 60 },
            { lat: 39.998302, lng: 116.480784, time: 70 },
            { lat: 39.998184, lng: 116.481149, time: 80 },
            { lat: 39.997997, lng: 116.481573, time: 90 },
            { lat: 39.997846, lng: 116.481863, time: 100 },
            { lat: 39.997718, lng: 116.482072, time: 110 },
            { lat: 39.997718, lng: 116.482362, time: 120 },
            { lat: 39.998935, lng: 116.483633, time: 130 },
            { lat: 39.998968, lng: 116.48367, time: 140 },
            { lat: 39.999861, lng: 116.484648, time: 150 },
          ];

          // 填充路径点选择器
          const pointSelector = document.getElementById("pointSelector");
          pathData.forEach((point, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `路径点 ${index} (时间: ${point.time})`;
            pointSelector.appendChild(option);
          });
          // 更新状态显示
          function updateStatus(text) {
            const statusText = document.getElementById("statusText");
            statusText.textContent = text;
          }

          // 更新时间滑块显示
          function updateTimeSlider(value) {
            const timeSlider = document.getElementById("timeSlider");
            const timeValue = document.getElementById("timeValue");
            timeSlider.value = value;
            timeValue.textContent = Math.round(value) + "%";
          }

          // 初始化动画
          async function initAnimation() {
            try {
              animationController = await map.animateTimeBasedPath({
                path: pathData,
                speed: 1.0,
                autoPlay: false,
                loop: true,
                interpolation: {
                  enabled: true,
                  type: "linear", // 默认线性插值
                  precision: 20,
                },
                pathStyle: {
                  strokeColor: "#0066CC",
                  strokeWeight: 4,
                  strokeOpacity: 0.6,
                  showDirection: true,
                },
                passedStyle: {
                  strokeColor: "#00AA00",
                  strokeWeight: 6,
                  strokeOpacity: 1.0,
                },
                markerStyle: {
                  visible: true,
                  icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                },
                callbacks: {
                  onStart: () => {
                    updateStatus("动画开始");
                  },
                  onPause: () => {
                    updateStatus("动画暂停");
                  },
                  onResume: () => {
                    updateStatus("动画恢复");
                  },
                  onStop: () => {
                    updateStatus("动画停止");
                  },
                  onReset: () => {
                    updateStatus("动画重置");
                    updateTimeSlider(0);
                  },
                  onEnd: () => {
                    updateStatus("动画结束");
                  },
                  onTimeUpdate: (currentTime, progress) => {
                    updateTimeSlider(progress * 100);
                  },
                  onReachPoint: (point, index) => {
                    console.log(`到达路径点 ${index}:`, point);
                  },
                },
              });

              console.log("动画控制器初始化成功");
            } catch (error) {
              console.error("初始化动画失败:", error);
            }
          }

          // 事件监听器
          document.getElementById("startBtn").addEventListener("click", () => {
            if (animationController) {
              animationController.start();
            }
          });

          document.getElementById("pauseBtn").addEventListener("click", () => {
            if (animationController) {
              animationController.pause();
            }
          });

          document.getElementById("resumeBtn").addEventListener("click", () => {
            if (animationController) {
              animationController.resume();
            }
          });

          document.getElementById("stopBtn").addEventListener("click", () => {
            if (animationController) {
              animationController.stop();
            }
          });

          document.getElementById("resetBtn").addEventListener("click", () => {
            if (animationController) {
              animationController.reset();
            }
          });

          document
            .getElementById("speedInput")
            .addEventListener("input", (e) => {
              const speed = parseFloat(e.target.value);
              document.getElementById("speedValue").textContent =
                speed.toFixed(1);
              if (animationController) {
                animationController.setSpeed(speed);
              }
            });

          // 设置时间滑块控制
          document
            .getElementById("timeSlider")
            .addEventListener("input", (e) => {
              const progress = parseFloat(e.target.value) / 100;
              document.getElementById("timeValue").textContent =
                Math.round(progress * 100) + "%";

              if (animationController && pathData.length > 0) {
                const minTime = pathData[0].time;
                const maxTime = pathData[pathData.length - 1].time;
                const targetTime = minTime + (maxTime - minTime) * progress;
                animationController.seekToTime(targetTime);
              }
            });

          // 设置路径点跳转
          document
            .getElementById("pointSelector")
            .addEventListener("change", (e) => {
              const index = parseInt(e.target.value);
              if (!isNaN(index) && animationController) {
                animationController.seekToPoint(index);
              }
            });

          // 初始化
          await initAnimation();
        } catch (error) {
          console.error("Map initialization failed:", error);
        }
      })();
    </script>
  </body>
</html>
```

## 面

### 添加多边形：addPolygon、addPolygonSync

#### addPolygon、addPolygonSync 使用说明

```typescript
addPolygon(options: IUnifiedPolygonOptions): Promise<any>;
addPolygonSync(options: IUnifiedPolygonOptions): any;
```

<font style="color:#DF2A3F;">注意：</font>

1. <font style="color:#DF2A3F;">fillOpacity设置用于设置填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置</font>
2. <font style="color:#DF2A3F;">path支持传二维数组，来支持带孔多边形绘制</font>

```typescript
interface IUnifiedPolygonOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例（可选）
  path:
    | Array<{ lat: number; lng: number }>
    | Array<Array<{ lat: number; lng: number }>>; // 路径坐标集合。google: paths, huawei: paths, amap: path

  zIndex?: number; // 层级高度（默认由地图实现决定）
  strokeColor?: string; // 线条颜色
  strokeWeight?: number; // 线条宽度（单位像素）
  fillColor?: string; // 填充颜色

  /**
   * AG 地图共有属性
   */
  strokeOpacity?: number; // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  draggable?: boolean; // 是否可拖动 默认 false
  geodesic?: boolean; // 折线是否是大地曲线，默认为false

  /**
   * AH 地图共有属性
   */
  showDirection?: boolean; // 是否显示方向箭头（默认 false）、华为: showDir / AMap: showDir / Google 无原生支持
  strokeLineDash?: Array<number>; // 虚线样式（需要平台转换逻辑）。华为: strokeLineDash / AMap: strokeDasharray / Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素

  /**
   * GH 地图共有属性
   */
  visible?: boolean; // 折线是否可见
}
```

#### 示例代码

```typescript
const initCommonMapOption = {
  center: { lat: 48.3, lng: 2.3 },
  zoom: 8,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  ...initCommonMapOption,
});

const commonOptions = {
  path: [
    { lat: 49, lng: 2 },
    { lat: 48.5, lng: 2.5 },
    { lat: 48, lng: 1.5 },
  ],
  // 带孔多边形绘制
  // path: [
  //   [
  //     { lat: 49, lng: 2 },
  //     { lat: 48.5, lng: 2.5 },
  //     { lat: 48, lng: 1.5 },
  //   ],
  //   [
  //     { lat: 48.9, lng: 2.05 },
  //     { lat: 48.55, lng: 2.35 },
  //     { lat: 48.1, lng: 1.7 },
  //   ],
  // ],
  fillColor: "#0000FF",
  fillOpacity: 0.5,
  strokeColor: "#00FF00",
  strokeWeight: 10,
  strokeLineDash: [10, 20],
  strokeOpacity: 0.5,
};

setTimeout(async () => {
  console.log("添加 polygon");
  const amap = await amapMap.addPolygon({
    ...commonOptions,
  });

  setTimeout(() => {
    console.log("删除 polygon");
    amapMap.removePolygon(amap);
  }, 2000);
}, 2000);
```

#### 完整参数

```typescript
interface IUnifiedPolygonOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例（可选）
  path:
    | Array<{ lat: number; lng: number }>
    | Array<Array<{ lat: number; lng: number }>>; // 路径坐标集合。google: paths, huawei: paths, amap: path

  zIndex?: number; // 层级高度（默认由地图实现决定）
  strokeColor?: string; // 线条颜色
  strokeWeight?: number; // 线条宽度（单位像素）
  fillColor?: string; // 填充颜色

  /**
   * AG 地图共有属性
   */
  strokeOpacity?: number; // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  draggable?: boolean; // 是否可拖动 默认 false
  geodesic?: boolean; // 折线是否是大地曲线，默认为false

  /**
   * AH 地图共有属性
   */
  showDirection?: boolean; // 是否显示方向箭头（默认 false）、华为: showDir / AMap: showDir / Google 无原生支持
  strokeLineDash?: Array<number>; // 虚线样式（需要平台转换逻辑）。华为: strokeLineDash / AMap: strokeDasharray / Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素

  /**
   * GH 地图共有属性
   */
  visible?: boolean; // 折线是否可见

  /**
   * A 地图特有属性
   */
  //   path: Array<Array<number>> | Array<Array<Array<number>>>; // 经度 lng，纬度lat
  //   zIndex?: number; // 层级
  //   strokeColor?: string; // 线颜色
  //   strokeOpacity?: number; // 线透明度 0-1 1表示不透明
  //   strokeWeight?: number; // 线宽 px
  //   fillColor?: string; // 填充颜色
  //   fillOpacity?: number; // 填充透明度
  //   draggable?: boolean; // 是否可拖动 默认 false
  bubble?: boolean; // 是否将覆盖物的鼠标或 touch 事件冒泡至地图
  cursor?: string; // 鼠标悬停时的鼠标样式
  height?: number; // 离地绘制的高度
  extrusionHeight?: number; // 多边形是否拉伸为的立面体高度值，默认值为0
  wallColor?: string; // 立面体侧面的颜色
  roofColor?: string; // 立面体顶面颜色
  extData?: any; // 自定义属性
  strokeStyle?: string; // 线样式 solid | dashed
  strokeDasharray?: Array<number>; // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效。虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线

  /**
   * G 地图特有属性
   */
  //   map?: any; // 需要显示的地图实例
  //   draggable?: boolean; // 是否可拖拽
  //   fillColor?: string; // 填充颜色
  //   fillOpacity?: number; // 填充透明度
  //   geodesic?: boolean; // 是否是大地曲线，默认为false
  //   path: Array<{ lat: number; lng: number }>; // 点集合
  //   strokeColor?: string; // 颜色
  //   strokeOpacity?: number; // 不透明度
  //   strokeWeight?: number; // 折线宽度 px
  //   visible?: boolean; // 折线是否可见
  //   zIndex?: number; // 折线层级
  clickable?: boolean; // 是否可点击
  editable?: boolean; // 是否可通过控制点编辑折线

  /**
   * H 地图特有属性
   */
  //   map?: any;
  //   path: Array<{ lat: number; lng: number }>; // 纬度、经度
  //   fillColor?: string; // 填充颜色
  //   strokeColor?: string; // 边框颜色
  //   strokeLineDash?: Array<number>; // 虚线类型，参数是一组描述交替绘制线段和间距长度的数字。如果数组元素的数量是奇数， 数组的元素会被复制并重复。 [5, 10, 15] 会变成 [5, 10, 15, 5, 10, 15]
  //   strokeWeight?: number; // 线宽  px
  //   visible?: boolean; // 是否显示
  //   zIndex?: number; // 层级
}

```

### 删除多边形：removePolygon

#### removePolygon 使用说明

##### removePolygon 方法声明

```typescript
removePolygon(polygon: any): void;
```

#### 示例代码

```typescript
amapMap.removePolygon(amapPolygon); // amapPolygon 对象获取请参考 addPolygon 示例
```

### 添加圆：addCircle、addCircleSync

#### addCircle、addCircleSync使用说明

##### addCircle、addCircleSync 方法声明

```typescript
addCircle(options: IUnifiedCircleOptions): Promise<any>;
addCircleSync(options: IUnifiedCircleOptions): any;
```

##### addCircle、addCircleSync方法参数

```typescript
interface IUnifiedCircleOptions {
  // ----------- 所有平台都支持的共性属性 -----------
  /** 地图实例（可选） */
  //   map?: any;
  center: { lat: number; lng: number }; // 圆中心 google: paths, huawei: paths, amap: path
  zIndex?: number; // 层级高度（默认由地图实现决定）
  radius: number; // 圆半径 单位为米
  strokeColor?: string; // 线条颜色
  strokeWeight?: number; // 线条宽度（单位像素）Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素
  fillColor?: string; // 填充颜色

  /**
   * AG 地图共有属性
   */
  strokeOpacity?: number; // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  draggable?: boolean; // 是否可拖动 默认 false

  /**
   * AH 地图共有属性
   */

  strokeLineDash?: Array<number>; // 华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持

  /**
   * GH 地图共有属性
   */
  visible?: boolean; // 是否可见
}
```

#### 示例代码

```typescript
const initCommonMapOption = {
  center: { lat: 48.5, lng: 2.3 },
  zoom: 8,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  ...initCommonMapOption,
});

const commonOptions = {
  center: { lat: 48.5, lng: 2.3 },
  radius: 20000,
  fillColor: "#0000FF",
  fillOpacity: 0.5,
  strokeColor: "#00FF00",
  strokeWeight: 10,
  strokeLineDash: [10, 20],
  strokeOpacity: 0.5,
};

setTimeout(async () => {
  console.log("添加 circle");
  const amap = await amapMap.addCircle({
    ...commonOptions,
  });
  setTimeout(() => {
    console.log("删除 circle");
    amapMap.removeCircle(amap);
  }, 2000);
}, 2000);
```

#### 完整参数

```typescript
interface IUnifiedCircleOptions {
  // ----------- 所有平台都支持的共性属性 -----------
  /** 地图实例（可选） */
  //   map?: any;
  center: { lat: number; lng: number }; // 圆中心 google: paths, huawei: paths, amap: path
  zIndex?: number; // 层级高度（默认由地图实现决定）
  radius: number; // 圆半径 单位为米
  strokeColor?: string; // 线条颜色
  strokeWeight?: number; // 线条宽度（单位像素）Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素
  fillColor?: string; // 填充颜色

  /**
   * AG 地图共有属性
   */
  strokeOpacity?: number; // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  draggable?: boolean; // 是否可拖动 默认 false

  /**
   * AH 地图共有属性
   */

  strokeLineDash?: Array<number>; // 华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持

  /**
   * GH 地图共有属性
   */
  visible?: boolean; // 是否可见

  /**
   * A 地图特有属性
   */
  //   center: {
  //     // 圆形的经纬度坐标
  //     /** 纬度 */
  //     lat: number;
  //     /** 经度 */
  //     lng: number;
  //   };
  //   radius: number; // 圆形的半径，单位为米
  //   zIndex?: number; // 圆形的层级高度
  //   strokeColor?: string; // 圆形的边框颜色
  //   strokeOpacity?: number; // 圆形的边框透明度
  //   strokeWeight?: number; // 圆形的边框宽度
  //   fillColor?: string; // 圆形的填充颜色
  //   fillOpacity?: number; // 圆形的填充透明度
  //   draggable?: boolean; // 是否可拖拽
  bubble?: boolean; // 事件是否冒泡至地图
  cursor?: string; // 鼠标悬停时的鼠标样式
  height?: number; // 离地绘制高度
  extData?: any; // 自定义数据属性
  strokeStyle?: string; // 圆形边框样式 dashed solid
  strokeDasharray?: Array<number>; // 圆形边框虚线样式

  /**
   * G 地图特有属性
   */
  //   map?: any;
  //   center: {
  //     // 圆形的经纬度坐标
  //     /** 纬度 */
  //     lat: number;
  //     /** 经度 */
  //     lng: number;
  //   };
  //   draggable?: boolean; // 是否可拖拽
  //   fillColor?: string; // 圆形的填充颜色
  //   fillOpacity?: number; // 圆形的填充透明度
  //   radius: number; // 圆形的半径，单位为米
  //   zIndex?: number; // 圆形的层级高度
  //   strokeColor?: string; // 圆形的边框颜色
  //   strokeOpacity?: number; // 圆形的边框透明度
  //   strokeWeight?: number; // 圆形的边框宽度 px
  //   visible?: boolean; // 圆形的可见性
  clickable?: boolean; // 是否可点击
  editable?: boolean; // 是否可编辑

  /**
   * H 地图特有属性
   */
  //   map?: any;
  //   center: { // 圆形的经纬度坐标
  //     /** 纬度 */
  //     lat: number;
  //     /** 经度 */
  //     lng: number;
  //   };
  //   radius: number; // 圆形的半径，单位为米
  //   zIndex?: number; // 圆形的层级高度
  //   fillColor?: string; // 圆形的填充颜色
  //   strokeColor?: string; // 圆形的边框颜色
  //   strokeLineDash?: Array<number>; // 华为: strokeLineDash / AMap: strokeDasharray / Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素
  //   strokeWeight?: number; // 圆形的边框宽度
  //   visible?: boolean; // 圆形的可见性
}
```

### 删除圆：removeCircle

#### removeCircle 使用说明

##### removeCircle 方法声明

```typescript
removeCircle(circle: any): void;
```

#### 示例代码

```typescript
amapMap.removeCircle(amapCircle); // amapCircle 对象获取请参考 addCircle 示例代码
```

### 添加矩形：addRectangle、addRectangleSync

#### addRectangle 、addRectangleSync使用说明

##### addRectangle、addRectangleSync 方法声明

```typescript
addRectangle(options: IUnifiedRectangleOptions): Promise<any>;
addRectangleSync(options: IUnifiedRectangleOptions): any;
```

##### addRectangle、addRectangleSync方法参数

```typescript
interface IUnifiedRectangleOptions {
  /**
   * 所有地图共有属性
   */
  map?: any; // 地图实例（可选）

  /** 坐标范围 */
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }; // google: paths, huawei: paths, amap: path
  zIndex?: number; //  层级高度（默认由地图实现决定）
  fillColor?: string; // 填充颜色
  /** 线条颜色 */
  strokeColor?: string;

  /** 线条宽度（单位像素） */
  strokeWeight?: number;

  /**
   * AG 地图共有属性
   */
  strokeOpacity?: number; // 线条透明度（0-1，默认 1）。AMap/Google 原生支持，华为需通过颜色透明度实现
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置

  /**
   * AH 地图共有属性
   */
  strokeLineDash?: Array<number>; // 虚线样式（需要平台转换逻辑）。  华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持

  /**
   * GH 地图共有属性
   */
}
```

#### 示例代码

```typescript
const initCommonMapOption = {
  center: { lat: 39.876405, lng: 116.387175 },
  zoom: 12,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  ...initCommonMapOption,
});

const commonOptions = {
  bounds: {
    north: 39.893797,
    south: 39.859008,
    east: 116.417901,
    west: 116.356449,
  },
  fillColor: "#0000FF",
  fillOpacity: 0.5,
  strokeColor: "#00FF00",
  strokeWeight: 10,
  strokeLineDash: [10, 20],
  strokeOpacity: 0.5,
};

setTimeout(async () => {
  console.log("添加 rectangle");
  const amap = await amapMap.addRectangle({
    ...commonOptions,
  });

  setTimeout(() => {
    console.log("删除 rectangle");
    amapMap.removeRectangle(amap);
  }, 2000);
}, 2000);
```

#### 完整参数

```typescript
interface IUnifiedRectangleOptions {
  /**
   * 所有地图共有属性
   */
  map?: any; // 地图实例（可选）

  /** 坐标范围 */
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }; // google: paths, huawei: paths, amap: path
  zIndex?: number; //  层级高度（默认由地图实现决定）
  fillColor?: string; // 填充颜色
  /** 线条颜色 */
  strokeColor?: string;

  /** 线条宽度（单位像素） */
  strokeWeight?: number;

  /**
   * AG 地图共有属性
   */
  strokeOpacity?: number; // 线条透明度（0-1，默认 1）。AMap/Google 原生支持，华为需通过颜色透明度实现
  fillOpacity?: number; // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置

  /**
   * AH 地图共有属性
   */
  strokeLineDash?: Array<number>; // 虚线样式（需要平台转换逻辑）。  华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持

  /**
   * GH 地图共有属性
   */

  /**
   * A 地图特有属性
   */
  // map?: any;
  // bounds: AMap.Bounds(southWest: Array, northEast: Array); //矩形边界点数组。 Array为[经度, 纬度]
  // zIndex?: number; // 层级
  // strokeColor?: string;// 矩形边框颜色
  // strokeOpacity?: number; // 矩形边框透明度
  // strokeWeight?: number; // 矩形边框宽度
  // fillColor?: string; // 矩形填充颜色
  // fillOpacity?: number; // 矩形填充透明度
  bubble?: boolean; // 事件是否冒泡到地图上
  cursor?: string; // 鼠标移入时的鼠标样式
  height?: number; // 离地高度
  extData?: any; // 用户自定义属性
  strokeStyle?: "solid" | "dashed"; // 边框样式
  strokeDasharray?: number[]; // 虚线样式

  /**
   * G 地图特有属性
   */
  // map?: any;
  // bounds:
  //   | google.maps.LatLngBounds
  //   | {
  //       north: any;
  //       south: any;
  //       east: any;
  //       west: any;
  //     }; // 矩形边界
  // fillColor?: string; // 填充颜色
  // fillOpacity?: number; // 填充透明度
  // strokeColor?: string; // 边框颜色
  // strokeOpacity?: number; // 边框透明度
  // strokeWeight?: number; // 边框宽度
  // visible?: boolean; // 是否可见
  // zIndex?: number; // 层级
  clickable?: boolean; // 是否响应点击事件
  draggable?: boolean; // 是否可拖拽
  editable?: boolean; // 是否可编辑

  /**
   * H 地图特有属性
   */
  // 华为没有提供绘制矩阵的 api，使用添加多边形的 api 实现
  // map?: any;
  // path: Array<{ lat: number; lng: number }>; // 纬度、经度
  // fillColor?: string; // 填充颜色
  // strokeColor?: string; // 边框颜色
  // strokeLineDash?: Array<number>; // 虚线类型，参数是一组描述交替绘制线段和间距长度的数字。如果数组元素的数量是奇数， 数组的元素会被复制并重复。 [5, 10, 15] 会变成 [5, 10, 15, 5, 10, 15]
  // strokeWeight?: number; // 线宽  px
  // visible?: boolean; // 是否显示
  // zIndex?: number; // 层级
}
```

### 删除矩形

#### removeRectangle 使用说明

##### removeRectangle 方法声明

```typescript
removeRectangle(rectangle: any): void;
```

#### 示例代码

```typescript
amapMap.removeRectangle(amapRect); //amapRect 对象获取请参考 addRectangle 示例代码
```



## 几何计算

### 距离计算：getDistanceBetween

#### getDistanceBetween 使用说明

<font style="color:#DF2A3F;">注意：由于华为地图在使用 面积计算 api 时需要依赖地图对象，为了保证统一性，这里没有封装成类方法了，而是需要首先 init一个地图对象才可以使用 距离计算和面积计算的方法，具体可参考示例代码</font>

##### getDistanceBetween 方法声明

```typescript
getDistanceBetween(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ): Promise<number>;
```

#### 示例代码

```typescript
const initCommonMapOption = {
  center: { lat: 39.876405, lng: 116.387175 },
  zoom: 12,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  ...initCommonMapOption,
});

const start = { lng: 2.35, lat: 48.85 };
const end = { lng: 2.33, lat: 48.75 };
setTimeout(async () => {
  console.log("计算 distance");
  const amapDistance = await amapMap.getDistanceBetween(start, end);
  console.log(amapDistance)
}, 2000);
```

### 面积计算：getPolygonArea

#### getPolygonArea 使用说明

<font style="color:#DF2A3F;">注意：由于华为地图在使用 面积计算api 时需要依赖地图对象，为了保证统一性，这里没有封装成类方法了，而是需要首先 init一个地图对象才可以使用距离计算和面积计算的方法</font>

##### getPolygonArea 方法声明

```typescript
getPolygonArea(path: Array<{ lat: number; lng: number }>): Promise<number>;
```

#### 示例代码

```typescript
const initCommonMapOption = {
  center: { lat: 39.876405, lng: 116.387175 },
  zoom: 12,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  ...initCommonMapOption,
});
const path = [
  { lat: 49, lng: 2 },
  { lat: 48.5, lng: 2.5 },
  { lat: 48, lng: 1.5 },
];
setTimeout(async () => {
  console.log("计算 area");
  const amapArea = await amapMap.getPolygonArea(path);
  console.log(amapArea)
}, 2000);
```

## 位置搜索

#### 地址返回结果说明

统一地图组件 api 提供 `name、formatAddress、postion`的统一返回，如需要获取各地图提供商的原始返回结果可以访问`sourceResult`字段

```typescript
interface IUnifiedPlaceResults {
  name: string; // 名称
  formatAddress: string; // 详细 地址
  position: { lat: number; lng: number }; // 经纬度
  sourceResult: any; // 原生返回结果
}
```

### 关键字搜索：searchPlaceByKeyword

#### searchPlaceByKeyword 使用说明

<font color="red">关键字搜索默认当前地区全国范围内搜索，虽然有`location`字段可以设置搜索结果偏向的经纬度，但实测并不能指定城市搜索。 </font>华为与 google 地图可以通过指定`poiType`来缩小结果范围，高德地图支持`city`和`citylimit=true`来限制在某一个城市范围内搜索。建议使用`searchPlaceNearby(

##### searchPlaceByKeyword 方法声明

```typescript
searchPlaceByKeyword(
    options: IUnifiedSearchByKeywordOptions
  ): Promise<Array<IUnifiedPlaceResults>>;
```

##### searchPlaceByKeyword 方法参数

```typescript
interface IUnifiedSearchByKeywordOptions {
  /**
   * 所有地图共有属性
   */
  query?: string; // 搜索关键字 huawei: query / AMap: keyword / Google: query
  poiType?: string; // 指定POI类型 huawei: poiType / AMap: type / Google: type

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */
  pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  pageIndex?: number; // 页码 取值范围：1-20，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi

  /**
   * GH 地图共有属性
   */
  location?: { lat: number; lng: number }; // 搜索结果偏向的经纬度 huawei: location / AMap：不支持 / Google: location
  language?: string; // 搜索结果的语种。如果不指定语种，使用地点的当地语言。 huawei: language / AMap: 不支持 / Google: language
}
```

#### 示例代码

```typescript
const initCommonMapOption = {
  center: { lat: 28.169809, lng: 112.929122 },
  zoom: 12,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

const searchOptions = {
  query: "北京大学",
  location: { lat: 28.169809, lng: 112.929122 },
  radius: 10000,
};
console.log("关键字搜索");
amapMap.searchPlaceByKeyword(searchOptions).then((res) => {
  console.log("amap", res);
});
```

#### 完整参数

```typescript
interface IUnifiedSearchNearbyOptions {
  /**
   * 所有地图共有属性
   */
  query?: string; // 搜索关键字 huawei: query / AMap: keyword / Google: keyword
  location?: { lat: number; lng: number }; // 当前的位置 huawei: location / AMap: center / Google: location
  radius?: number; // 搜索半径，单位：米。 huawei: radius / AMap: radius / Google: radius
  poiType?: string; // 指定POI类型 huawei: poiType / AMap: type / Google: type

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */
  pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  pageIndex?: number; // 页码 取值范围：1-20，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi

  /**
   * GH 地图共有属性
   */
  language?: string; // 搜索结果的语种。如果不指定语种，使用地点的当地语言。 huawei: language / AMap: 不支持 / Google: language

  /**
   * A 地图特有属性
   */
  // keyword: string; // 关键字
  // center: Array<number>; //[lng, lat] 中心点经纬度
  // radius?: number; // 半径
  // pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  // pageIndex?: number; // 页码 取值范围：1-100，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi
  // type?: string; // POI 类型
  city?: string; // 城市名 citycode
  citylimit?: boolean; // 是否限制city 范围搜索
  extensions?: string; // 此项默认值：base，返回基本地址信息  取值：all，返回基本+详细信息
  map?: any; // 地图实例
  panel?: string | HTMLElement; // 结果列表的HTML容器或对应id
  showCover?: boolean; // 是否在地图上显示周边搜索范围
  renderStyle?: string; // 结果渲染样式  如使用了map或panel属性，renderStyle可以用来设定绘制的UI风格，缺省为'newpc'。可选值:'newpc'或'default'，'newpc'为带图片展示的新样式，'default'为原有简单样式。
  autoFitView?: boolean; // 是用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围

  /**
   * G 地图特有属性
   */
  // keyword?: string; // 搜索关键字
  // radius?: number; // 用于在搜索地点时自定义调整结果的区域的半径，以米为单位。
  // language?: string; // 地点详情将以首选语言（如果有）显示。将默认采用浏览器的语言偏好设置
  // location?: string; // 用于在搜索地点时偏向结果的区域中心。
  // type?: string; // 搜索指定类型的地点。
  bounds?: any; // LatLngBounds | LatLngBoundsLiteral。用于在搜索地点时偏向结果的边界（可选）。如果设置了 bounds，系统会忽略 location 和 radius。结果不会仅限于这些边界内，但这些边界内的结果排名会更高。
  maxPriceLevel?: number; // 将结果限制为仅包含指定价位或更低价位的地点。有效值范围介于 0（最实惠）和 4（最昂贵）之间，包括 0 和 4。必须大于或等于 minPrice （如果指定）。
  minPriceLevel?: number; // 将结果限制为仅包含指定价位或更高价位的地点。有效值范围介于 0（最实惠）和 4（最昂贵）之间，包括 0 和 4。必须小于或等于 maxPrice（如果指定）。
  openNow?: boolean; // 将结果限制为仅包含在指定时间开放或始终开放的地点。
  rankBy?: string; // DISTANCE: 根据与地点的距离对地点搜索结果进行排名。PROMINENCE:按地点知名度对地点结果进行排名

  /**
   * H 地图特有属性
   */
  // language?: string; // 搜索建议的语种，如果不指定语种，返回地点的当地语言。
  // location: { lat: number; lng: number }; // 当亲用户的位置
  // pageIndex?: number; // 当前页数。取值范围：[1, 60]，默认1。约束：pageindex*pagesize <= 60。
  // pageSize?: number; // 每页返回的记录数。取值范围：[1, 20]，默认20。
  // poiType?: string; // 返回指定POI类型的地点。
  // query?: string; // 搜索建议的关键词。
  // radius?: number; // 搜索建议的半径，单位：米
}
```

### 附近搜索

#### searchPlaceNearby 使用说明

##### searchPlaceNearby 方法声明

```typescript
searchPlaceNearby(
    options: IUnifiedSearchNearbyOptions
  ): Promise<Array<IUnifiedPlaceResults>>;
```

##### searchPlaceNearby 方法参数

```typescript
interface IUnifiedSearchNearbyOptions {
  /**
   * 所有地图共有属性
   */
  query?: string; // 搜索关键字 huawei: query / AMap: keyword / Google: keyword
  location?: { lat: number; lng: number }; // 当前的位置 huawei: location / AMap: center / Google: location
  radius?: number; // 搜索半径，单位：米。 huawei: radius / AMap: radius / Google: radius
  poiType?: string; // 指定POI类型 huawei: poiType / AMap: type / Google: type

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */
  pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  pageIndex?: number; // 页码 取值范围：1-20，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi

  /**
   * GH 地图共有属性
   */
  language?: string; // 搜索结果的语种。如果不指定语种，使用地点的当地语言。 huawei: language / AMap: 不支持 / Google: language
}
```

#### 示例代码

```javascript
const initCommonMapOption = {
  center: { lat: 28.169809, lng: 112.929122 },
  zoom: 12,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});
const searchOptions = {
  query: "北京大学",
  location: { lat: 28.169809, lng: 112.929122 },  // 中南大学附近搜索北京大学
  radius: 10000,
};
console.log("附近搜索");
amapMap.searchPlaceNearby(searchOptions).then((res) => {
  console.log("amap", res);
});
```

#### 完整参数

```typescript
interface IUnifiedSearchNearbyOptions {
  /**
   * 所有地图共有属性
   */
  query?: string; // 搜索关键字 huawei: query / AMap: keyword / Google: keyword
  location?: { lat: number; lng: number }; // 当前的位置 huawei: location / AMap: center / Google: location
  radius?: number; // 搜索半径，单位：米。 huawei: radius / AMap: radius / Google: radius
  poiType?: string; // 指定POI类型 huawei: poiType / AMap: type / Google: type

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */
  pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  pageIndex?: number; // 页码 取值范围：1-20，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi

  /**
   * GH 地图共有属性
   */
  language?: string; // 搜索结果的语种。如果不指定语种，使用地点的当地语言。 huawei: language / AMap: 不支持 / Google: language

  /**
   * A 地图特有属性
   */
  // keyword: string; // 关键字
  // center: Array<number>; //[lng, lat] 中心点经纬度
  // radius?: number; // 半径
  // pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  // pageIndex?: number; // 页码 取值范围：1-100，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi
  // type?: string; // POI 类型
  city?: string; // 城市名 citycode
  citylimit?: boolean; // 是否限制city 范围搜索
  extensions?: string; // 此项默认值：base，返回基本地址信息  取值：all，返回基本+详细信息
  map?: any; // 地图实例
  panel?: string | HTMLElement; // 结果列表的HTML容器或对应id
  showCover?: boolean; // 是否在地图上显示周边搜索范围
  renderStyle?: string; // 结果渲染样式  如使用了map或panel属性，renderStyle可以用来设定绘制的UI风格，缺省为'newpc'。可选值:'newpc'或'default'，'newpc'为带图片展示的新样式，'default'为原有简单样式。
  autoFitView?: boolean; // 是用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围

  /**
   * G 地图特有属性
   */
  // keyword?: string; // 搜索关键字
  // radius?: number; // 用于在搜索地点时自定义调整结果的区域的半径，以米为单位。
  // language?: string; // 地点详情将以首选语言（如果有）显示。将默认采用浏览器的语言偏好设置
  // location?: string; // 用于在搜索地点时偏向结果的区域中心。
  // type?: string; // 搜索指定类型的地点。
  bounds?: any; // LatLngBounds | LatLngBoundsLiteral。用于在搜索地点时偏向结果的边界（可选）。如果设置了 bounds，系统会忽略 location 和 radius。结果不会仅限于这些边界内，但这些边界内的结果排名会更高。
  maxPriceLevel?: number; // 将结果限制为仅包含指定价位或更低价位的地点。有效值范围介于 0（最实惠）和 4（最昂贵）之间，包括 0 和 4。必须大于或等于 minPrice （如果指定）。
  minPriceLevel?: number; // 将结果限制为仅包含指定价位或更高价位的地点。有效值范围介于 0（最实惠）和 4（最昂贵）之间，包括 0 和 4。必须小于或等于 maxPrice（如果指定）。
  openNow?: boolean; // 将结果限制为仅包含在指定时间开放或始终开放的地点。
  rankBy?: string; // DISTANCE: 根据与地点的距离对地点搜索结果进行排名。PROMINENCE:按地点知名度对地点结果进行排名

  /**
   * H 地图特有属性
   */
  // language?: string; // 搜索建议的语种，如果不指定语种，返回地点的当地语言。
  // location: { lat: number; lng: number }; // 当亲用户的位置
  // pageIndex?: number; // 当前页数。取值范围：[1, 60]，默认1。约束：pageindex*pagesize <= 60。
  // pageSize?: number; // 每页返回的记录数。取值范围：[1, 20]，默认20。
  // poiType?: string; // 返回指定POI类型的地点。
  // query?: string; // 搜索建议的关键词。
  // radius?: number; // 搜索建议的半径，单位：米
}
```

## 地理正\逆编码

### 地理正编码：geocode

#### geocode 方法说明

##### geocode 方法声明

```typescript
geocode(
  options: IUnifiedGeocodeOptions
): Promise<Array<IUnifiedPlaceResults>>;
```

##### geocode 方法参数

```typescript
interface IUnifiedGeocodeOptions {
  /**
   * 所有地图共有属性
   */
  address?: string; // 详细地址
  language?: string; // 搜索结果的语种。如果不指定语种，返回地点的当地语言。 huawei: language / AMap: lang / Google: language

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  bounds?: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  }; // 	LatLngBounds。查询结果偏向的搜索范围。
}
```

#### 示例代码

```typescript
const initCommonMapOption = {
  center: { lat: 28.169809, lng: 112.929122 },
  zoom: 12,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

const geocodeOptions = {
  address: "北京大学",
  bounds: {
    northeast: { lng: 116.417901, lat: 39.943797 },
    southwest: { lng: 116.356449, lat: 39.859008 },
  }
};
console.log("正地理编码");
amapMap.geocode(geocodeOptions).then((res) => {
  console.log("amap", res);
});

```

#### 完整参数

```typescript
interface IUnifiedGeocodeOptions {
  /**
   * 所有地图共有属性
   */
  address?: string; // 详细地址
  language?: string; // 搜索结果的语种。如果不指定语种，返回地点的当地语言。 huawei: language / AMap: lang / Google: language

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  bounds?: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  }; // 	LatLngBounds。查询结果偏向的搜索范围。

  /**
   * A 地图特有属性
   */
  // AMap.Geocoder构造方法
  // lang?: string; // 设置语言
  city?: string; // 城市，地理编码时，设置地址描述所在城市。可选值：城市名（中文或中文全拼）、citycode、adcode；默认值：“全国”
  radius?: number; // 搜索范围，默认1000米。取值范围：0-3000，单位：米。
  batch?: boolean; // 是否批量查询
  extensions?: string; // 逆地理编码时，返回信息的详略。默认值：base，返回基本地址信息；取值为：all，返回地址信息及附近poi、道路、道路交叉口等信息
  // AMap.Geocoder.getLocation
  // address: string

  /**
   * G 地图特有属性
   */
  // address?: string; // 地址信息 必须提供 address、location 和 placeId 中的一个，且只能提供一个。
  // bounds?: any; //   LatLngBounds|LatLngBoundsLiteral.要在其中进行搜索的 LatLngBounds。
  // language?: string; // 应返回结果的语言的语言标识符（如果可能)
  componentRestrictions?: any; // 	GeocoderComponentRestrictions。组成部分用于将结果限制在特定区域内。
  location?: { lat: number; lng: number }; // 要进行地理编码的 LatLng。
  placeId?: string; // 与营业地点相关联的地点 ID。地点 ID 可唯一标识 Google Places 数据库中和 Google 地图上的地点。
  region?: string; // 用于偏向搜索的国家/地区代码，

  /**
   * H 地图特有属性
   */
  // address: string; // 地址信息
  // bounds?: any; // 	LatLngBounds。查询结果偏向的搜索范围。
  // language?: string; // 搜索结果的语种。如果不指定语种，返回地点的当地语言。
}
```

### 地理逆编码

#### reverseGeocode 方法说明

##### reverseGeocode 方法声明

```typescript
reverseGeocode(
    options: IUnifiedReverseGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>>;
```

##### reverseGeocode 方法参数

```typescript
interface IUnifiedReverseGeocodeOptions {
  /**
   * 所有地图共有属性
   */
  location: { lat: number; lng: number }; // 当前的位置 huawei: location / AMap: location / Google: location
  language?: string; // 搜索结果的语种。如果不指定语种，返回地点的当地语言。 huawei: language / AMap: lang / Google: language
  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
}
```

#### 示例代码

```typescript
const initCommonMapOption = {
  center: { lat: 28.169809, lng: 112.929122 },
  zoom: 12,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

const reverseGeocodeOptions = {
  location: { lat: 39.903179, lng: 116.397755 },
};

console.log("逆地理编码");
amapMap.reverseGeocode(reverseGeocodeOptions).then((res) => {
  console.log("amap", res);
});
```

#### 完整参数

```typescript
interface IUnifiedReverseGeocodeOptions {
  /**
   * 所有地图共有属性
   */
  location: { lat: number; lng: number }; // 当前的位置 huawei: location / AMap: location / Google: location
  language?: string; // 搜索结果的语种。如果不指定语种，返回地点的当地语言。 huawei: language / AMap: lang / Google: language
  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */

  /**
   * A 地图特有属性
   */
  // AMap.Geocoder构造方法
  // lang?: string; // 设置语言
  city?: string; // 城市，地理编码时，设置地址描述所在城市。可选值：城市名（中文或中文全拼）、citycode、adcode；默认值：“全国”
  radius?: number; // 搜索范围，默认1000米。取值范围：0-3000，单位：米。
  batch?: boolean; // 是否批量查询
  extensions?: string; // 逆地理编码时，返回信息的详略。默认值：base，返回基本地址信息；取值为：all，返回地址信息及附近poi、道路、道路交叉口等信息
  // AMap.Geocoder.getAddress
  // location: Array<number>; // [lat,lng] 经纬度，要进行地理编码的 LatLng。

  /**
   * G 地图特有属性
   */
  // language?: string; // 应返回结果的语言的语言标识符（如果可能)
  // location?: { lat: number; lng: number }; // 要进行地理编码的 LatLng。
  address?: string; // 地址信息 必须提供 address、location 和 placeId 中的一个，且只能提供一个。
  bounds?: any; //   LatLngBounds|LatLngBoundsLiteral.要在其中进行搜索的 LatLngBounds。
  componentRestrictions?: any; // 	GeocoderComponentRestrictions。组成部分用于将结果限制在特定区域内。
  placeId?: string; // 与营业地点相关联的地点 ID。地点 ID 可唯一标识 Google Places 数据库中和 Google 地图上的地点。
  region?: string; // 用于偏向搜索的国家/地区代码，

  /**
   * H 地图特有属性
   */
  // language?: string; // 搜索结果的语种。如果不指定语种，返回地点的当地语言。
  // location?: { lat: number; lng: number }; // 查询结果偏向的搜索范围。
  returnPoi?: boolean; // 是否返回POI的地点名称，默认true。目前逆地理接口，只能返回机场的名称，其他POI不支持返回名称（2025年6月3日）。
}
```

## 路径规划

### 驾车规划：routeDrive

#### routeDrive 使用说明

##### routeDrive 方法声明

```typescript
routeDrive(options: IUnifiedRouteDriveOptions): Promise<any>;
```

##### routeDrive 方法参数

```typescript
interface IUnifiedRouteDriveOptions {
  /**
   * 所有地图共有属性
   */
  origin: { lat: number; lng: number }; // 起点 A: origin  G: origin    H: origin
  destination: { lat: number; lng: number }; // 终点 A: destination  G: destination    H: destination
  waypoints?: Array<{ lat: number; lng: number }>; // 中转点 A: opts.waypoints  G: waypoints H: waypoints
  /** 是否默认显示 路径，默认值为 true */
  isShowPath?: boolean;
  
  /**
   * AG 地图共有属性
   */
  avoidFerries?: boolean; // 如果为 true，则指示路线服务尽可能避开轮渡 A: ferry(0-使用轮渡,1-不使用轮渡)   G：avoidFerries

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  trafficMode?: number; // 时间预估模型。取值包括： G -> drivingOptions.trafficModel BEST_GUESS（默认值）:使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间; OPTIMISTIC	使用历史流量数据乐观估算流量时长; PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计 H -> trafficMode: 0：best guess; 1：路况差于历史平均水平; 2：路况优于历史平均水平;默认值为0。
  departAt?: number; // 预计出发时间。时间预估模型。取值包括： G -> drivingOptions.departureTime。 H -> departAt
  avoidHighways?: boolean; // 如果设置为 true，则指示路线服务尽可能避开高速公路  G:avoidHighways   H: avoid=[2]
  avoidTolls?: boolean; // 如果为 true，则指示路线服务尽可能避开收费道路 G:avoidTolls  H: avoid=[1]
}
```

#### 示例代码

```javascript
const initCommonMapOption = {
  center: { lat: 39.865042, lng: 116.379028 },
  zoom: 12,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

const commonRouteOptions = {
  origin: { lat: 39.865042, lng: 116.379028 },
  destination: { lat: 39.903719, lng: 116.427281 },
  waypoints: [{ lat: 39.909187, lng: 116.397455 }],
};
console.log("驾车路径规划");
amapMap.routeDrive(commonRouteOptions).then((res) => {
  console.log("amap", res);
});
```

#### 完整参数

```typescript
interface IUnifiedRouteDriveOptions {
  /**
   * 所有地图共有属性
   */
  origin: { lat: number; lng: number }; // 起点 A: origin  G: origin    H: origin
  destination: { lat: number; lng: number }; // 终点 A: destination  G: destination    H: destination
  waypoints?: Array<{ lat: number; lng: number }>; // 中转点 A: opts.waypoints  G: waypoints H: waypoints
  /** 是否默认显示 路径，默认值为 true */
  isShowPath?: boolean;

  /**
   * AG 地图共有属性
   */
  avoidFerries?: boolean; // 如果为 true，则指示路线服务尽可能避开轮渡 A: ferry(0-使用轮渡,1-不使用轮渡)   G：avoidFerries

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  trafficMode?: number; // 时间预估模型。取值包括： G -> drivingOptions.trafficModel BEST_GUESS（默认值）:使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间; OPTIMISTIC	使用历史流量数据乐观估算流量时长; PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计 H -> trafficMode: 0：best guess; 1：路况差于历史平均水平; 2：路况优于历史平均水平;默认值为0。
  departAt?: number; // 预计出发时间。时间预估模型。取值包括： G -> drivingOptions.departureTime。 H -> departAt
  avoidHighways?: boolean; // 如果设置为 true，则指示路线服务尽可能避开高速公路  G:avoidHighways   H: avoid=[2]
  avoidTolls?: boolean; // 如果为 true，则指示路线服务尽可能避开收费道路 G:avoidTolls  H: avoid=[1]

  /**
   * A 地图特有属性
   */
  // AMap.Driving
  policy?: "LEAST_TIME" | "LEAST_FEE" | "LEAST_DISTANCE" | "REAL_TRAFFIC"; // LEAST_TIME: 最快捷模式     LEAST_FEE:最经济模式     LEAST_DISTANCE: 最短距离模式     REAL_TRAFFIC:考虑实时路况
  extensions?: string; // 默认值：base，返回基本地址信息  当取值为：all，返回DriveStep基本信息+DriveStep详细信息
  // ferry?: number; // 默认为0，表示可以使用轮渡，为1的时候表示不可以使用轮渡
  map?: any; // AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
  panel?: string | HTMLElement; // 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示
  hideMarkers?: boolean; // 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标
  showTraffic?: boolean; // 设置是否显示实时路况信息，默认设置为true。
  province?: string; // 车牌省份的汉字缩写，用于判断是否限行，与number属性组合使用，
  number?: string; // 除省份之外车牌的字母和数字，用于判断限行相关，与province属性组合使用，可选。例如:NH1N11
  isOutline?: boolean; // 使用map属性时，绘制的规划线路是否显示描边 默认 true
  outlineColor?: string; // 使用map属性时，绘制的规划线路的描边颜色。默认为'white'
  autoFitView?: boolean; // 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
  // AMap.Driving().search
  // origin: Array<number> // [lng, lat] 起点
  // destination: Array<number> // [lng, lat] 终点
  opts: {
    // waypoints?: Array<Array<number>>; // [[lng, lat]] 途经点
  };

  /**
   * G 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
  // waypoints?: Array<{
  //   location: { lat: number; lng: number };
  //   stopover: boolean; // 如果为 true，表示此航点是出发地和目的地之间的经停点。这会将路线一分为二。如果为 false，表示路线应偏向于经过此航点，但不拆分为两段。如果您想根据用户在地图上拖动航点的情况创建路线，这非常有用。
  // }>; // 中间路标的数组。系统会通过此数组中的每个航点计算从起点到目的地的路线。
  travelMode: string; // BICYCLING	指定骑车路线请求。  DRIVING	指定行车路线请求。  TRANSIT	指定公交路线指引请求。  WALKING	指定步行路线请求。
  // drivingOptions?: {
  //   departureTime: Date; // 路线的预期出发时间， 出发时间必须设置为当前时间或未来的某个时间。而不能是过去的时间。
  //   trafficModel?: string; // 指定路线类型。 BEST_GUESS（默认值）	使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间。    OPTIMISTIC	使用历史流量数据乐观估算流量时长。    PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计。
  // };
  // avoidFerries?: boolean; // 如果为 true，则指示路线服务尽可能避开轮渡
  // avoidHighways?: boolean; // 如果设置为 true，则指示路线服务尽可能避开高速公路
  // avoidTolls?: boolean; // 如果为 true，则指示路线服务尽可能避开收费道路
  language?: string; // 应返回结果的语言的语言标识符（如果可能）。
  transitOptions?: {
    // 仅适用于 travelMode 为 TRANSIT 的请求的设置。此对象对其他出行方式没有影响。
    arrivalTime?: Date; // 路线的预期到达时间
    departureTime?: Date; // 路线的预期出发时间
    modes?: Array<string>; // 一种或多种首选公共交通方式。BUS	将公交车指定为首选公共交通方式。      RAIL	将铁路指定为首选公共交通方式。      SUBWAY	将地铁指定为首选公共交通方式。      TRAIN	将火车指定为首选公共交通方式。      TRAM	将电车指定为首选公共交通方式。
    routingPreference?: string; // 一种偏好设置，可能会影响公交路线的选择，例如步行路程较短。如果未指定任何偏好设置，API 会返回默认的最佳路线。
  };
  optimizeWaypoints?: boolean; // 如果设置为 true，DirectionsService 将尝试重新排列所提供的中间航点，以最大限度地减少路线的总费用。如果航点经过优化，请检查响应中的 DirectionsRoute.waypoint_order 以确定新的排序。
  provideRouteAlternatives?: boolean; // 是否应提供备选路线
  region?: string; // 用作地址解析请求偏向的区域代码
  unitSystem?: string; // 出发地所使用的单位制。显示距离时要使用的首选单位制。IMPERIAL	：距离应以英制单位表示。 METRIC：距离应以公制单位表示。

  /**
   * H 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
  // waypoints?: Array<{ lat: number; lng: number }>; // 中转点
  // departAt?: number; // 预计出发时间。以自UTC 1970年1月1日午夜以来的秒数为单位。  必须是当前或者未来时间，不能是过去时间。
  // trafficMode?: number; // 时间预估模型。取值包括：  0：best guess。  1：路况差于历史平均水平。  2：路况优于历史平均水平   默认值为0。
  alternatives?: boolean; // 如果设置为true，可以返回多条规划路线结果。 默认值为 false
  viaType?: boolean; // 途径点类型，是via类型还是stopover类型。  false：stopover类型。  true：via类型  默认值为false。
  // optimize?: boolean; // 是否对途径点进行优化。 默认值为 false
  // avoid?: Array<number>; // 表示计算出的路径应避免所指示的特性，取值包括：  1：避免经过收费的公路。  2：避开高速公路。  默认按时间最短返回。
}

```



### 步行规划：routeWalk

#### routeWalk 使用说明

##### routeWalk 方法声明

```typescript
routeWalk(options: IUnifiedRouteWalkOptions): Promise<any>;
```

##### routeWalk 方法参数

```typescript
interface IUnifiedRouteWalkOptions {
  /**
   * 所有地图共有属性
   */
  origin: { lat: number; lng: number }; // 起点 A: origin  G: origin    H: origin
  destination: { lat: number; lng: number }; // 终点 A: destination  G: destination    H: destination

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
}
```

#### 示例代码

```javascript
const initCommonMapOption = {
  center: { lat: 39.90923, lng: 116.397428 },
  zoom: 12,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

const commonRouteOptions = {
  origin: { lat: 39.844818, lng: 116.397933 },
  destination: { lat: 39.878694, lng: 116.440655 },
};

console.log("步行路径规划");
amapMap.routeWalk(commonRouteOptions).then((res) => {
  console.log("amap", res);
});
```

#### 完整参数

```typescript
interface IUnifiedRouteWalkOptions {
  /**
   * 所有地图共有属性
   */
  origin: { lat: number; lng: number }; // 起点 A: origin  G: origin    H: origin
  destination: { lat: number; lng: number }; // 终点 A: destination  G: destination    H: destination

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */

  /**
   * A 地图特有属性
   */
  // AMap.Walking
  map?: any; // AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
  panel?: string | HTMLElement; // 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示
  hideMarkers?: boolean; // 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标
  isOutline?: boolean; // 使用map属性时，绘制的规划线路是否显示描边 默认 true
  outlineColor?: string; // 使用map属性时，绘制的规划线路的描边颜色。默认为'white'
  autoFitView?: boolean; // 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
  // AMap.Walking().search
  // origin: Array<number> // [lng, lat] 起点
  // destination: Array<number> // [lng, lat] 终点

  /**
   * G 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
  waypoints?: Array<{
    location: { lat: number; lng: number };
    stopover: boolean; // 如果为 true，表示此航点是出发地和目的地之间的经停点。这会将路线一分为二。如果为 false，表示路线应偏向于经过此航点，但不拆分为两段。如果您想根据用户在地图上拖动航点的情况创建路线，这非常有用。
  }>; // 中间路标的数组。系统会通过此数组中的每个航点计算从起点到目的地的路线。
  travelMode: string; // BICYCLING	指定骑车路线请求。  DRIVING	指定行车路线请求。  TRANSIT	指定公交路线指引请求。  WALKING	指定步行路线请求。
  drivingOptions?: {
    departureTime: Date; // 路线的预期出发时间， 出发时间必须设置为当前时间或未来的某个时间。而不能是过去的时间。
    trafficModel?: string; // 指定路线类型。 BEST_GUESS（默认值）	使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间。    OPTIMISTIC	使用历史流量数据乐观估算流量时长。    PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计。
  };
  avoidFerries?: boolean; // 如果为 true，则指示路线服务尽可能避开轮渡
  avoidHighways?: boolean; // 如果设置为 true，则指示路线服务尽可能避开高速公路
  avoidTolls?: boolean; // 如果为 true，则指示路线服务尽可能避开收费道路
  language?: string; // 应返回结果的语言的语言标识符（如果可能）。
  transitOptions?: {
    // 仅适用于 travelMode 为 TRANSIT 的请求的设置。此对象对其他出行方式没有影响。
    arrivalTime?: Date; // 路线的预期到达时间
    departureTime?: Date; // 路线的预期出发时间
    modes?: Array<string>; // 一种或多种首选公共交通方式。BUS	将公交车指定为首选公共交通方式。      RAIL	将铁路指定为首选公共交通方式。      SUBWAY	将地铁指定为首选公共交通方式。      TRAIN	将火车指定为首选公共交通方式。      TRAM	将电车指定为首选公共交通方式。
    routingPreference?: string; // 一种偏好设置，可能会影响公交路线的选择，例如步行路程较短。如果未指定任何偏好设置，API 会返回默认的最佳路线。
  };
  optimizeWaypoints?: boolean; // 如果设置为 true，DirectionsService 将尝试重新排列所提供的中间航点，以最大限度地减少路线的总费用。如果航点经过优化，请检查响应中的 DirectionsRoute.waypoint_order 以确定新的排序。
  provideRouteAlternatives?: boolean; // 是否应提供备选路线
  region?: string; // 用作地址解析请求偏向的区域代码
  unitSystem?: string; // 出发地所使用的单位制。显示距离时要使用的首选单位制。IMPERIAL	：距离应以英制单位表示。 METRIC：距离应以公制单位表示。

  /**
   * H 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
}

```



### 骑行规划：routeRide

#### routeRide 使用说明

##### routeRide 方法声明

```typescript
routeRide(options: IUnifiedRouteRideOptions): Promise<any>;
```

##### routeRide 方法参数

```typescript
interface IUnifiedRouteRideOptions {
  /**
   * 所有地图共有属性
   */
  origin: { lat: number; lng: number }; // 起点 A: origin  G: origin    H: origin
  destination: { lat: number; lng: number }; // 终点 A: destination  G: destination    H: destination

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
}
```

#### 示例代码

```javascript
const initCommonMapOption = {
  center: { lat: 39.90923, lng: 116.397428 },
  zoom: 12,
};

const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

const commonRouteOptions = {
  origin: { lat: 39.844818, lng: 116.397933 },
  destination: { lat: 39.878694, lng: 116.440655 },
};

console.log("骑行路径规划");
amapMap.routeRide(commonRouteOptions).then((res) => {
  console.log("amap", res);
});
```

#### 完整参数

```typescript
interface IUnifiedRouteRideOptions {
  /**
   * 所有地图共有属性
   */
  origin: { lat: number; lng: number }; // 起点 A: origin  G: origin    H: origin
  destination: { lat: number; lng: number }; // 终点 A: destination  G: destination    H: destination

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */

  /**
   * A 地图特有属性
   */
  // AMap.Riding
  policy?: number; // 骑行路线规划策略；可选值为：  0：推荐路线及最快路线综合  1：推荐路线  2：最快路线  默认值：0
  map?: any; // AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
  panel?: string | HTMLElement; // 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示
  hideMarkers?: boolean; // 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标
  isOutline?: boolean; // 使用map属性时，绘制的规划线路是否显示描边 默认 true
  outlineColor?: string; // 使用map属性时，绘制的规划线路的描边颜色。默认为'white'
  autoFitView?: boolean; // 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
  // AMap.Riding().search
  // origin: Array<number> // [lng, lat] 起点
  // destination: Array<number> // [lng, lat] 终点

  /**
   * G 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
  waypoints?: Array<{
    location: { lat: number; lng: number };
    stopover: boolean; // 如果为 true，表示此航点是出发地和目的地之间的经停点。这会将路线一分为二。如果为 false，表示路线应偏向于经过此航点，但不拆分为两段。如果您想根据用户在地图上拖动航点的情况创建路线，这非常有用。
  }>; // 中间路标的数组。系统会通过此数组中的每个航点计算从起点到目的地的路线。
  travelMode: string; // BICYCLING	指定骑车路线请求。  DRIVING	指定行车路线请求。  TRANSIT	指定公交路线指引请求。  WALKING	指定步行路线请求。
  drivingOptions?: {
    departureTime: Date; // 路线的预期出发时间， 出发时间必须设置为当前时间或未来的某个时间。而不能是过去的时间。
    trafficModel?: string; // 指定路线类型。 BEST_GUESS（默认值）	使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间。    OPTIMISTIC	使用历史流量数据乐观估算流量时长。    PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计。
  };
  avoidFerries?: boolean; // 如果为 true，则指示路线服务尽可能避开轮渡
  avoidHighways?: boolean; // 如果设置为 true，则指示路线服务尽可能避开高速公路
  avoidTolls?: boolean; // 如果为 true，则指示路线服务尽可能避开收费道路
  language?: string; // 应返回结果的语言的语言标识符（如果可能）。
  transitOptions?: {
    // 仅适用于 travelMode 为 TRANSIT 的请求的设置。此对象对其他出行方式没有影响。
    arrivalTime?: Date; // 路线的预期到达时间
    departureTime?: Date; // 路线的预期出发时间
    modes?: Array<string>; // 一种或多种首选公共交通方式。BUS	将公交车指定为首选公共交通方式。      RAIL	将铁路指定为首选公共交通方式。      SUBWAY	将地铁指定为首选公共交通方式。      TRAIN	将火车指定为首选公共交通方式。      TRAM	将电车指定为首选公共交通方式。
    routingPreference?: string; // 一种偏好设置，可能会影响公交路线的选择，例如步行路程较短。如果未指定任何偏好设置，API 会返回默认的最佳路线。
  };
  optimizeWaypoints?: boolean; // 如果设置为 true，DirectionsService 将尝试重新排列所提供的中间航点，以最大限度地减少路线的总费用。如果航点经过优化，请检查响应中的 DirectionsRoute.waypoint_order 以确定新的排序。
  provideRouteAlternatives?: boolean; // 是否应提供备选路线
  region?: string; // 用作地址解析请求偏向的区域代码
  unitSystem?: string; // 出发地所使用的单位制。显示距离时要使用的首选单位制。IMPERIAL	：距离应以英制单位表示。 METRIC：距离应以公制单位表示。

  /**
   * H 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
}
```



### 轨迹回放（⚠️废弃，请使用 animateTimeBasedPath）

#### 使用说明

##### 方法声明

```typescript
animatePath(options: IPathAnimateOptions): Promise<{
  start(): void;
  stop(): void;
  pause(): void;
  resume(): void;
}>;
```

##### 方法参数

```typescript
interface IPathAnimateOptions {
  path: Array<{ lat: number; lng: number, duration: number }>; // 路径
  strokeColor?: string; // 线条颜色
  strokeWeight?: number; // 线条宽度（单位像素）
  passedStrokeColor?: string; // 已经过路线的线条颜色
  passedStrokeWeight?: number; // 已经过路线的线条宽度（单位像素）
  isAutoPlay?: boolean; // 是否自动播放
  duration?: number; // 毫秒
  /** 图标配置（支持三种格式转换） */
  icon?:
    | string // 直接使用图片 URL
    | {
        url: string; // google:创建HTMLElement 传给content.glyph, huawei:icon.url, amap:icon.image
        size?: [number, number]; // 宽高，google:创建HTMLElement 传给content.glyph, huawei:icon.scale(要将传入的参数转换成 0-1 的 scale), amap:icon.size
      };
}
```

#### 示例代码

```javascript
const initCommonMapOption = {
  // center: { lat: 39.865042, lng: 116.379028 },
  center: { lat: 39.997761, lng: 116.478935 },
  zoom: 17,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  // version: "2.0",
  ...initCommonMapOption,
});

const path = [
  { lat: 39.997761, lng: 116.478935 },
  { lat: 39.997825, lng: 116.478939 },
  { lat: 39.998549, lng: 116.478912 },
  { lat: 39.998555, lng: 116.478998 },
  { lat: 39.99856, lng: 116.479282 },
  { lat: 39.998528, lng: 116.479658 },
  { lat: 39.998453, lng: 116.480151 },
  { lat: 39.998302, lng: 116.480784 },
  { lat: 39.998184, lng: 116.481149 },
  { lat: 39.997997, lng: 116.481573 },
  { lat: 39.997846, lng: 116.481863 },
  { lat: 39.997718, lng: 116.482072 },
  { lat: 39.997718, lng: 116.482362 },
  { lat: 39.998935, lng: 116.483633 },
  { lat: 39.998968, lng: 116.48367 },
  { lat: 39.999861, lng: 116.484648 },
];
const res = await amapMap.animatePath({
  path,
  duration: 5000,
  isAutoPlay: false,
});
console.log(res);
res.start();
setTimeout(() => {
  console.log("暂停");
  res.pause();
  setTimeout(() => {
    console.log("继续");
    res.resume();
    setTimeout(() => {
      console.log("重置");
      res.reset();
      setTimeout(() => {
        console.log("重新开始");
        res.start();
      }, 2000);
    }, 2000);
  }, 2000);
}, 2000);
```

## 坐标转换

<font color="red">注意：**坐标转换陷阱**</font>

- **精度丢失**：多次转换（如 WGS84 → EPSG:3857 → WGS84）可能导致微小误差。

- **投影限制**：EPSG:3857 在高纬度地区（如北极）会严重变形，不适合极地计算。

### 经纬度转平面地图像素点：lnglatToPixel

#### lnglatToPixel 使用说明

平面地图像素点

- 表示某个地理点在当前 `zoom` 级别下，在整张世界地图中的**像素位置**。
- 原点在左上角（经纬度为 -180°、85.0511°）。
- 范围取决于 zoom：
  - 每增加一级 zoom，坐标范围扩大 2 倍。
  - 在 zoom=0，世界大小是 256×256 像素；
  - 在 zoom=1，是 512×512 像素；
  - 以此类推：worldSize = `TILE_SIZE × 2^zoom`

与 `zoom` 级别**密切相关**，用于绘制地图瓦片、计算 tile 编号等。

##### 方法声明

```typescript
lnglatToPixel(options: ILnglatToPixelOptions): {
  x: number;
  y: number;
};
```

#### 示例代码

```javascript
const initCommonMapOption = {
  // center: { lat: 39.865042, lng: 116.379028 },
  center: { lat: 39.90923, lng: 116.397428 },
  zoom: 12,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

const lnglatToPixelOptions = {
  position: { lat: 41.85, lng: -87.65 },
  zoom: 3,
};
console.log("经纬度转平面地图像素");
console.log("amap", amapMap.lnglatToPixel(lnglatToPixelOptions));
```



### 平面地图像素点转经纬度：pixelToLngLat

#### pixelToLngLat 使用说明

##### 方法声明

```typescript
pixelToLngLat(options: IPixelToLnglatOptions): {
  lat: number;
  lng: number;
};
```

#### 示例代码

```javascript
const initCommonMapOption = {
  // center: { lat: 39.865042, lng: 116.379028 },
  center: { lat: 39.90923, lng: 116.397428 },
  zoom: 12,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

const pixelToLnglatOptions = {
  pixel: { x: 525, y: 761 },
  zoom: 3,
};

console.log("平面地图像素转经纬度");
console.log("amap", amapMap.pixelToLngLat(pixelToLnglatOptions));
```

### WGS84经纬度转3857投影：wgs84ToWebMercator

#### wgs84ToWebMercator 使用说明

**WGS84（World Geodetic System 1984）**

- **定义**：
  全球地理坐标系，使用经纬度（Latitude/Longitude）表示位置，单位为度（°）。地球是一个椭球体模型，WGS84 是 GPS 使用的标准坐标系。
- 应用场景
  - 存储和传输地理位置数据（如 GPS 采集的坐标）
  - 在代码中初始化地图的中心点（如 `{ lat: 39.90923, lng: 116.397428 }`）

**EPSG:3857（Web Mercator 投影）**

- 是一种将地球表面投影到二维平面的投影方式。
- 原点在地球中心 (0,0)，单位是**米**。
- 范围约为：
  - X：-20026376 到 20026376 米（东西方向）
  - Y：-20048966 到 20048966 米（南北方向）

与 `zoom` 缩放级别**无关**。它只是一个静态投影坐标系，用于地理数据计算、空间分析等。

##### 方法声明

```typescript
wgs84ToWebMercator(lng: number, lat: number): { x: number; y: number };
```

#### 示例代码

```javascript
const initCommonMapOption = {
  // center: { lat: 39.865042, lng: 116.379028 },
  center: { lat: 39.90923, lng: 116.397428 },
  zoom: 12,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

console.log("wgs84 -> EPSG:3857  WGS84经纬度转3857投影");
console.log(
  "amap",
  amapMap.wgs84ToWebMercator(116.442581, 39.882498)
);
```

### 3857投影转WGS84经纬度：webMercatorToWgs84

#### webMercatorToWgs84 使用说明

##### 方法声明

```typescript
webMercatorToWgs84(x: number, y: number): { lng: number; lat: number };
```

#### 示例代码

```javascript
const initCommonMapOption = {
  center: { lat: 39.90923, lng: 116.397428 },
  zoom: 12,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  ...initCommonMapOption,
});

console.log("EPSGEPSG:3857 -> wgs84  3857投影经纬度转WGS84经纬度");
console.log(
  "amap",
  amapMap.webMercatorToWgs84(12962328.823574513, 4848881.871897727)
)
```

## 控件相关

### 信息弹窗

#### 创建信息弹窗对象：createInfoWindow、createInfoWindowSync

##### 方法声明

```typescript
createInfoWindow(options: IInfoWindowOptions): Promise<any>;
createInfoWindowSync(options: IInfoWindowOptions): any;
```

##### 方法参数
```typescript
interface IInfoWindowOptions {
  /**
   * map-kit 属性
   */
  // 是否自动打开 默认值为true
  isAutoOpen?: boolean;

  /**
   * 所有地图共有属性
   */
  // 弹出框中的显示内容，可以是纯文本或者是HTML元素。  A: content    G: content   H: content
  content?: string | HTMLElement;
  // 设置x，y偏移量。默认位置是position指定的位置。 A: offset    G: pixelOffset   H: offset
  offset?: [number, number];
  // 弹出框显示的位置。 A: [lng, lat]    G: { lng: number; lat: number }   H: { lng: number; lat: number }
  position: { lng: number; lat: number };
  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */

  /**
   * A 地图特有属性
   */
  // 显示内容，可以是HTML要素字符串或者HTMLElement对象,
  // content: string | HTMLElement;
  // 信息窗体显示位置偏移量。默认基准点为信息窗体的底部中心。默认值: [0, 0]
  // offset?: [number, number];
  // 信息窗体显示基点位置 [lng, lat]
  // position: [number, number];
  // 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
  isCustom?: boolean;
  // 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
  autoMove?: boolean;
  // autoMove 为 true 时，自动平移到视野内后的上右下左的避让宽度。默认值： [20, 20, 20, 20]
  avoid?: Array<number>;
  // 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
  closeWhenClickMap?: boolean;
  //  信息窗体尺寸（isCustom为true时，该属性无效） [width, height]
  size?: [number, number];
  // 信息窗体锚点。默认值：'bottom-center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
  anchor?: string;

  /**
   * G 地图特有属性
   */
  // 要在 InfoWindow 中显示的内容。这可以是 HTML 元素、纯文本字符串或包含 HTML 的字符串。InfoWindow 的大小将根据内容而定。要设置内容的具体大小，请将内容设置为相应大小的 HTML 元素。
  // content: string | HTMLElement;
  // 信息窗口尖端相对于地图上信息窗口锚定地理坐标的点的偏移量（以像素为单位）。如果使用锚点打开 InfoWindow，系统会根据锚点的 anchorPoint 属性计算 pixelOffset。
  // pixelOffset?: [number, number];
  // 弹出框显示的位置。
  // position: { lng: number; lat: number };
  // 要分配给 InfoWindow 的 AriaLabel。
  ariaLabel?: string;
  // 停用平移地图，以便在 InfoWindow 打开时使其完全可见。 默认 false
  disableAutoPan?: boolean;
  // 要在 InfoWindow 标题行中显示的内容。这可以是 HTML 元素，也可以是纯文本字符串。InfoWindow 的大小将根据内容而定。如需为标题内容设置显式大小，请将 headerContent 设置为具有该大小的 HTML 元素。
  headerContent?: string | HTMLElement;
  // 停用 InfoWindow 中的整个标题行。设置为 true 后，系统会移除标题，以隐藏标题内容和关闭按钮。
  headerDisabled?: boolean;
  // InfoWindow 的最大宽度，不考虑内容的宽度。只有在调用 open() 之前设置此值时，系统才会考虑此值。如需在更改内容时更改最大宽度，请依次调用 close()、setOptions() 和 open()。
  maxWidth?: number;
  // InfoWindow 的宽度下限，不考虑内容的宽度。使用此属性时，强烈建议将 minWidth 设置为小于地图宽度（以像素为单位）的值。只有在调用 open() 之前设置此值时，系统才会考虑此值。如需在更改内容时更改最小宽度，请依次调用 close()、setOptions() 和 open()。
  minWidth?: number;
  // 所有 InfoWindow 都会按照 zIndex 的顺序显示在地图上，值越高，显示位置就越靠前。默认情况下，InfoWindow 会按其纬度显示，纬度较低的 InfoWindow 会显示在纬度较高的 InfoWindow 前面。信息窗口始终在标记前面显示。
  zIndex?: number;

  /**
   * H 地图特有属性
   */
  // 弹出框中的显示内容，可以是纯文本或者是HTML元素。窗口会根据内容自动调整大小。调用该接口需要注意跨站脚本攻击，SDK没有过滤有可能导致跨站脚本攻击的html代码，因为SDK无法区分是否为您主动使用。
  // content?: string | HTMLElement;
  // 设置x，y偏移量。默认位置是position指定的位置。
  // offset?: [number, number];
  // 弹出框显示的位置。
  // position: { lng: number; lat: number };
  // 地图实例
  map: any;
}
```

#### 打开信息弹窗：openInfoWindow

1. `infoWindow`为 `createInfoWindow` 创建的弹窗对象
2. `marker`参数支持 华为地图和 google 地图，可以在某一个标记上打开弹窗，高德地图通过设置`position`, `offset`也可以达到在某一个 `marker`打开弹窗的效果
##### 方法声明

```typescript
openInfoWindow(infoWindow: any， marker: any): void;
```

#### 关闭信息弹窗
##### 方法声明
```typescript
closeInfoWindow(infoWindow: any): void;
```

#### 示例代码

```javascript
const initCommonMapOption = {
  center: { lat: 40.024995, lng: 116.438064 },
  zoom: 13,
};
const amapMap = await init({
  container: document.getElementById("amap-map"),
  mapProvider: "amap",
  apiKey: YOUR_AMAP_API_KEY,
  securityJsCode: YOUR_AMAP_JSSECRET_KEY,
  // version: "2.0",
  ...initCommonMapOption,
});
const infoDiv = document.createElement("div");
infoDiv.style.cssText = `
      background-color: #4285f4;
      border: 2px solid #fff;
      color: white;
      font-weight: bold;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      font-size: 14px;
    `;
infoDiv.innerHTML = "测试文本";
const infoWindowOptions = {
  position: { lat: 40.024995, lng: 116.438064 },
  content: "测试文本 ",
  // content: infoDiv,
  offset: [0, -40],
  isAutoOpen: false,
};

const commonOptions = {
  position: { lat: 40.024995, lng: 116.438064 },
  zIndex: 10,
  draggable: false,
  title: "test",
  label: {
    color: "red",
    content: "cs",
    fontSize: "20px",
  },
  icon: "../src/assets/images/location-icon.png",
};

const amapMarker = await amapMap.addMarker({
  ...commonOptions,
});
const amapObj = await amapMap.createInfoWindow(infoWindowOptions);
amapMap.openInfoWindow(amapObj, amapMarker);
```