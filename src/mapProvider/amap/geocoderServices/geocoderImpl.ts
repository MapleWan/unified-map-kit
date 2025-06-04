import { UnifiedProvider } from "../..";
import {
  IUnifiedGeocodeOptions,
  IUnifiedReverseGeocodeOptions,
  IUnifiedPlaceResults,
} from "../../serviceParamsType";
declare const AMap: any;

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
    return new Promise((resolve, reject) => {
      AMap.plugin("AMap.Geocoder", () => {
        let geocoder = new AMap.Geocoder({
          ...options,
          lang: options?.language,
        });
        geocoder.getLocation(options?.address, (status: any, result: any) => {
          let resPositionList: Array<IUnifiedPlaceResults> = [];
          if (status === "complete") {
            const results = result.geocodes;
            for (let i = 0; i < results.length; i++) {
              resPositionList.push({
                name: results[i].formattedAddress,
                formatAddress: results[i].formattedAddress,
                position: results[i].location,
                sourceResult: results[i],
              });
            }
          }
          resolve(resPositionList);
        });
      });
    });
  }

  // 逆地理编码
  async reverseGeocode(
    map: any,
    options: IUnifiedReverseGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    return new Promise((resolve, reject) => {
      AMap.plugin("AMap.Geocoder", () => {
        let geocoder = new AMap.Geocoder({
          ...options,
          lang: options?.language,
        });
        geocoder.getAddress(
          [options?.location?.lng, options?.location?.lat],
          (status: any, result: any) => {
            let resPositionList: Array<IUnifiedPlaceResults> = [];
            if (status === "complete") {
              const res = result.regeocode;
              resPositionList.push({
                name: res.formattedAddress,
                formatAddress: res.formattedAddress,
                position: options?.location,
                sourceResult: res,
              });
            }
            resolve(resPositionList);
          }
        );
      });
    });
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "geocoderManager",
  GeocoderManager
);
