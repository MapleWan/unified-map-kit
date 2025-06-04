import { UnifiedProvider } from "../..";
import {
  IUnifiedGeocodeOptions,
  IUnifiedReverseGeocodeOptions,
  IUnifiedPlaceResults,
} from "../../serviceParamsType";

declare const HWMapJsSDK: any;
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
      let siteService = new HWMapJsSDK.HWSiteService();
      let resPositionList: Array<IUnifiedPlaceResults> = [];
      // 初始化请求参数对象
      let requestOption: any = { ...options };
      // 调用搜索接口，result为返回结果，status为返回状态
      siteService.geocode(requestOption, (result: any, status: any) => {
        if (status == "0") {
          for (let i = 0; i < result.sites.length; i++) {
            resPositionList.push({
              name: result.sites[i].name,
              formatAddress: result.sites[i].formatAddress,
              position: result.sites[i].location,
              sourceResult: result.sites[i], // 保存原始结果
            });
          }
        }
        resolve(resPositionList);
      });
    });
  }

  // 搜索范围内地点
  async reverseGeocode(
    map: any,
    options: IUnifiedReverseGeocodeOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    return new Promise((resolve, reject) => {
      let siteService = new HWMapJsSDK.HWSiteService();
      let resPositionList: Array<IUnifiedPlaceResults> = [];
      // 初始化请求参数对象
      let requestOption: any = { ...options };
      // 调用搜索接口，result为返回结果，status为返回状态
      siteService.reverseGeocode(requestOption, (result: any, status: any) => {
        if (status == "0") {
          for (let i = 0; i < result.sites.length; i++) {
            resPositionList.push({
              name: result.sites[i].name,
              formatAddress: result.sites[i].formatAddress,
              position: result.sites[i].location,
              sourceResult: result.sites[i], // 保存原始结果
            });
          }
          resolve(resPositionList);
        } else {
          reject(
            new Error(
              "Search failed with searchByText of huawei map, status: " + status
            )
          );
        }
      });
    });
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "huawei",
  "geocoderManager",
  GeocoderManager
);
