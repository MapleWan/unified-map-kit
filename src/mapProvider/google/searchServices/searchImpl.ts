import { UnifiedProvider } from "../..";
import {
  IUnifiedSearchByKeywordOptions,
  IUnifiedSearchNearbyOptions,
  IUnifiedPlaceResults,
} from "../../serviceParamsType";

declare const google: any;
export class SearchManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  // 根据关键词搜索地点
  async searchPlaceByKeyword(
    map: any,
    options: IUnifiedSearchByKeywordOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    const { Place } = await google.maps.importLibrary("places");
    let resPositionList: Array<IUnifiedPlaceResults> = [];
    // 初始化请求参数对象
    let requestOption: any = {
      ...options,
      textQuery: options?.query,
      locationBias: options?.location,
    };
    if (options?.poiType) requestOption.includedType = options.poiType;
    if (!options?.fields) requestOption.fields = ["*"];

    delete requestOption.query;
    delete requestOption.location;
    delete requestOption.radius;
    const res = await Place.searchByText(requestOption);
    const result = res?.places || [];
    for (let i = 0; i < result.length; i++) {
      resPositionList.push({
        name: result[i].displayName,
        formatAddress: result[i].formattedAddress,
        position: {
          lat: result[i].location.lat(),
          lng: result[i].location.lng(),
        },
        sourceResult: result[i], // 保存原始结果
      });
    }
    return Promise.resolve(resPositionList);
  }

  // 搜索范围内地点
  async searchPlaceNearby(
    map: any,
    options: IUnifiedSearchNearbyOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    const { Place } = await google.maps.importLibrary("places");
    let resPositionList: Array<IUnifiedPlaceResults> = [];
    // 初始化请求参数对象
    let requestOption: any = {
      ...options,
    };
    if (options?.location) {
      requestOption.locationRestriction = {
        center: options.location,
        radius: options?.radius,
      };
    }
    if (options?.poiType) requestOption.includedType = options.poiType;
    if (!options?.fields) requestOption.fields = ["*"];

    delete requestOption.query;
    delete requestOption.location;
    delete requestOption.radius;
    const res = await Place.searchNearby(requestOption);
    const result = res?.places || [];
    for (let i = 0; i < result.length; i++) {
      resPositionList.push({
        name: result[i].displayName,
        formatAddress: result[i].formattedAddress,
        position: result[i].location,
        sourceResult: result[i], // 保存原始结果
      });
    }

    return Promise.resolve(resPositionList);
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "google",
  "searchManager",
  SearchManager
);
