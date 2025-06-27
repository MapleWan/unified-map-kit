/**
 * 约定：A 表示 高德地图，G 表示 google 地图，H 表示 华为地图
 */

export interface IUnifiedMapMarkerOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例
  // 坐标位置，google:position, huawei:position, amap:[position.lng, position.lat]
  position: { lat: number; lng: number };
  // 层级高度（默认由地图实现决定）
  zIndex?: number;
  // 是否可拖拽（默认 false），google:gmpDraggable, huawei:draggable, amap:draggable
  draggable?: boolean;

  // ----------- 跨平台兼容设计属性 -----------
  /** 图标配置（支持三种格式转换） */
  icon?: // 直接使用图片 URL
  | string
    | {
        // google:创建HTMLElement 传给content.glyph, huawei:icon.url, amap:icon.image
        url: string;
        // 宽高，google:创建HTMLElement 传给content.glyph, huawei:icon.scale(要将传入的参数转换成 0-1 的 scale), amap:icon.size
        size?: [number, number];
      };

  /** 标记的文本描述 */
  label?: {
    // google:content.glyph<string, HTMLElement>, huawei:label.text<string>, amap:content<string, HTMLElement>
    content: string | HTMLElement;
    // 设置字体大小
    fontSize?: string;
    // 字体颜色
    color?: string;
  };
  /**
   * AG 地图共有属性
   */
  // 鼠标悬停标题（google:title, huawei 不支持, amap:title）
  title?: string;

  /**
   * AH 地图共有属性
   */
  // 自定义数据 google 不支持, huawei:properties, amap:extData
  customData?: any;

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
  // 标记是否显示
  visible?: boolean;
  // 锚点偏移量
  offset?: Array<number>;
  // 锚点位置
  anchor?: string | Array<number>;
  // 旋转角度
  angle?: number;
  // 是否可点击
  clickable?: boolean;
  // 事件是否冒泡
  bubble?: boolean;
  // 点标记层级范围
  zooms?: Array<number>;
  // 鼠标样式
  cursor?: string;
  // 点击时是否置顶
  topWhenClick?: boolean;
  // 设置Marker点是否离地绘制，默认值为0，等于0时贴地绘制。大于0时离地绘制，此时Marker点高度等于height值加Marker点高程值（JSAPI v2.1新增属性目前只适用于v2.1版本）。
  height?: number;
  // 用户自定义属性
  extData?: any;

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
  // 碰撞处理方式
  collisionBehavior?:
    | "OPTIONAL_AND_HIDES_LOWER_PRIORITY"
    | "REQUIRED"
    | "REQUIRED_AND_HIDES_OPTIONAL";

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
  // 标记点进入动画
  animation?: "DROP" | "BOUNCE" | null;
}

export interface IUnifiedMarkerClusterOptions {
  // 点，weight属性只适用于高德地图,
  points: Array<{
    weight?: number;
    lng: number;
    lat: number;
    markerOptions?: {
      /** 图标配置 */
      icon?:
        | string
        | {
            url: string;
            size?: [number, number];
          };

      /** 标记的文本描述 */
      label?: {
        content: string | HTMLElement;
        fontSize?: string;
        color?: string;
      };
    };
  }>;

  /** 自定义聚合点和非聚合点的样式 */
  // 非聚合点图标配置
  singlePointIcon?: // 直接使用图片 URL
  | string
    | {
        // google:创建HTMLElement 传给content.glyph, huawei:icon.url, amap:icon.image
        url: string;
        // 宽高，google:创建HTMLElement 传给content.glyph, huawei:icon.scale(要将传入的参数转换成 0-1 的 scale), amap:icon.size
        size?: [number, number];
      };
  // 非聚合点文本配置
  singlePointLabel?: {
    // google:content.glyph<string, HTMLElement>, huawei:label.text<string>, amap:content<string, HTMLElement>
    content: string | HTMLElement;
    // 设置字体大小
    fontSize?: string;
    // 字体颜色
    color?: string;
  };
  // 聚合点图标配置
  clusterPointIcon?:
    | string
    | {
        url: string;
        size?: [number, number];
      };
  // 聚合点文本配置
  clusterPointLabel?: {
    content: string | HTMLElement;
    fontSize?: string;
    color?: string;
  };
  // 聚合点分层样式, 必须按升序排列 clusterPointIntervalList[0]
  clusterPointIntervalList?: Array<{
    // 此分段最大支持的点数量，包含 maxNumber 数，区间为左开右闭
    maxNumber: number;
    // 聚合点图标配置
    clusterPointIcon?:
      | string
      | {
          url: string;
          size?: [number, number];
        };
    // 聚合点文本配置
    clusterPointLabel?: {
      content: string | HTMLElement;
      fontSize?: string;
      color?: string;
    };
  }>;

