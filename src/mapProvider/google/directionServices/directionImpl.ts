import { UnifiedProvider } from "../..";
import { IUnifiedRouteDriveOptions,
  IUnifiedRouteWalkOptions,
  IUnifiedRouteRideOptions, } from "../../serviceParamsType";

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
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "directionManager",
  DirectionManager
);
