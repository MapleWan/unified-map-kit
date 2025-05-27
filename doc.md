# zvos-map-kit 文档

`zvos-map-kit` 是一个纯 Typescript 地图工具库，提供统一的地图服务接口，支持多种地图提供商。

---

## 1 支持的地图提供商

目前支持以下三种地图服务：

- 高德地图（Amap）
- 谷歌地图（Google）
- 华为地图（Huawei）

---

## 2 初始化方法

### 2.1 `init`



### 2.2 `createMap`

创建地图实例

#### 2.2.1 参数

| 参数名    | 类型             | 描述               |
|-----------|------------------|--------------------|
| `options` | `IMapInitOption` | 地图初始化选项对象 |

`IMapInitOption`：地图初始化配置，用于配置地图实例的参数。

| 属性       | 类型         | 默认值                          | 描述 |
|------------|--------------|----------------------------------|------|
| `provider` | `'google' ｜ 'amap' ｜ 'huawei'` | —                               | 地图提供商 |
| `container` | `HTMLElement` | —                               | 地图容器元素 |
| `zoom`     | `number`      | `10`                            | 初始缩放级别 |
| `center`   | `{lat: number, lng: number}` | `{lat: 39.9042, lng: 116.4074}` | 初始中心点坐标 |
| `apiKey`      | `string`      | —                               | 地图 API 密钥 |
| `sourceOptions`  | `any`      |  -                         | 地图服务商原有 options |

#### 2.2.2 返回值
```ts
Promise<MapProviderInterface>
```
返回一个 Promise，解析为对应地图提供者的实例。
---

#### 2.2.3 示例代码

```js
import { createMap } from 'zvos-map-kit';

const container = document.getElementById('map-container');

createMap({
  provider: 'amap',
  container,
  zoom: 12,
  center: { lat: 34.0522, lng: -118.2437 },
  key: 'your-api-key'
}).then(mapInstance => {
  console.log('地图加载完成', mapInstance);
});
```
---

## 3 标记

### 3.1 添加标记
