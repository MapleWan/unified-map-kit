/**
 * 约定：A 表示 高德地图，G 表示 google 地图，H 表示 华为地图
 */

export interface IUnifiedMapMarkerOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例
  position: { lat: number; lng: number }; // 坐标位置，google:position, huawei:position, amap:[position.lng, position.lat]
  zIndex?: number; // 层级高度（默认由地图实现决定）
  draggable?: boolean; // 是否可拖拽（默认 false），google:gmpDraggable, huawei:draggable, amap:draggable

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

export interface IUnifiedPolylineOptions {
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

export interface IUnifiedPolygonOptions {
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

export interface IUnifiedCircleOptions {
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

export interface IUnifiedRectangleOptions {
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

export interface IUnifiedSearchByKeywordOptions {
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

  /**
   * A 地图特有属性
   */
  // keyword?: string; // 关键字
  // type?: string; // POI 类型
  // pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  // pageIndex?: number; // 页码 取值范围：1-100，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi
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
  // language?: string; // 地点详情将以首选语言（如果有）显示。将默认采用浏览器的语言偏好设置
  // location?: string; // 用于在搜索地点时偏向结果的区域中心。
  // query?: string; // 搜索关键字
  // radius?: number; // 用于在搜索地点时自定义调整结果的区域的半径，以米为单位。
  // type?: string; // 搜索指定类型的地点。
  region?: string; // 于使结果偏向于某个区域的区域代码
  bounds?: any; // LatLngBounds | LatLngBoundsLiteral。用于在搜索地点时偏向结果的边界（可选）。如果设置了 bounds，系统会忽略 location 和 radius。结果不会仅限于这些边界内，但这些边界内的结果排名会更高。

  // textQuery: string; // 搜索关键字
  // locationBias?: { lat: number; lng: number } | any; // 搜索结果偏向的经纬度
  // language?: string; // 地点详情将以首选语言（如果有）显示。将默认采用浏览器的语言偏好设置
  // includedType?: string; // 请求的地点类型。支持的类型的完整列表：https://developers.google.com/maps/documentation/places/web-service/place-types。

  /**
   * H 地图特有属性
   */
  // language?: string; // 搜索建议的语种，如果不指定语种，返回地点的当地语言。
  // location?: { lat: number; lng: number }; // 搜索建议偏向的经纬度
  // poiType?: string; // 返回指定POI类型的地点。
  // pageIndex?: number; // 当前页数。取值范围：[1, 60]，默认1。约束：pageindex*pagesize <= 60。
  // pageSize?: number; // 每页返回的记录数。取值范围：[1, 20]，默认20。
  // query?: string; // 搜索建议的关键词。
  radius?: number; // 搜索建议的半径，单位：米
  countries?: Array<String>; // 多个国家码，采用ISO 3166-1 alpha-2规范的2位国家码。
  countryCode?: string; // 在指定的国家内搜索，采用ISO 3166-1 alpha-2规范的2位国家码。
}

export interface IUnifiedSearchNearbyOptions {
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

export interface IUnifiedPlaceResults {
  name: string; // 名称
  formatAddress: string; // 详细 地址
  position: { lat: number; lng: number }; // 经纬度
  sourceResult: any; // 原生返回结果
}

export interface IUnifiedGeocodeOptions {
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

export interface IUnifiedReverseGeocodeOptions {
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

export interface IUnifiedRouteDriveOptions {
  /**
   * 所有地图共有属性
   */
  origin: { lat: number; lng: number }; // 起点 A: origin  G: origin    H: origin
  destination: { lat: number; lng: number }; // 终点 A: destination  G: destination    H: destination
  waypoints?: Array<{ lat: number; lng: number }>; // 中转点 A: opts.waypoints  G: waypoints H: waypoints

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

export interface IUnifiedRouteWalkOptions {
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
export interface IUnifiedRouteRideOptions {
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
