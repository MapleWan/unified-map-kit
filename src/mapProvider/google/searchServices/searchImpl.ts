import { UnifiedProvider } from "../..";
import {
  IUnifiedSearchByKeywordOptions,
  IUnifiedSearchNearbyOptions,
  IUnifiedPlaceResults,
} from "../../serviceParamsType";

declare const google: any;
function handleSearchResult(
  result: any,
  resolve: (value: Array<IUnifiedPlaceResults>) => void,
  reject: (reason?: any) => void
): void {
  let resPositionList: Array<IUnifiedPlaceResults> = [];
  const results = result.poiList.pois;
  for (let i = 0; i < results.length; i++) {
    resPositionList.push({
      name: results[i].name,
      formatAddress: results[i].address,
      position: results[i].location,
      sourceResult: results[i],
    });
  }
  resolve(resPositionList);
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
  ): Promise<Array<IUnifiedPlaceResults>> {
    return new Promise(async (resolve, reject) => {
      const { PlacesService } = await google.maps.importLibrary("places");
      let resPositionList: Array<IUnifiedPlaceResults> = [];
      const pls = new PlacesService(map);

      let requestOption: any = {
        ...options,
        type: options?.poiType,
      };
      pls.textSearch(requestOption, (res: any) => {
        res.forEach((item: any) => {
          resPositionList.push({
            name: item.name,
            formatAddress: item.formatted_address,
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

  // 搜索范围内地点
  async searchPlaceNearby(
    map: any,
    options: IUnifiedSearchNearbyOptions
  ): Promise<Array<IUnifiedPlaceResults>> {
    return new Promise(async (resolve, reject) => {
      const { PlacesService } = await google.maps.importLibrary("places");
      let resPositionList: Array<IUnifiedPlaceResults> = [];
      const pls = new PlacesService(map);

      let requestOption: any = {
        ...options,
        keyword: options?.query,
        type: options?.poiType,
      };
      pls.nearbySearch(requestOption, (res: any) => {
        res.forEach((item: any) => {
          resPositionList.push({
            name: item.name,
            formatAddress: item.formatted_address || item.name,
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
  "searchManager",
  SearchManager
);
