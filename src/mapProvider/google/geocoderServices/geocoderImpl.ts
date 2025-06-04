import { UnifiedProvider } from "../..";
import {
  IUnifiedGeocodeOptions,
  IUnifiedReverseGeocodeOptions,
  IUnifiedPlaceResults,
} from "../../serviceParamsType";

declare const google: any;

export class GeocoderManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  // 正地理编码
  async geocode(
    map: any,
    options: IUnifiedGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    return new Promise(async (resolve, reject) => {
      const { LatLngBounds } = await google.maps.importLibrary("core");
      const { Geocoder } = await google.maps.importLibrary("geocoding");
      let resPositionList: Array<IUnifiedPlaceResults> = [];
      const gcd = new Geocoder(map);

      let requestOption: any = {
        ...options,
      };

      if (options?.location) delete requestOption.location;
      if (options?.placeId) delete requestOption.placeId;
      if (options?.bounds) {
        requestOption.bounds = new LatLngBounds(
          options.bounds.southwest,
          options.bounds.northeast
        );
      }

      gcd.geocode(requestOption, (res: any) => {
        res.forEach((item: any) => {
          resPositionList.push({
            name: item?.name || item?.formatted_address,
            formatAddress: item?.formatted_address || item?.name,
            position: {
              lat: item.geometry.location.lat(),
              lng: item.geometry.location.lng(),
            },
            sourceResult: item, // 保存原始结果
          });
        });
        resolve(resPositionList);
      });
    });
  }

  //逆地理编码
  async reverseGeocode(
    map: any,
    options: IUnifiedReverseGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    return new Promise(async (resolve, reject) => {
      const { Geocoder } = await google.maps.importLibrary("geocoding");
      let resPositionList: Array<IUnifiedPlaceResults> = [];
      const gcd = new Geocoder(map);

      let requestOption: any = {
        ...options,
      };
      if (options?.address) delete requestOption.address;
      if (options?.placeId) delete requestOption.placeId;
      gcd.geocode(requestOption, (res: any) => {
        res.forEach((item: any) => {
          resPositionList.push({
            name: item?.name || item?.formatted_address,
            formatAddress: item?.formatted_address || item?.name,
            position: {
              lat: item.geometry.location.lat(),
              lng: item.geometry.location.lng(),
            },
            sourceResult: item, // 保存原始结果
          });
        });
        resolve(resPositionList);
      });
    });
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "geocoderManager",
  GeocoderManager
);