  /**
   * A
   */
  // 自定义聚合点样式渲染函数
  amapClusterRendererFunc?: (obj: any) => any;
  /**
   * G
   */
  // 自定义聚合点样式渲染函数
  googleClusterRendererFunc?: (obj: any) => any;
  /**
   * H
   */
  // 自定义聚合点样式渲染函数
  huaweiClusterRendererFunc?: (obj: any) => any;
}

export interface IUnifiedPolylineOptions {
  /**
   * 所有地图共有属性
   */
  //   map?: any; // 地图实例（可选）
  // 路径坐标集合。google: path, huawei: path, amap: path<Array<Array<number>>>
  path: Array<{ lat: number; lng: number }>;
  // 层级高度（默认由地图实现决定）
  zIndex?: number;
  // 线条颜色
  strokeColor?: string;
  // 线条宽度（单位像素）
  strokeWeight?: number;
  // 虚线样式（需要平台转换逻辑）。华为: strokeLineDash / AMap: strokeDasharray / Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素
  strokeLineDash?: Array<number>;

  /**
   * AG 地图共有属性
   */
  // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  strokeOpacity?: number;
  // 是否可拖动 默认 false
  draggable?: boolean;
  // 折线是否是大地曲线，默认为false
  geodesic?: boolean;

  /**
   * AH 地图共有属性
   */
  // 是否显示方向箭头（默认 false）、华为: showDir / AMap: showDir / Google 无原生支持
  showDirection?: boolean;

  /**
   * GH 地图共有属性
   */
  // 折线是否可见
  visible?: boolean;

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
  // 是否将覆盖物的鼠标或 touch 事件冒泡至地图
  bubble?: boolean;
  // 鼠标悬停时的鼠标样式
  cursor?: string;
  // 是否显示描边
  isOutline?: boolean;
  // 描边宽度 px 默认 1
  borderWeight?: number;
  // 描边颜色
  outlineColor?: string;
  // 离地绘制的高度
  height?: number;
  // 自定义属性
  extData?: any;
  // 线样式 solid | dashed
  strokeStyle?: string;
  // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效。虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
  strokeDasharray?: Array<number>;
  // 折线拐点的绘制样式，可以是： round | bevel | miter,  圆角｜斜角｜尖角（默认）
  lineJoin?: string;
  // 折线两端线帽的绘制样式，可以是： butt | round | square,   无头(默认)｜圆头｜方头
  lineCap?: string;

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
  // 折线是否可点击
  clickable?: boolean;
  // 是否可通过控制点编辑折线
  editable?: boolean;
  // 沿多段线渲染的图标
  icons?: Array<any>;

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
  // 路径坐标集合。google: paths, huawei: paths, amap: path
  path:
    | Array<{ lat: number; lng: number }>
    | Array<Array<{ lat: number; lng: number }>>;

  // 层级高度（默认由地图实现决定）
  zIndex?: number;
  // 线条颜色
  strokeColor?: string;
  // 线条宽度（单位像素）
  strokeWeight?: number;
  // 填充颜色
  fillColor?: string;

  /**
   * AG 地图共有属性
   */
  // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  strokeOpacity?: number;
  // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  fillOpacity?: number;
  // 是否可拖动 默认 false
  draggable?: boolean;
  // 折线是否是大地曲线，默认为false
  geodesic?: boolean;

  /**
   * AH 地图共有属性
   */
  // 是否显示方向箭头（默认 false）、华为: showDir / AMap: showDir / Google 无原生支持
  showDirection?: boolean;
  // 虚线样式（需要平台转换逻辑）。华为: strokeLineDash / AMap: strokeDasharray / Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素
  strokeLineDash?: Array<number>;

  /**
   * GH 地图共有属性
   */
  // 折线是否可见
  visible?: boolean;

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
  // 是否将覆盖物的鼠标或 touch 事件冒泡至地图
  bubble?: boolean;
  // 鼠标悬停时的鼠标样式
  cursor?: string;
  // 离地绘制的高度
  height?: number;
  // 多边形是否拉伸为的立面体高度值，默认值为0
  extrusionHeight?: number;
  // 立面体侧面的颜色
  wallColor?: string;
  // 立面体顶面颜色
  roofColor?: string;
  // 自定义属性
  extData?: any;
  // 线样式 solid | dashed
  strokeStyle?: string;
  // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效。虚线： [10,10] ， [10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
  strokeDasharray?: Array<number>;

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
  // 是否可点击
  clickable?: boolean;
  // 是否可通过控制点编辑折线
  editable?: boolean;

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
  // 圆中心 google: paths, huawei: paths, amap: path
  center: { lat: number; lng: number };
  // 层级高度（默认由地图实现决定）
  zIndex?: number;
  // 圆半径 单位为米
  radius: number;
  // 线条颜色
  strokeColor?: string;
  // 线条宽度（单位像素）Google: 通过 icons 实现，取数组第一个值设置虚线间隔像素
  strokeWeight?: number;
  // 填充颜色
  fillColor?: string;

