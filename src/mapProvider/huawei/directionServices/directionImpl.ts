import { UnifiedProvider } from "../..";
import {
  IUnifiedRouteDriveOptions,
  IUnifiedRouteWalkOptions,
  IUnifiedRouteRideOptions,
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
      let driveOptions = {...options} as any;
      if (driveOptions?.avoidHighways !== undefined) {
        if(!driveOptions?.avoid){
          driveOptions.avoid = [2];
        } else {
          driveOptions.avoid.push(2);
        }
      }
      if (driveOptions?.avoidTolls !== undefined) {
        if(!driveOptions?.avoid){
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

  // 步行 路径规划
  routeWalk(map: any, options: IUnifiedRouteWalkOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let walkOptions = {...options} as any;
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
      let rideOptions = {...options} as any;
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
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "directionManager",
  DirectionManager
);
