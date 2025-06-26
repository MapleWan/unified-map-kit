export function handleIconAndLabel(label: any, icon: any) {
  let tmpLabel: any, tmpIcon: any;
  tmpLabel = {
    color: label?.color || "#000",
    text: typeof label?.content === "string" ? label?.content : "",
    fontSize: label?.fontSize || "12px",
  };
  if (icon) {
    if (typeof icon === "object") {
      // 先设置默认值，避免 tmpIcon 为空
      tmpIcon = {
        scale: 1,
        url: icon.url,
      };
      const img = new Image();
      img.src = icon.url;
      img.onload = () => {
        const scale = icon?.size ? icon.size[0] / img.width : 1;
        tmpIcon.scale = scale;
      };

      img.onerror = () => {
        console.error("Failed to load image");
      };
    } else {
      tmpIcon = {
        url: icon,
      };
    }
  }
  return {
    label: tmpLabel,
    icon: tmpIcon,
  };
}
export function getIndexFromIntervalList(
  clusterPointIntervalList: Array<number>,
  value: number
) {
  let tmpList = [0, ...clusterPointIntervalList];
  for (let i = 0; i < tmpList.length - 1; i++) {
    if (tmpList[i + 1] < tmpList[i]) {
      throw new Error(
        "Parameter 'clusterPointIntervalList' must be sorted in ascending order"
      );
    }
    if (value > tmpList[i] && value <= tmpList[i + 1]) {
      return i;
    }
  }
  return clusterPointIntervalList.length - 1;
}