  /**
   * AG 地图共有属性
   */
  // 线条透明度（0-1，默认 1）、AMap/Google 原生支持，华为需通过颜色透明度实现
  strokeOpacity?: number;
  // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  fillOpacity?: number;
  // 是否可拖动 默认 false
  draggable?: boolean;

  /**
   * AH 地图共有属性
   */
  // 华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持
  strokeLineDash?: Array<number>;

  /**
   * GH 地图共有属性
   */
  // 是否可见
  visible?: boolean;

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
  // 事件是否冒泡至地图
  bubble?: boolean;
  // 鼠标悬停时的鼠标样式
  cursor?: string;
  // 离地绘制高度
  height?: number;
  // 自定义数据属性
  extData?: any;
  // 圆形边框样式 dashed solid
  strokeStyle?: string;
  // 圆形边框虚线样式
  strokeDasharray?: Array<number>;

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
  // 是否可点击
  clickable?: boolean;
  // 是否可编辑
  editable?: boolean;

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
  // 地图实例（可选）
  map?: any;
  /**
   * 坐标范围
   * // google: paths, huawei: paths, amap: path
   * */
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  //  层级高度（默认由地图实现决定）
  zIndex?: number;
  // 填充颜色
  fillColor?: string;
  /** 线条颜色 */
  strokeColor?: string;
  /** 线条宽度（单位像素） */
  strokeWeight?: number;

  /**
   * AG 地图共有属性
   */
  // 线条透明度（0-1，默认 1）。AMap/Google 原生支持，华为需通过颜色透明度实现
  strokeOpacity?: number;
  // 填充透明度  Google、AMap原生支持，华为不支持，需通过颜色透明度设置
  fillOpacity?: number;

  /**
   * AH 地图共有属性
   */
  // 虚线样式（需要平台转换逻辑）。  华为: strokeLineDash / AMap: strokeDasharray / Google: 不支持
  strokeLineDash?: Array<number>;

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
  // 事件是否冒泡到地图上
  bubble?: boolean;
  // 鼠标移入时的鼠标样式
  cursor?: string;
  // 离地高度
  height?: number;
  // 用户自定义属性
  extData?: any;
  // 边框样式
  strokeStyle?: "solid" | "dashed";
  // 虚线样式
  strokeDasharray?: number[];

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
  // 是否响应点击事件
  clickable?: boolean;
  // 是否可拖拽
  draggable?: boolean;
  // 是否可编辑
  editable?: boolean;

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
  // 搜索关键字 huawei: query / AMap: keyword / Google: query
  query?: string;
  // 指定POI类型 huawei: poiType / AMap: type / Google: type
  poiType?: string;

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */
  // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  pageSize?: number;
  // 页码 取值范围：1-20，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi
  pageIndex?: number;

  /**
   * GH 地图共有属性
   */
  // 搜索结果偏向的经纬度 huawei: location / AMap：不支持 / Google: location
  location?: { lat: number; lng: number };
  // 搜索结果的语种。如果不指定语种，使用地点的当地语言。 huawei: language / AMap: 不支持 / Google: language
  language?: string;

  /**
   * A 地图特有属性
   */
  // keyword?: string; // 关键字
  // type?: string; // POI 类型
  // pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  // pageIndex?: number; // 页码 取值范围：1-100，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi
  // 城市名 citycode
  city?: string;
  // 是否限制city 范围搜索
  citylimit?: boolean;
  // 此项默认值：base，返回基本地址信息  取值：all，返回基本+详细信息
  extensions?: string;
  // 地图实例
  map?: any;
  // 结果列表的HTML容器或对应id
  panel?: string | HTMLElement;
  // 是否在地图上显示周边搜索范围
  showCover?: boolean;
  // 结果渲染样式  如使用了map或panel属性，renderStyle可以用来设定绘制的UI风格，缺省为'newpc'。可选值:'newpc'或'default'，'newpc'为带图片展示的新样式，'default'为原有简单样式。
  renderStyle?: string;
  // 是用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围
  autoFitView?: boolean;

