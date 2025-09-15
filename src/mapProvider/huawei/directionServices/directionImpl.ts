import { UnifiedProvider } from "../..";
import {
  setMarkerIcon,
  animateMarkerSmooth,
  generateBezierPath,
  wgs84ToWebMercator,
} from "./utils";
import {
  IUnifiedRouteDriveOptions,
  IUnifiedRouteWalkOptions,
  IUnifiedRouteRideOptions,
  IPathAnimateOptions,
} from "../../serviceParamsType";

declare const HWMapJsSDK: any;
export class DirectionManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  // 行车路径规划
  routeDrive(map: any, options: IUnifiedRouteDriveOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let driveOptions = { ...options } as any;
      if (driveOptions?.avoidHighways !== undefined) {
        if (!driveOptions?.avoid) {
          driveOptions.avoid = [2];
        } else {
          driveOptions.avoid.push(2);
        }
      }
      if (driveOptions?.avoidTolls !== undefined) {
        if (!driveOptions?.avoid) {
          driveOptions.avoid = [1];
        } else {
          driveOptions.avoid.push(1);
        }
      }
      let directionsService = new HWMapJsSDK.HWDirectionsService();
      let drectionsRenderer = new HWMapJsSDK.HWDirectionsRenderer();
      drectionsRenderer.setMap(map);
      // 调用路径规划接口
      directionsService.routeDriving(
        driveOptions,
        (directionsResult: any, directionsStatus: any) => {
          if (directionsStatus == "0") {
            // 通过HWDirectionsRenderer对象渲染路径
            if(options?.isShowPath) drectionsRenderer.setDirections(directionsResult);
            // console.log(directionsResult, ">>>>>>>huawei");
            resolve(directionsResult);
          } else {
            reject(new Error("huawei directions error: " + directionsStatus));
          }
        }
      );
    });
  }

  // 步行 路径规划
  routeWalk(map: any, options: IUnifiedRouteWalkOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let walkOptions = { ...options } as any;
      let directionsService = new HWMapJsSDK.HWDirectionsService();
      let drectionsRenderer = new HWMapJsSDK.HWDirectionsRenderer();
      drectionsRenderer.setMap(map);
      // 调用路径规划接口
      directionsService.routeWalking(
        walkOptions,
        (directionsResult: any, directionsStatus: any) => {
          if (directionsStatus == "0") {
            // 通过HWDirectionsRenderer对象渲染路径
            drectionsRenderer.setDirections(directionsResult);
            // console.log(directionsResult, ">>>>>>>huawei");
            resolve(directionsResult);
          } else {
            reject(new Error("huawei directions error: " + directionsStatus));
          }
        }
      );
    });
  }

  // 骑行 路径规划
  routeRide(map: any, options: IUnifiedRouteRideOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let rideOptions = { ...options } as any;
      let directionsService = new HWMapJsSDK.HWDirectionsService();
      let drectionsRenderer = new HWMapJsSDK.HWDirectionsRenderer();
      drectionsRenderer.setMap(map);
      // 调用路径规划接口
      directionsService.routeBicycling(
        rideOptions,
        (directionsResult: any, directionsStatus: any) => {
          if (directionsStatus == "0") {
            // 通过HWDirectionsRenderer对象渲染路径
            drectionsRenderer.setDirections(directionsResult);
            // console.log(directionsResult, ">>>>>>>huawei");
            resolve(directionsResult);
          } else {
            reject(new Error("huawei directions error: " + directionsStatus));
          }
        }
      );
    });
  }
  // routeTransfer(map: any, options: IUnifiedRouteTransferOptions): any {}

  async animatePath(map: any, options: IPathAnimateOptions) {
    let route = [...options.path] as any;
    let haveSegemntDuration = options.path.some(
      (item) => item.duration !== undefined
    );
    route = generateBezierPath(route, 20);
    let total = 0;
    for (let index = 0; index < route.length; index++) {
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
    // console.log(route);
    
    // 记录已经走过的点
    let walkedPath = [] as any;
    // 原始整条路线
    const fullPathLine = new HWMapJsSDK.HWPolyline({
      path: route,
      showDir: true,
      strokeColor: options?.strokeColor || "#28F",
      strokeWeight: options?.strokeWeight || 5,
    });
    fullPathLine.setMap(map);

    // 动态已走轨迹线
    let walkedPolyline: any;

    // 初始标记
    const markerOptions = {
      position: route[0],
      map: map,
      icon: options?.icon,
    };
    let marker: any;
    // 回放逻辑
    // walkedPath.push(route[0]);

    // 修改后的动画逻辑（替换原 setInterval 部分）
    let currentIndex = 0;
    const batchSize = 3; // 每3个点更新一次路径
    // 如果每一段之间没有设置 duration，则生效最外层的线段回放总时间 duration 配置
    const lineDuration = haveSegemntDuration
      ? total
      : options?.duration || 5000;
    // const animateMarker = () => {
    //   if (currentIndex >= route.length - 1) return; // 到达终点停止

    //   const nextIndex = currentIndex + 1;
    //   const intervalTime = (route[nextIndex].duration / total) * lineDuration;
    //   animateMarkerSmooth(
    //     marker,
    //     map,
    //     route[currentIndex],
    //     route[nextIndex],
    //     intervalTime,
    //     () => {
    //       // 移动完成后更新路径
    //       if (
    //         currentIndex % batchSize === 0 ||
    //         nextIndex === route.length - 1
    //       ) {
    //         map.panTo(route[nextIndex]);
    //       }
    //       walkedPath.push(route[nextIndex]);
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
      marker = new HWMapJsSDK.HWMarker(markerOptions);
      setMarkerIcon(options, marker);
      marker.setMap(map);
      walkedPolyline = null;
      walkedPath = [route[0]];
      console.log({
        path: walkedPath,
        showDir: true,
        strokeColor: options?.passedStrokeColor || "#AF5",
        strokeWeight: options?.passedStrokeWeight || 6,
      });
      walkedPolyline = new HWMapJsSDK.HWPolyline({
        path: walkedPath,
        showDir: true,
        strokeColor: options?.passedStrokeColor || "#AF5",
        strokeWeight: options?.passedStrokeWeight || 6,
      });
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
      if (isPaused || currentIndex >= route.length - 1) return;

      const nextIndex = currentIndex + 1;
      const intervalTime = (route[nextIndex].duration / total) * lineDuration;

      animationFrameId = requestAnimationFrame(() => {
        animateMarkerSmooth(
          marker,
          map,
          route[currentIndex],
          route[nextIndex],
          intervalTime,
          () => {
            // 更新路径
            if (
              currentIndex % batchSize === 0 ||
              nextIndex === route.length - 1
            ) {
              map.panTo(route[nextIndex]);
            }
            walkedPath.push(route[nextIndex]);
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
      reset: resetAnimation
    })
    // console.log("开始", options.isAutoPlay);
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
  "huawei",
  "directionManager",
  DirectionManager
);
