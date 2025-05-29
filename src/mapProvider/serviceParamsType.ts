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
