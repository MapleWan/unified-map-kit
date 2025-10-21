export function handleIconAndLabel(label: any, icon: any) {
  let content: any;
  if (label) {
    if (label?.content instanceof HTMLElement) {
      content = label.content.cloneNode(true) as HTMLElement;
    } else {
      const customLabel = document.createElement("span");
      customLabel.style.display = "inline-block";
      customLabel.style.width = "fit-content";
      customLabel.style.fontSize = label?.fontSize || "12px";
      customLabel.style.color = label?.color || "#000";
      customLabel.innerHTML = (label?.content as string) || "";
      content = customLabel;
    }
  }
  if (icon) {
    // if (typeof icon === "object") {
    //   const customIcon = document.createElement("img");
    //   customIcon.src = icon.url;
    //   if (icon?.size) {
    //     customIcon.style.width = icon.size[0] + "px";
    //     customIcon.style.height = icon.size[1] + "px";
    //   }
    //   content = customIcon;
    // } else {
    //   const customIcon = document.createElement("img");
    //   customIcon.src = icon;
    //   content = customIcon;
    // }

    // 用 div 做容器，设置背景图
    const customDiv = document.createElement("div");
    customDiv.style.display = "flex";
    customDiv.style.justifyContent = "center";
    customDiv.style.alignItems = "center";
    customDiv.style.position = "relative";
    customDiv.style.backgroundImage = `url(${
      typeof icon === "object" ? icon.url : icon
    })`;
    customDiv.style.backgroundSize = "cover";
    customDiv.style.backgroundPosition = "center";
    customDiv.style.backgroundRepeat = "no-repeat";
    customDiv.style.color = label?.color || "#FFF";
    customDiv.style.fontSize = label?.fontSize || "12px";
    // 设置尺寸
    if (typeof icon === "object" && icon?.size) {
      customDiv.style.width = icon.size[0] + "px";
      customDiv.style.height = icon.size[1] + "px";
    } else {
      customDiv.style.width = "32px";
      customDiv.style.height = "32px";
    }
    // 你可以在 customDiv 里加 label 或其他内容
    if (label) {
      if (label?.content instanceof HTMLElement) {
        const labelElement = label.content.cloneNode(true) as HTMLElement;
        labelElement.style.position = "absolute";
        labelElement.style.left = "50%";
        labelElement.style.top = "50%";
        
        // 添加 offsetX 和 offsetY 支持
        const offsetX = label?.offsetX || 0;
        const offsetY = label?.offsetY || 0;
        labelElement.style.transform = `translate(calc(${offsetX}px), calc(50% + ${offsetY}px))`;
        labelElement.style.color = label?.color || "#FFF";
        labelElement.style.fontSize = label?.fontSize || "12px";
        customDiv.appendChild(labelElement);
      } else {
        const labelSpan = document.createElement("span");
        labelSpan.innerHTML = (label?.content as string) || "";
        labelSpan.style.position = "absolute";
        // labelSpan.style.left = "50%";
        // labelSpan.style.top = "50%";
        
        // 添加 offsetX 和 offsetY 支持
        const offsetX = label?.offsetX || 0;
        const offsetY = label?.offsetY || 0;
        labelSpan.style.transform = `translate(calc(${offsetX}px), calc(50% + ${offsetY}px))`;

        labelSpan.style.color = label?.color || "#FFF";
        labelSpan.style.fontSize = label?.fontSize || "12px";
        customDiv.appendChild(labelSpan);
      }
    }
    content = customDiv;
  }
  return { content };
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
