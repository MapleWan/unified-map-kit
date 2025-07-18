const TILE_SIZE = 256;
// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function lnglatToWorldCoordinate(latLng: { lat: number; lng: number }): {
  x: number;
  y: number;
} {
  let siny = Math.sin((latLng.lat * Math.PI) / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);

  return {
    x: TILE_SIZE * (0.5 + latLng.lng / 360),
    y: TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)),
  };
}
function worldCoordinateToLnglat(world: { x: number; y: number }): {
  lat: number;
  lng: number;
} {
  const lng = (world.x / TILE_SIZE - 0.5) * 360;

  const y = 0.5 - world.y / TILE_SIZE;
  const latRadians = 2 * Math.atan(Math.exp(y * 2 * Math.PI)) - Math.PI / 2;
  const lat = (latRadians * 180) / Math.PI;

  return { lat, lng };
}

export function lnglatToPixel(
  latLng: { lat: number; lng: number },
  zoom: number
): { x: number; y: number } {
  const scale = 1 << zoom;
  const worldCoordinate = lnglatToWorldCoordinate(latLng);
  const pixelCoordinate = {
    x: worldCoordinate.x * scale,
    y: worldCoordinate.y * scale,
  };
  return pixelCoordinate;
}

export function pixelToLnglat(
  pixelCoordinate: { x: number; y: number },
  zoom: number
): { lat: number; lng: number } {
  const scale = 1 << zoom;
  const worldCoordinate = {
    x: pixelCoordinate.x / scale,
    y: pixelCoordinate.y / scale,
  };
  const latLng = worldCoordinateToLnglat(worldCoordinate);
  return latLng;
}

// wgs84 -> EPSG:3857  WGS84经纬度转3857投影经纬度。
export function wgs84ToWebMercator(
  lng: number,
  lat: number
): { x: number; y: number } {
  const R = 6378137.0;
  const x = (R * lng * Math.PI) / 180;
  const y = R * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
  return { x, y };
}

// EPSGEPSG:3857 -> wgs84  3857投影经纬度转WGS84经纬度
export function webMercatorToWgs84(
  x: number,
  y: number
): { lng: number; lat: number } {
  const R = 6378137.0;
  const lng = ((x / R) * 180) / Math.PI;
  const lat = ((2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * 180) / Math.PI;
  return { lng: Number(lng.toFixed(6)), lat: Number(lat.toFixed(6)) };
}


// console.log(lnglatToPixel({ lat: 41.85, lng: -87.65 }, 3));
// console.log(pixelToLnglat({ x: 525, y: 761 }, 3));

// console.log(wgs84ToWebMercator(116.442581, 39.882498));
// console.log(webMercatorToWgs84(12962328.823574513, 4848881.871897727));

