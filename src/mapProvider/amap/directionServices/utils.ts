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
    const lat = start[1] + (end[1] - start[1]) * progress;
    const lng = start[0] + (end[0] - start[0]) * progress;
    const currentPoint = [lng, lat];

    marker.setPosition(currentPoint);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      onComplete();
    }
  };

  requestAnimationFrame(step);
}

export function setMarkerIcon(options: any) {
  if (options?.label) {
    if (options.label instanceof HTMLElement) {
      options.content = options.label;
    } else {
      const customLabel = document.createElement("span");
      customLabel.style.display = "inline-block";
      customLabel.style.width = "fit-content";
      customLabel.style.fontSize = options.label?.fontSize || "12px";
      customLabel.style.color = options.label?.color || "#000";
      customLabel.innerHTML = (options.label?.content as string) || "";
      options.content = customLabel;
    }
  }
  if (options?.icon) {
    if (typeof options.icon === "object" && options.icon !== null) {
      const icon = options.icon;
      const customIcon = document.createElement("img");
      customIcon.src = icon.url;
      if (icon?.size) {
        customIcon.style.width = icon.size[0] + "px";
        customIcon.style.height = icon.size[1] + "px";
      }
      options.content = customIcon;
    } else {
      const customIcon = document.createElement("img");
      customIcon.src = options.icon;
      options.content = customIcon;
    }
  }
  return options
}
