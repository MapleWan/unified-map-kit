import { UnifiedProvider } from "../..";
import {
  IUnifiedSearchByKeywordOptions,
  IUnifiedSearchNearbyOptions,
  IUnifiedPlaceResults,
} from "../../serviceParamsType";

declare const AMap: any;

function handleSearchResult(
  status: any,
  result: any,
  resolve: (value: Array<IUnifiedPlaceResults> | { resList: Array<IUnifiedPlaceResults>; placeSearch: any }) => void,
  reject: (reason?: any) => void,
  placeSearch = null
): void {
  let resPositionList: Array<IUnifiedPlaceResults> = [];
  if (status === "complete" || status === "no_data") {
    if (result === 0) {
      resolve(resPositionList);
      return;
    }

    const results = result.poiList.pois;
    for (let i = 0; i < results.length; i++) {
      resPositionList.push({
        name: results[i].name,
        formatAddress: results[i].address,
        position: results[i].location,
        sourceResult: results[i],
      });
    }
    if (placeSearch) {
      resolve({ resList: resPositionList, placeSearch });
    } else {
      resolve(resPositionList);
    }
  } else {
    reject(new Error("Search failed with AMap, status: " + status));
  }
}

export class SearchManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 根据关键词搜索地点
  async searchPlaceByKeyword(
    map: any,
    options: IUnifiedSearchByKeywordOptions
  ): Promise<Array<IUnifiedPlaceResults> | { resList: Array<IUnifiedPlaceResults>; placeSearch: any }> {
    return new Promise((resolve, reject) => {
      // 初始化请求参数对象
      AMap.plugin("AMap.PlaceSearch", () => {
        const placeSearch = new AMap.PlaceSearch({
          // map: map,
          type: options?.poiType,
          ...options,
        });
        placeSearch.search(options?.query || "", (status: any, result: any) => {
          if (options?.isNeedPlaceSearch) {
            handleSearchResult(status, result, resolve, reject, placeSearch);
          } else {
            handleSearchResult(status, result, resolve, reject);
          }
        });
      });
    });
  }

  // 搜索范围内地点
  async searchPlaceNearby(
    map: any,
    options: IUnifiedSearchNearbyOptions
  ): Promise<Array<IUnifiedPlaceResults> | { resList: Array<IUnifiedPlaceResults>; placeSearch: any }> {
    return new Promise((resolve, reject) => {
      // 初始化请求参数对象
      AMap.plugin("AMap.PlaceSearch", () => {
        const placeSearch = new AMap.PlaceSearch({
          // map: map,
          type: options?.poiType,
          ...options,
        });

        placeSearch.searchNearBy(
          options?.query,
          [options?.location?.lng, options?.location?.lat],
          options?.radius,
          (status: any, result: any) => {
            // handleSearchResult(status, result, resolve, reject);
            if (options?.isNeedPlaceSearch) {
              handleSearchResult(status, result, resolve, reject, placeSearch);
            } else {
              handleSearchResult(status, result, resolve, reject);
            }
          }
        );
      });
    });
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "searchManager",
  SearchManager
);
