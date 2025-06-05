import { UnifiedProvider } from "../..";
import {
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
          map: map,
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
        const driving = new AMap.Walking({
          map: map,
          ...walkOptions,
        });
        const startLngLat = [walkOptions.origin.lng, walkOptions.origin.lat]; //起始点坐标
        const endLngLat = [walkOptions.destination.lng, walkOptions.destination.lat,]; //终点坐标
        driving.search(
          startLngLat,
          endLngLat,
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

  // 骑行 路径规划
  routeRide(map: any, options: IUnifiedRouteRideOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let rideOptions = { ...options } as any;

      // 高德地图 路径规划
      AMap.plugin("AMap.Riding", () => {
        const driving = new AMap.Riding({
          map: map,
          ...rideOptions,
        });
        const startLngLat = [rideOptions.origin.lng, rideOptions.origin.lat]; //起始点坐标
        const endLngLat = [rideOptions.destination.lng, rideOptions.destination.lat,]; //终点坐标
        driving.search(
          startLngLat,
          endLngLat,
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
  // routeTransfer(map: any, options: any): any {}
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "directionManager",
  DirectionManager
);
