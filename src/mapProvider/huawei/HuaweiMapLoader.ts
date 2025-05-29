/*
 * @Author: montisan i@hncoder.com
 * @Date: 2025-04-24 10:42:46
 * @LastEditors: montisan i@hncoder.com
 * @LastEditTime: 2025-04-24 11:50:02
 * @FilePath: /Map/src/HuaweiMapLoader.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


export class HuaweiMapLoader {
  private apiKey: string;
  private scriptLoaded: boolean = false;
  private loadingPromise: Promise<void> | null = null;

  constructor(options: { apiKey: string }) {
    this.apiKey = options.apiKey;
  }

  load(): Promise<void> {
    if (window.HWMapJsSDK) return Promise.resolve();

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = "HWMapJsSDKScript";
      script.src = `https://mapapi.cloud.huawei.com/mapjs/v1/api/js?callback=onHWMapJsSDKLoaded&key=${encodeURIComponent(this.apiKey)}`;
      script.onload = () => {
      };
      script.onerror = () => {
        reject(new Error('Failed to load Huawei Maps API'));
      };
      window.onHWMapJsSDKLoaded = () => {
        this.scriptLoaded = true;
        resolve();
      }
      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }
}