export function wgs84ToWebMercator(
  lng: number,
  lat: number
): { x: number; y: number } {
  const R = 6378137.0;
  const x = (R * lng * Math.PI) / 180;
  const y = R * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
  return { x, y };
}
function bezierInterpolate(p0: any, p1: any, p2: any, p3: any, t: any) {
  const lat =
    Math.pow(1 - t, 3) * p0.lat +
    3 * Math.pow(1 - t, 2) * t * p1.lat +
    3 * (1 - t) * Math.pow(t, 2) * p2.lat +
    Math.pow(t, 3) * p3.lat;

  const lng =
    Math.pow(1 - t, 3) * p0.lng +
    3 * Math.pow(1 - t, 2) * t * p1.lng +
    3 * (1 - t) * Math.pow(t, 2) * p2.lng +
    Math.pow(t, 3) * p3.lng;

  return { lat, lng };
}
// 根据 route 数据批量生成平滑点
export function generateBezierPath(points: any, stepsPerSegment = 20) {
  const smoothed = [];

  for (let i = 0; i < points.length - 3; i += 3) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const p2 = points[i + 2];
    const p3 = points[i + 3];

    for (let t = 0; t <= 1; t += 1 / stepsPerSegment) {
      smoothed.push(bezierInterpolate(p0, p1, p2, p3, t));
    }
  }

  return smoothed;
}

export function animateMarkerSmooth(
  marker: any,
  map: any,
  start: any,
  end: any,
  duration: number,
  onComplete: () => void
) {
  const startTimestamp = performance.now();

  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const lat = start.lat + (end.lat - start.lat) * progress;
    const lng = start.lng + (end.lng - start.lng) * progress;
    const currentPoint = { lat, lng };

    marker.setPosition(currentPoint);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      onComplete();
    }
  };

  requestAnimationFrame(step);
}

export function setMarkerIcon(options: any, marker: any) {
  if (options?.icon && typeof options.icon === "object") {
    const icon = options.icon;
    const img = new Image();
    img.src = icon.url;
    img.onload = () => {
      const scale = icon?.size ? icon.size[0] / img.width : 1;
      marker.setIcon({
        scale,
        url: icon.url,
      });
    };

    img.onerror = () => {
      console.error("Failed to load image");
    };
  }
}
