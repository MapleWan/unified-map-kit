declare global {
  interface Window {
    HWMapJsSDK: any;
    AMap: any;
    _AMapSecurityConfig: any;
    onHWMapJsSDKLoaded: () => void;
  }
}

export {};