  /**
   * G 地图特有属性
   */
  // language?: string; // 地点详情将以首选语言（如果有）显示。将默认采用浏览器的语言偏好设置
  // location?: string; // 用于在搜索地点时偏向结果的区域中心。
  // query?: string; // 搜索关键字
  // radius?: number; // 用于在搜索地点时自定义调整结果的区域的半径，以米为单位。
  // type?: string; // 搜索指定类型的地点。
  // 于使结果偏向于某个区域的区域代码
  region?: string;
  // LatLngBounds | LatLngBoundsLiteral。用于在搜索地点时偏向结果的边界（可选）。如果设置了 bounds，系统会忽略 location 和 radius。结果不会仅限于这些边界内，但这些边界内的结果排名会更高。
  bounds?: any;

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
  // 搜索建议的半径，单位：米
  radius?: number;
  // 多个国家码，采用ISO 3166-1 alpha-2规范的2位国家码。
  countries?: Array<String>;
  // 在指定的国家内搜索，采用ISO 3166-1 alpha-2规范的2位国家码。
  countryCode?: string;
}

export interface IUnifiedSearchNearbyOptions {
  /**
   * 所有地图共有属性
   */
  // 搜索关键字 huawei: query / AMap: keyword / Google: keyword
  query?: string;
  // 当前的位置 huawei: location / AMap: center / Google: location
  location?: { lat: number; lng: number };
  // 搜索半径，单位：米。 huawei: radius / AMap: radius / Google: radius
  radius?: number;
  // 指定POI类型 huawei: poiType / AMap: type / Google: type
  poiType?: string;

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */
  // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  pageSize?: number;
  // 页码 取值范围：1-20，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi
  pageIndex?: number;

  /**
   * GH 地图共有属性
   */
  // 搜索结果的语种。如果不指定语种，使用地点的当地语言。 huawei: language / AMap: 不支持 / Google: language
  language?: string;

  /**
   * A 地图特有属性
   */
  // keyword: string; // 关键字
  // center: Array<number>; //[lng, lat] 中心点经纬度
  // radius?: number; // 半径
  // pageSize?: number; // 每页结果数 取值范围：1-50，超出取值范围按最大值返回 默认 10
  // pageIndex?: number; // 页码 取值范围：1-100，超出取值范围按最大值返回 默认 1 超过实际页数不返回poi
  // type?: string; // POI 类型
  // 城市名 citycode
  city?: string;
  // 是否限制city 范围搜索
  citylimit?: boolean;
  // 此项默认值：base，返回基本地址信息  取值：all，返回基本+详细信息
  extensions?: string;
  // 地图实例
  map?: any;
  // 结果列表的HTML容器或对应id
  panel?: string | HTMLElement;
  // 是否在地图上显示周边搜索范围
  showCover?: boolean;
  // 结果渲染样式  如使用了map或panel属性，renderStyle可以用来设定绘制的UI风格，缺省为'newpc'。可选值:'newpc'或'default'，'newpc'为带图片展示的新样式，'default'为原有简单样式。
  renderStyle?: string;
  // 是用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围
  autoFitView?: boolean;

  /**
   * G 地图特有属性
   */
  // keyword?: string; // 搜索关键字
  // radius?: number; // 用于在搜索地点时自定义调整结果的区域的半径，以米为单位。
  // language?: string; // 地点详情将以首选语言（如果有）显示。将默认采用浏览器的语言偏好设置
  // location?: string; // 用于在搜索地点时偏向结果的区域中心。
  // type?: string; // 搜索指定类型的地点。
  // LatLngBounds | LatLngBoundsLiteral。用于在搜索地点时偏向结果的边界（可选）。如果设置了 bounds，系统会忽略 location 和 radius。结果不会仅限于这些边界内，但这些边界内的结果排名会更高。
  bounds?: any;
  // 将结果限制为仅包含指定价位或更低价位的地点。有效值范围介于 0（最实惠）和 4（最昂贵）之间，包括 0 和 4。必须大于或等于 minPrice （如果指定）。
  maxPriceLevel?: number;
  // 将结果限制为仅包含指定价位或更高价位的地点。有效值范围介于 0（最实惠）和 4（最昂贵）之间，包括 0 和 4。必须小于或等于 maxPrice（如果指定）。
  minPriceLevel?: number;
  // 将结果限制为仅包含在指定时间开放或始终开放的地点。
  openNow?: boolean;
  // DISTANCE: 根据与地点的距离对地点搜索结果进行排名。PROMINENCE:按地点知名度对地点结果进行排名
  rankBy?: string;

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
  // 名称
  name: string;
  // 详细地址
  formatAddress: string;
  // 经纬度
  position: { lat: number; lng: number };
  // 原生返回结果
  sourceResult: any;
}

export interface IUnifiedGeocodeOptions {
  /**
   * 所有地图共有属性
   */
  // 详细地址
  address?: string;
  // 搜索结果的语种。如果不指定语种，返回地点的当地语言。 huawei: language / AMap: lang / Google: language
  language?: string;

