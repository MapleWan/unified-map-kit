import { UnifiedProvider } from "../..";
import {
  animateMarkerSmooth,
  generateBezierPath,
  setMarkerIcon,
  wgs84ToWebMercator,
} from "./utils";
import {
  IPathAnimateOptions,
  IUnifiedRouteDriveOptions,
  IUnifiedRouteRideOptions,
  IUnifiedRouteWalkOptions,
} from "../../serviceParamsType";

declare const AMap: any;
export class DirectionManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  // 驾车 路径规划
  routeDrive(map: any, options: IUnifiedRouteDriveOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let driveOptions = { ...options } as any;

      if (driveOptions?.avoidFerries !== undefined) {
        driveOptions.ferry = driveOptions?.avoidFerries;
      }
      // 高德地图 路径规划
      AMap.plugin("AMap.Driving", () => {
        const driving = new AMap.Driving({
          map: options?.isShowPath ? map : null,
          ...driveOptions,
        });
        const startLngLat = [driveOptions.origin.lng, driveOptions.origin.lat]; //起始点坐标
        const endLngLat = [
          driveOptions.destination.lng,
          driveOptions.destination.lat,
        ]; //终点坐标
        const opts = {
          waypoints: [] as [number, number][], //途经点参数，最多支持传入16个途经点
        };
        if (driveOptions?.waypoints) {
          opts.waypoints = driveOptions.waypoints.map((waypoint: any) => {
            return [waypoint.lng, waypoint.lat];
          });
        }
        driving.search(
          startLngLat,
          endLngLat,
          opts,
          (status: any, result: any) => {
            //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
            //查询成功时，result 即为对应的驾车导航信息
            // console.log(status, result, ">>>>>amap");
            if (status === "complete") {
              resolve(result);
            } else {
              reject(new Error("amap directions error: " + status));
            }
          }
        );
      });
    });
  }

  // 步行 路径规划
  routeWalk(map: any, options: IUnifiedRouteWalkOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let walkOptions = { ...options } as any;

      // 高德地图 路径规划
      AMap.plugin("AMap.Walking", () => {
        const walking = new AMap.Walking({
          map: map,
          ...walkOptions,
        });
        const startLngLat = [walkOptions.origin.lng, walkOptions.origin.lat]; //起始点坐标
        const endLngLat = [
          walkOptions.destination.lng,
          walkOptions.destination.lat,
        ]; //终点坐标
        walking.search(startLngLat, endLngLat, (status: any, result: any) => {
          //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
          //查询成功时，result 即为对应的驾车导航信息
          // console.log(status, result, ">>>>>amap");
          if (status === "complete") {
            resolve(result);
          } else {
            reject(new Error("amap directions error: " + status));
          }
        });
      });
    });
  }

  // 骑行 路径规划
  routeRide(map: any, options: IUnifiedRouteRideOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let rideOptions = { ...options } as any;

      // 高德地图 路径规划
      AMap.plugin("AMap.Riding", () => {
        const riding = new AMap.Riding({
          map: map,
          ...rideOptions,
        });
        const startLngLat = [rideOptions.origin.lng, rideOptions.origin.lat]; //起始点坐标
        const endLngLat = [
          rideOptions.destination.lng,
          rideOptions.destination.lat,
        ]; //终点坐标
        riding.search(startLngLat, endLngLat, (status: any, result: any) => {
          //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
          //查询成功时，result 即为对应的驾车导航信息
          // console.log(status, result, ">>>>>amap");
          if (status === "complete") {
            resolve(result);
          } else {
            reject(new Error("amap directions error: " + status));
          }
        });
      });
    });
  }
  // routeTransfer(map: any, options: any): any {}

  animatePath(map: any, options: IPathAnimateOptions): any {
    let route = [...options.path] as any;
    let amapRoute = [] as any;
    let haveSegemntDuration = options.path.some(
      (item) => item.duration !== undefined
    );
    route = generateBezierPath(route, 20);
    // console.log(route);
    let total = 0;
    for (let index = 0; index < route.length; index++) {
      amapRoute.push([route[index].lng, route[index].lat]);
      if (index === 0) {
        route[index].duration = route[index]?.duration || 0;
      } else {
        let before = wgs84ToWebMercator(
          route[index - 1].lng,
          route[index - 1].lat
        );
        let current = wgs84ToWebMercator(route[index].lng, route[index].lat);
        route[index].duration =
          route[index]?.duration ||
          (route[index]?.duration === 0
            ? 0
            : Math.sqrt(
                (current.x - before.x) ** 2 + (current.y - before.y) ** 2
              ));
      }
      total += route[index].duration;
    }
    // 记录已经走过的点
    let walkedPath = [] as any;
    // 原始整条路线
    let fullPathLine = new AMap.Polyline({
      path: [...amapRoute],
      showDir: true,
      strokeColor: options?.strokeColor || "#28F",
      strokeWeight: options?.strokeWeight || 5,
    });
    map.add(fullPathLine);

    // 动态已走轨迹线（蓝色）
    let walkedPolyline: any;

    // 初始标记
    let markerOptions = {
      position: amapRoute[0],
      map: map,
      icon: options?.icon,
    };
    markerOptions = setMarkerIcon(markerOptions);
    let marker: any;
    // 回放逻辑
    walkedPath.push(amapRoute[0]);

    // 修改后的动画逻辑（替换原 setInterval 部分）
    let currentIndex = 0;
    const batchSize = 3; // 每3个点更新一次路径
    // 如果每一段之间没有设置 duration，则生效最外层的线段回放总时间 duration 配置
    const lineDuration = haveSegemntDuration
      ? total
      : options?.duration || 5000;
    // const animateMarker = () => {
    //   if (currentIndex >= amapRoute.length - 1) return; // 到达终点停止

    //   const nextIndex = currentIndex + 1;
    //   const intervalTime = (route[nextIndex].duration / total) * lineDuration;
    //   animateMarkerSmooth(
    //     marker,
    //     map,
    //     amapRoute[currentIndex],
    //     amapRoute[nextIndex],
    //     intervalTime,
    //     () => {
    //       // 移动完成后更新路径
    //       if (
    //         currentIndex % batchSize === 0 ||
    //         nextIndex === amapRoute.length - 1
    //       ) {
    //         map.panTo(amapRoute[nextIndex]);
    //       }
    //       walkedPath.push(amapRoute[nextIndex]);
    //       walkedPolyline.setPath(walkedPath);
    //       currentIndex = nextIndex;
    //       requestAnimationFrame(animateMarker); // 递归调用
    //     }
    //   );
    // };
    // requestAnimationFrame(animateMarker);

    let isPaused = true;
    let animationFrameId = "" as any;
    // 开始动画
    function startAnimation() {
      marker = null;
      marker = new AMap.Marker(markerOptions);
      walkedPolyline = null;
      walkedPath = [amapRoute[0]];
      walkedPolyline = new AMap.Polyline({
        path: walkedPath,
        showDir: true,
        strokeColor: options?.passedStrokeColor || "#AF5",
        strokeWeight: options?.passedStrokeWeight || 6,
      });
      map.add(walkedPolyline);
      walkedPolyline.setMap(map);
      isPaused = false;
      currentIndex = 0;
      animateMarker();
    }

    // 暂停动画
    function pauseAnimation() {
      isPaused = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    // 继续动画
    function resumeAnimation() {
      isPaused = false;
      animateMarker();
    }

    // 重置动画
    function resetAnimation() {
      isPaused = true;
      currentIndex = 0;
      marker?.setMap(null);
      walkedPolyline?.setMap(null);
    }

    // 修改动画方法以支持暂停功能
    function animateMarker() {
      if (isPaused || currentIndex >= amapRoute.length - 1) return;

      const nextIndex = currentIndex + 1;
      const intervalTime = (route[nextIndex].duration / total) * lineDuration;

      animationFrameId = requestAnimationFrame(() => {
        animateMarkerSmooth(
          marker,
          map,
          amapRoute[currentIndex],
          amapRoute[nextIndex],
          intervalTime,
          () => {
            // 更新路径
            if (
              currentIndex % batchSize === 0 ||
              nextIndex === amapRoute.length - 1
            ) {
              map.panTo(amapRoute[nextIndex]);
            }
            walkedPath.push(amapRoute[nextIndex]);
            walkedPolyline.setPath(walkedPath);
            currentIndex = nextIndex;
            animateMarker();
          }
        );
      });
    }

    return Promise.resolve({
      start: startAnimation,
      pause: pauseAnimation,
      resume: resumeAnimation,
      reset: resetAnimation,
    });
    // console.log("开始");
    // if (options?.isAutoPlay) startAnimation();
    // setTimeout(() => {
    //   console.log("暂停");
    //   pauseAnimation();
    //   setTimeout(() => {
    //     console.log("继续");
    //     resumeAnimation();
    //     setTimeout(() => {
    //       console.log("重置");
    //       resetAnimation();
    //       setTimeout(() => {
    //         console.log("重新开始");
    //         startAnimation();
    //       }, 2000);
    //     }, 2000);
    //   }, 2000);
    // }, 2000);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "directionManager",
  DirectionManager
);

// animatePath(map: any, options: IPathAnimateOptions): any {
//   let marker,
//     lineArr = options.path.map((item) => [item.lng, item.lat]);
//   marker = new AMap.Marker({
//     map: map,
//     position: lineArr[0],
//     icon: "https://webapi.amap.com/images/car.png",
//     offset: new AMap.Pixel(-26, -13),
//     autoRotation: true,
//     angle: -90,
//   });

//   // 绘制轨迹
//   let polyline = new AMap.Polyline({
//     map: map,
//     path: lineArr,
//     showDir: true,
//     strokeColor: options?.strokeColor || "#28F", //线颜色
//     strokeWeight: options?.strokeWeight || 5, //线宽
//   });

//   let passedPolyline = new AMap.Polyline({
//     map: map,
//     strokeColor: options?.passedStrokeColor || "#AF5", //线颜色
//     strokeWeight: options?.passedStrokeWeight || 6, //线宽
//   });

//   marker.on("moving", function (e: any) {
//     passedPolyline.setPath(e.passedPath);
//   });
//   // 如果每一段之间没有设置 duration，则生效最外层的线段回放总时间 duration 配置
//   map.setFitView();
//   marker.moveAlong(lineArr, 200);
// }
