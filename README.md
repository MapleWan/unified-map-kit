# map-kit 文档

`map-kit` 是一个前端地图工具库，提供统一的地图服务接口，支持多种地图提供商。

***\*注意：\****

1. 在此文档代码注释中，约定：<font color='red'>A 表示 高德地图，G 表示 google 地图，H 表示 华为地图</font>
2. map-kit 将提供三地图 api 公共参数与两两地图api 公共参数。如存在需使用原地图服务 api 特定参数的情况，也可以传入 option， map-kit 也对其适配（请谨慎使用）
3. 文档中关于高德、google、华为 API 参数整理仅供参考，详细请参考相关官方文档。

npm安装统一地图组件库：`npm install unified-map-kit`

在需要使用的地方引入：`import {createMap, init} from “unified-map-kit”`

---

# 支持的地图提供商

目前支持以下三种地图服务：

+ [高德地图（Amap）](https://lbs.amap.com/api/javascript-api-v2/guide/abc/load)
  - [https://a.amap.com/jsapi/static/doc/20230922/index.html](https://a.amap.com/jsapi/static/doc/20230922/index.html)
+ [谷歌地图（Google）](https://developers.google.com/maps/documentation/javascript/load-maps-js-api?hl=zh-cn)
  - [https://developers.google.com/maps/documentation/javascript/reference?hl=zh-cn](https://developers.google.com/maps/documentation/javascript/reference?hl=zh-cn)
+ [华为地图（Huawei）](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/javascript-api-0000001050162106)
  - [https://developer.huawei.com/consumer/cn/doc/HMSCore-References/js-api-0000001050710114](https://developer.huawei.com/consumer/cn/doc/HMSCore-References/js-api-0000001050710114)

  具体使用请参考 [使用文档](./map-kit.md)