  /**
   * AG 地图共有属性
   */

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  // 	LatLngBounds。查询结果偏向的搜索范围。
  bounds?: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };

  /**
   * A 地图特有属性
   */
  // AMap.Geocoder构造方法
  // lang?: string; // 设置语言
  // 城市，地理编码时，设置地址描述所在城市。可选值：城市名（中文或中文全拼）、citycode、adcode；默认值：“全国”
  city?: string;
  // 搜索范围，默认1000米。取值范围：0-3000，单位：米。
  radius?: number;
  // 是否批量查询
  batch?: boolean;
  // 逆地理编码时，返回信息的详略。默认值：base，返回基本地址信息；取值为：all，返回地址信息及附近poi、道路、道路交叉口等信息
  extensions?: string;
  // AMap.Geocoder.getLocation
  // address: string

  /**
   * G 地图特有属性
   */
  // address?: string; // 地址信息 必须提供 address、location 和 placeId 中的一个，且只能提供一个。
  // bounds?: any; //   LatLngBounds|LatLngBoundsLiteral.要在其中进行搜索的 LatLngBounds。
  // language?: string; // 应返回结果的语言的语言标识符（如果可能)
  // 	GeocoderComponentRestrictions。组成部分用于将结果限制在特定区域内。
  componentRestrictions?: any;
  // 要进行地理编码的 LatLng。
  location?: { lat: number; lng: number };
  // 与营业地点相关联的地点 ID。地点 ID 可唯一标识 Google Places 数据库中和 Google 地图上的地点。
  placeId?: string;
  // 用于偏向搜索的国家/地区代码，
  region?: string;

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
  // 当前的位置 huawei: location / AMap: location / Google: location
  location: { lat: number; lng: number };
  // 搜索结果的语种。如果不指定语种，返回地点的当地语言。 huawei: language / AMap: lang / Google: language
  language?: string;
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
  // 城市，地理编码时，设置地址描述所在城市。可选值：城市名（中文或中文全拼）、citycode、adcode；默认值：“全国”
  city?: string;
  // 搜索范围，默认1000米。取值范围：0-3000，单位：米。
  radius?: number;
  // 是否批量查询
  batch?: boolean;
  // 逆地理编码时，返回信息的详略。默认值：base，返回基本地址信息；取值为：all，返回地址信息及附近poi、道路、道路交叉口等信息
  extensions?: string;
  // AMap.Geocoder.getAddress
  // location: Array<number>; // [lat,lng] 经纬度，要进行地理编码的 LatLng。

  /**
   * G 地图特有属性
   */
  // language?: string; // 应返回结果的语言的语言标识符（如果可能)
  // location?: { lat: number; lng: number }; // 要进行地理编码的 LatLng。
  // 地址信息 必须提供 address、location 和 placeId 中的一个，且只能提供一个。
  address?: string;
  //   LatLngBounds|LatLngBoundsLiteral.要在其中进行搜索的 LatLngBounds。
  bounds?: any;
  // 	GeocoderComponentRestrictions。组成部分用于将结果限制在特定区域内。
  componentRestrictions?: any;
  // 与营业地点相关联的地点 ID。地点 ID 可唯一标识 Google Places 数据库中和 Google 地图上的地点。
  placeId?: string;
  // 用于偏向搜索的国家/地区代码，
  region?: string;

  /**
   * H 地图特有属性
   */
  // language?: string; // 搜索结果的语种。如果不指定语种，返回地点的当地语言。
  // location?: { lat: number; lng: number }; // 查询结果偏向的搜索范围。
  // 是否返回POI的地点名称，默认true。目前逆地理接口，只能返回机场的名称，其他POI不支持返回名称（2025年6月3日）。
  returnPoi?: boolean;
}

export interface IUnifiedRouteDriveOptions {
  /**
   * 所有地图共有属性
   */
  // 起点 A: origin  G: origin    H: origin
  origin: { lat: number; lng: number };
  // 终点 A: destination  G: destination    H: destination
  destination: { lat: number; lng: number };
  // 中转点 A: opts.waypoints  G: waypoints H: waypoints
  waypoints?: Array<{ lat: number; lng: number }>;

  /**
   * AG 地图共有属性
   */
  // 如果为 true，则指示路线服务尽可能避开轮渡 A: ferry(0-使用轮渡,1-不使用轮渡)   G：avoidFerries
  avoidFerries?: boolean;

  /**
   * AH 地图共有属性
   */

