import { UnifiedProvider } from "../..";
import {
  generateBezierPath,
  animateMarkerSmooth,
  wgs84ToWebMercator,
} from "./utils";
import {
  IUnifiedRouteDriveOptions,
  IUnifiedRouteWalkOptions,
  IUnifiedRouteRideOptions,
  IPathAnimateOptions,
} from "../../serviceParamsType";
declare const google: any;
export class DirectionManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  // 驾车 路径规划
  routeDrive(map: any, options: IUnifiedRouteDriveOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { DirectionsService, DirectionsRenderer } =
        await google.maps.importLibrary("routes");
      const directionsService = new DirectionsService();
      const directionsRenderer = new DirectionsRenderer();
      directionsRenderer.setMap(map);
      let driveOptions = {
        ...options,
        travelMode: google.maps.TravelMode.DRIVING,
        // travelMode: google.maps.TravelMode.BICYCLING, // 骑行路线
        // travelMode: google.maps.TravelMode.WALKING, // 步行路线
      } as any;
      if (driveOptions?.waypoints) {
        driveOptions.waypoints = driveOptions.waypoints.map((waypoint: any) => {
          return {
            location: waypoint,
            stopover: false,
          };
        });
      }
      const trafficModeList = ["BEST_GUESS", "PESSIMISTIC	", "OPTIMISTIC"];
      if (driveOptions?.trafficMode !== undefined) {
        driveOptions["drivingOptions"].trafficModel =
          trafficModeList[driveOptions.trafficMode];
      }
      if (driveOptions?.departAt) {
        driveOptions["drivingOptions"].departureTime = driveOptions.departAt;
      }
      directionsService
        .route(driveOptions)
        .then((response: any) => {
          // console.log(response, ">>>>>google");
          directionsRenderer.setDirections(response);
          resolve(response);
        })
        .catch((e: any) => {
          reject(new Error("google directions error: " + e));
        });
    });
  }

  // 步行 路径规划
  routeWalk(map: any, options: IUnifiedRouteWalkOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { DirectionsService, DirectionsRenderer } =
        await google.maps.importLibrary("routes");
      const directionsService = new DirectionsService();
      const directionsRenderer = new DirectionsRenderer();
      directionsRenderer.setMap(map);
      let walkOptions = {
        ...options,
        travelMode: google.maps.TravelMode.WALKING, // 步行路线
      } as any;
      directionsService
        .route(walkOptions)
        .then((response: any) => {
          // console.log(response, ">>>>>google");
          directionsRenderer.setDirections(response);
          resolve(response);
        })
        .catch((e: any) => {
          reject(new Error("google walk error: " + e));
        });
    });
  }

  // 骑行 路径规划
  routeRide(map: any, options: IUnifiedRouteRideOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { DirectionsService, DirectionsRenderer } =
        await google.maps.importLibrary("routes");
      const directionsService = new DirectionsService();
      const directionsRenderer = new DirectionsRenderer();
      directionsRenderer.setMap(map);
      let rideOptions = {
        ...options,
        travelMode: google.maps.TravelMode.BICYCLING, // 骑行路线
      } as any;
      if (rideOptions?.waypoints) {
        rideOptions.waypoints = rideOptions.waypoints.map((waypoint: any) => {
          return {
            location: waypoint,
            stopover: false,
          };
        });
      }
      directionsService
        .route(rideOptions)
        .then((response: any) => {
          // console.log(response, ">>>>>google");
          directionsRenderer.setDirections(response);
          resolve(response);
        })
        .catch((e: any) => {
          reject(new Error("google ride error: " + e));
        });
    });
  }

  // routeTransfer(map: any, options: any): any {}
  async animatePath(map: any, options: IPathAnimateOptions) {
    const { Marker } = await this.loader.importLibrary("marker");
    const { Polyline } = await this.loader.importLibrary("maps");
    let haveSegemntDuration = options.path.some(
      (item) => item.duration !== undefined
    );
    let route = [...options.path] as any;
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
    // 原始整条路线（红色）
    const fullPathLine = new Polyline({
      path: route,
      geodesic: true,
      strokeColor: options?.strokeColor || "#28F",
      strokeWeight: options?.strokeWeight || 5,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 1,
            strokeColor: options?.strokeColor || "#fff",
            strokeWeight: options?.strokeWeight || 2,
            fillOpacity: 1,
          },
          repeat: "5%", // 每隔 30% 长度重复一次箭头
          offset: "100%",
        },
      ],
    });
    fullPathLine.setMap(map);

    // 动态已走轨迹线（蓝色）
    let walkedPolyline: any;

    // 初始标记
    let marker: any;

    // 回放逻辑
    // walkedPath.push(route[0]);

    // 修改后的动画逻辑（替换原 setInterval 部分）
    let currentIndex = 0;
    const batchSize = 2; // 每2个点更新一次路径
    // 如果每一段之间没有设置 duration，则生效最外层的线段回放总时间 duration 配置
    const lineDuration = haveSegemntDuration
      ? total
      : options?.duration || 5000;
    // const lineDuration =options?.duration || 5000;
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
      marker = new Marker({
        position: route[0],
        map: map,
        icon: options?.icon,
      });
      walkedPolyline = null;
      walkedPath = [route[0]];
      walkedPolyline = new Polyline({
        path: walkedPath,
        geodesic: true,
        strokeColor: options?.passedStrokeColor || "#AF5",
        strokeWeight: options?.passedStrokeWeight || 6,
        icons: [
          {
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 1,
              strokeColor: options?.strokeColor || "#fff",
              strokeWeight: options?.strokeWeight || 2,
              fillOpacity: 1,
            },
            repeat: "10%",
            offset: "100%",
          },
        ],
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
  "google",
  "directionManager",
  DirectionManager
);