  /**
   * GH 地图共有属性
   */
  // 时间预估模型。取值包括： G -> drivingOptions.trafficModel BEST_GUESS（默认值）:使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间; OPTIMISTIC	使用历史流量数据乐观估算流量时长; PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计 H -> trafficMode: 0：best guess; 1：路况差于历史平均水平; 2：路况优于历史平均水平;默认值为0。
  trafficMode?: number;
  // 预计出发时间。时间预估模型。取值包括： G -> drivingOptions.departureTime。 H -> departAt
  departAt?: number;
  // 如果设置为 true，则指示路线服务尽可能避开高速公路  G:avoidHighways   H: avoid=[2]
  avoidHighways?: boolean;
  // 如果为 true，则指示路线服务尽可能避开收费道路 G:avoidTolls  H: avoid=[1]
  avoidTolls?: boolean;

  /**
   * A 地图特有属性
   */
  // AMap.Driving
  // LEAST_TIME: 最快捷模式     LEAST_FEE:最经济模式     LEAST_DISTANCE: 最短距离模式     REAL_TRAFFIC:考虑实时路况
  policy?: "LEAST_TIME" | "LEAST_FEE" | "LEAST_DISTANCE" | "REAL_TRAFFIC";
  // 默认值：base，返回基本地址信息  当取值为：all，返回DriveStep基本信息+DriveStep详细信息
  extensions?: string;
  // ferry?: number; // 默认为0，表示可以使用轮渡，为1的时候表示不可以使用轮渡
  // AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
  map?: any;
  // 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示
  panel?: string | HTMLElement;
  // 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标
  hideMarkers?: boolean;
  // 设置是否显示实时路况信息，默认设置为true。
  showTraffic?: boolean;
  // 车牌省份的汉字缩写，用于判断是否限行，与number属性组合使用，
  province?: string;
  // 除省份之外车牌的字母和数字，用于判断限行相关，与province属性组合使用，可选。例如:NH1N11
  number?: string;
  // 使用map属性时，绘制的规划线路是否显示描边 默认 true
  isOutline?: boolean;
  // 使用map属性时，绘制的规划线路的描边颜色。默认为'white'
  outlineColor?: string;
  // 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
  autoFitView?: boolean;
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
  // BICYCLING	指定骑车路线请求。  DRIVING	指定行车路线请求。  TRANSIT	指定公交路线指引请求。  WALKING	指定步行路线请求。
  travelMode: string;
  // drivingOptions?: {
  //   departureTime: Date; // 路线的预期出发时间， 出发时间必须设置为当前时间或未来的某个时间。而不能是过去的时间。
  //   trafficModel?: string; // 指定路线类型。 BEST_GUESS（默认值）	使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间。    OPTIMISTIC	使用历史流量数据乐观估算流量时长。    PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计。
  // };
  // avoidFerries?: boolean; // 如果为 true，则指示路线服务尽可能避开轮渡
  // avoidHighways?: boolean; // 如果设置为 true，则指示路线服务尽可能避开高速公路
  // avoidTolls?: boolean; // 如果为 true，则指示路线服务尽可能避开收费道路
  // 应返回结果的语言的语言标识符（如果可能）。
  language?: string;
  // 仅适用于 travelMode 为 TRANSIT 的请求的设置。此对象对其他出行方式没有影响。
  transitOptions?: {
    // 路线的预期到达时间
    arrivalTime?: Date;
    // 路线的预期出发时间
    departureTime?: Date;
    // 一种或多种首选公共交通方式。BUS	将公交车指定为首选公共交通方式。      RAIL	将铁路指定为首选公共交通方式。      SUBWAY	将地铁指定为首选公共交通方式。      TRAIN	将火车指定为首选公共交通方式。      TRAM	将电车指定为首选公共交通方式。
    modes?: Array<string>;
    // 一种偏好设置，可能会影响公交路线的选择，例如步行路程较短。如果未指定任何偏好设置，API 会返回默认的最佳路线。
    routingPreference?: string;
  };
  // 如果设置为 true，DirectionsService 将尝试重新排列所提供的中间航点，以最大限度地减少路线的总费用。如果航点经过优化，请检查响应中的 DirectionsRoute.waypoint_order 以确定新的排序。
  optimizeWaypoints?: boolean;
  // 是否应提供备选路线
  provideRouteAlternatives?: boolean;
  // 用作地址解析请求偏向的区域代码
  region?: string;
  // 出发地所使用的单位制。显示距离时要使用的首选单位制。IMPERIAL	：距离应以英制单位表示。 METRIC：距离应以公制单位表示。
  unitSystem?: string;

  /**
   * H 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
  // waypoints?: Array<{ lat: number; lng: number }>; // 中转点
  // departAt?: number; // 预计出发时间。以自UTC 1970年1月1日午夜以来的秒数为单位。  必须是当前或者未来时间，不能是过去时间。
  // trafficMode?: number; // 时间预估模型。取值包括：  0：best guess。  1：路况差于历史平均水平。  2：路况优于历史平均水平   默认值为0。
  // 如果设置为true，可以返回多条规划路线结果。 默认值为 false
  alternatives?: boolean;
  // 途径点类型，是via类型还是stopover类型。  false：stopover类型。  true：via类型  默认值为false。
  viaType?: boolean;
  // optimize?: boolean; // 是否对途径点进行优化。 默认值为 false
  // avoid?: Array<number>; // 表示计算出的路径应避免所指示的特性，取值包括：  1：避免经过收费的公路。  2：避开高速公路。  默认按时间最短返回。
}

export interface IUnifiedRouteWalkOptions {
  /**
   * 所有地图共有属性
   */
  // 起点 A: origin  G: origin    H: origin
  origin: { lat: number; lng: number };
  // 终点 A: destination  G: destination    H: destination
  destination: { lat: number; lng: number };

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
  // AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
  map?: any;
  // 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示
  panel?: string | HTMLElement;
  // 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标
  hideMarkers?: boolean;
  // 使用map属性时，绘制的规划线路是否显示描边 默认 true
  isOutline?: boolean;
  // 使用map属性时，绘制的规划线路的描边颜色。默认为'white'
  outlineColor?: string;
  // 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
  autoFitView?: boolean;
  // AMap.Walking().search
  // origin: Array<number> // [lng, lat] 起点
  // destination: Array<number> // [lng, lat] 终点

  /**
   * G 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
  // 中间路标的数组。系统会通过此数组中的每个航点计算从起点到目的地的路线。
  waypoints?: Array<{
    location: { lat: number; lng: number };
    // 如果为 true，表示此航点是出发地和目的地之间的经停点。这会将路线一分为二。如果为 false，表示路线应偏向于经过此航点，但不拆分为两段。如果您想根据用户在地图上拖动航点的情况创建路线，这非常有用。
    stopover: boolean;
  }>;
  // BICYCLING	指定骑车路线请求。  DRIVING	指定行车路线请求。  TRANSIT	指定公交路线指引请求。  WALKING	指定步行路线请求。
  travelMode: string;
  drivingOptions?: {
    // 路线的预期出发时间， 出发时间必须设置为当前时间或未来的某个时间。而不能是过去的时间。
    departureTime: Date;
    // 指定路线类型。 BEST_GUESS（默认值）	使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间。    OPTIMISTIC	使用历史流量数据乐观估算流量时长。    PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计。
    trafficModel?: string;
  };
  // 如果为 true，则指示路线服务尽可能避开轮渡
  avoidFerries?: boolean;
  // 如果设置为 true，则指示路线服务尽可能避开高速公路
  avoidHighways?: boolean;
  // 如果为 true，则指示路线服务尽可能避开收费道路
  avoidTolls?: boolean;
  // 应返回结果的语言的语言标识符（如果可能）。
  language?: string;
  // 仅适用于 travelMode 为 TRANSIT 的请求的设置。此对象对其他出行方式没有影响。
  transitOptions?: {
    // 路线的预期到达时间
    arrivalTime?: Date;
    // 路线的预期出发时间
    departureTime?: Date;
    // 一种或多种首选公共交通方式。BUS	将公交车指定为首选公共交通方式。      RAIL	将铁路指定为首选公共交通方式。      SUBWAY	将地铁指定为首选公共交通方式。      TRAIN	将火车指定为首选公共交通方式。      TRAM	将电车指定为首选公共交通方式。
    modes?: Array<string>;
    // 一种偏好设置，可能会影响公交路线的选择，例如步行路程较短。如果未指定任何偏好设置，API 会返回默认的最佳路线。
    routingPreference?: string;
  };
  // 如果设置为 true，DirectionsService 将尝试重新排列所提供的中间航点，以最大限度地减少路线的总费用。如果航点经过优化，请检查响应中的 DirectionsRoute.waypoint_order 以确定新的排序。
  optimizeWaypoints?: boolean;
  // 是否应提供备选路线
  provideRouteAlternatives?: boolean;
  // 用作地址解析请求偏向的区域代码
  region?: string;
  // 出发地所使用的单位制。显示距离时要使用的首选单位制。IMPERIAL	：距离应以英制单位表示。 METRIC：距离应以公制单位表示。
  unitSystem?: string;

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
  // 起点 A: origin  G: origin    H: origin
  origin: { lat: number; lng: number };
  // 终点 A: destination  G: destination    H: destination
  destination: { lat: number; lng: number };

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
  // 骑行路线规划策略；可选值为：  0：推荐路线及最快路线综合  1：推荐路线  2：最快路线  默认值：0
  policy?: number;
  // AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
  map?: any;
  // 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示
  panel?: string | HTMLElement;
  // 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标
  hideMarkers?: boolean;
  // 使用map属性时，绘制的规划线路是否显示描边 默认 true
  isOutline?: boolean;
  // 使用map属性时，绘制的规划线路的描边颜色。默认为'white'
  outlineColor?: string;
  // 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
  autoFitView?: boolean;
  // AMap.Riding().search
  // origin: Array<number> // [lng, lat] 起点
  // destination: Array<number> // [lng, lat] 终点

  /**
   * G 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
  // 中间路标的数组。系统会通过此数组中的每个航点计算从起点到目的地的路线。
  waypoints?: Array<{
    location: { lat: number; lng: number };
    // 如果为 true，表示此航点是出发地和目的地之间的经停点。这会将路线一分为二。如果为 false，表示路线应偏向于经过此航点，但不拆分为两段。如果您想根据用户在地图上拖动航点的情况创建路线，这非常有用。
    stopover: boolean;
  }>;
  // BICYCLING	指定骑车路线请求。  DRIVING	指定行车路线请求。  TRANSIT	指定公交路线指引请求。  WALKING	指定步行路线请求。
  travelMode: string;
  drivingOptions?: {
    // 路线的预期出发时间， 出发时间必须设置为当前时间或未来的某个时间。而不能是过去的时间。
    departureTime: Date;
    // 指定路线类型。 BEST_GUESS（默认值）	使用历史交通数据，尽可能准确地估算在交通拥堵中花费的时间。    OPTIMISTIC	使用历史流量数据乐观估算流量时长。    PESSIMISTIC	使用历史流量数据对流量时长进行悲观估计。
    trafficModel?: string;
  };
  // 如果为 true，则指示路线服务尽可能避开轮渡
  avoidFerries?: boolean;
  // 如果设置为 true，则指示路线服务尽可能避开高速公路
  avoidHighways?: boolean;
  // 如果为 true，则指示路线服务尽可能避开收费道路
  avoidTolls?: boolean;
  // 应返回结果的语言的语言标识符（如果可能）。
  language?: string;
  // 仅适用于 travelMode 为 TRANSIT 的请求的设置。此对象对其他出行方式没有影响。
  transitOptions?: {
    // 路线的预期到达时间
    arrivalTime?: Date;
    // 路线的预期出发时间
    departureTime?: Date;
    // 一种或多种首选公共交通方式。BUS	将公交车指定为首选公共交通方式。      RAIL	将铁路指定为首选公共交通方式。      SUBWAY	将地铁指定为首选公共交通方式。      TRAIN	将火车指定为首选公共交通方式。      TRAM	将电车指定为首选公共交通方式。
    modes?: Array<string>;
    // 一种偏好设置，可能会影响公交路线的选择，例如步行路程较短。如果未指定任何偏好设置，API 会返回默认的最佳路线。
    routingPreference?: string;
  };
  // 如果设置为 true，DirectionsService 将尝试重新排列所提供的中间航点，以最大限度地减少路线的总费用。如果航点经过优化，请检查响应中的 DirectionsRoute.waypoint_order 以确定新的排序。
  optimizeWaypoints?: boolean;
  // 是否应提供备选路线
  provideRouteAlternatives?: boolean;
  // 用作地址解析请求偏向的区域代码
  region?: string;
  // 出发地所使用的单位制。显示距离时要使用的首选单位制。IMPERIAL	：距离应以英制单位表示。 METRIC：距离应以公制单位表示。
  unitSystem?: string;

  /**
   * H 地图特有属性
   */
  // origin: { lat: number; lng: number }; // 起点
  // destination: { lat: number; lng: number }; // 终点
}

export interface ILnglatToPixelOptions {
  // 经纬度
  position: { lat: number; lng: number };
  // 缩放级别
  zoom: number;
}

export interface IPixelToLnglatOptions {
  // 像素坐标
  pixel: { x: number; y: number };
  // 缩放级别
  zoom: number;
}

export interface IPathAnimateOptions {
  // 路径
  path: Array<{ lat: number; lng: number; duration: number }>;
  // 线条颜色
  strokeColor?: string;
  // 线条宽度（单位像素）
  strokeWeight?: number;
  // 已经过路线的线条颜色
  passedStrokeColor?: string;
  // 已经过路线的线条宽度（单位像素）
  passedStrokeWeight?: number;
  // 是否自动播放
  isAutoPlay?: boolean;
  // 毫秒
  duration?: number;
  /** 图标配置（支持三种格式转换） */
  icon?:
    | string // 直接使用图片 URL
    | {
        // google:创建HTMLElement 传给content.glyph, huawei:icon.url, amap:icon.image
        url: string;
        // 宽高，google:创建HTMLElement 传给content.glyph, huawei:icon.scale(要将传入的参数转换成 0-1 的 scale), amap:icon.size
        size?: [number, number];
      };
}

export interface IInfoWindowOptions {
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
