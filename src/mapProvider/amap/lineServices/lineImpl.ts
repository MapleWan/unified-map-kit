import { UnifiedProvider } from "../..";
import { IUnifiedPolylineOptions, ITimeBasedPathAnimateOptions, ITimeBasedPathAnimationController } from "../../serviceParamsType";
declare const AMap: any;
export class LineManager {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  // 添加折线
  addPolyline(map: any, options: IUnifiedPolylineOptions): Promise<void> {
    if('visible' in options){
      console.warn("amap map does not support visible property")
    }
    const lineOptions = {
      ...options,
      path: options.path.map((p: any) => [p.lng, p.lat]),
      showDir: options?.showDirection || false,
    } as any;
    if (options?.strokeLineDash) {
      lineOptions.strokeDasharray = options.strokeLineDash;
      lineOptions.strokeStyle = "dashed";
    }
    const polyline = new AMap.Polyline(lineOptions);
    map.add(polyline);
    return Promise.resolve(polyline);
  }

  // 删除折线
  removePolyline(map: any, line: any): void {
    if (!line) {
      throw new Error("Parameter 'line' is required");
    }
    map.remove(line);
  }

  /**
   * 基于时间的路径动画功能
   * 支持倍速播放、时间点跳转等高级功能
   */
  animateTimeBasedPath(map: any, options: ITimeBasedPathAnimateOptions): Promise<ITimeBasedPathAnimationController> {
    return new Promise((resolve) => {
      // 初始化配置
      const config = {
        speed: options.speed || 1.0,
        autoPlay: options.autoPlay || false,
        loop: options.loop || false,
        frameRate: options.frameRate || 60,
        interpolation: {
          enabled: options.interpolation?.enabled !== false,
          type: options.interpolation?.type || 'linear',
        }
      };

      // 计算时间范围
      const times = options.path.map(p => p.time);
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);
      const totalDuration = options.duration || (maxTime - minTime) * 1000; // 转换为毫秒

      // 创建路径线
      const fullPath = options.path.map(p => [p.lng, p.lat]);
      const fullPathLine = new AMap.Polyline({
        path: fullPath,
        strokeColor: options.pathStyle?.strokeColor || '#0066CC',
        strokeWeight: options.pathStyle?.strokeWeight || 4,
        strokeOpacity: options.pathStyle?.strokeOpacity || 0.6,
        showDir: options.pathStyle?.showDirection || false
      });
      map.add(fullPathLine);

      // 已走过的路径线
      let passedPath: number[][] = [];
      const passedPathLine = new AMap.Polyline({
        path: [],
        strokeColor: options.passedStyle?.strokeColor || '#00AA00',
        strokeWeight: options.passedStyle?.strokeWeight || 6,
        strokeOpacity: options.passedStyle?.strokeOpacity || 1.0,
        showDir: options.passedStyle?.showDirection || false
      });
      map.add(passedPathLine);

      // 移动标记
      let marker: any = null;
      if (options.markerStyle?.visible !== false) {
        const markerOptions: any = {
          position: fullPath[0],
          map: map
        };
        
        if (options.markerStyle?.icon) {
          if (typeof options.markerStyle.icon === 'string') {
            markerOptions.icon = options.markerStyle.icon;
          } else {
            markerOptions.icon = {
              image: options.markerStyle.icon.url,
              size: options.markerStyle.icon.size || [32, 32],
            };
          }
        }
        
        marker = new AMap.Marker(markerOptions);
      }

      // 动画状态
      let animationState = {
        isPlaying: false,
        isPaused: false,
        currentTime: minTime,
        startTime: 0,
        pausedTime: 0,
        animationFrameId: null as any
      };

      // 内部函数：执行插值计算
      const interpolatePoints = (p0: any, p1: any, ratio: number, index: number) => {
        // 如果用户提供了自定义插值函数，则使用它
        if (typeof config.interpolation.type === 'function') {
          return (config.interpolation.type as (p0: any, p1: any, path: any[]) => { lat: number; lng: number; time: number; data?: any })(p0, p1, options.path);
        }
        // 默认线性插值
        return {
          lat: p0.lat + (p1.lat - p0.lat) * ratio,
          lng: p0.lng + (p1.lng - p0.lng) * ratio,
          time: p0.time + (p1.time - p0.time) * ratio,
          data: p0.data
        };
      };

      // 内部函数：根据时间计算位置
      const getPositionAtTime = (time: number) => {
        if (time <= minTime) return { point: options.path[0], index: 0 };
        if (time >= maxTime) return { point: options.path[options.path.length - 1], index: options.path.length - 1 };

        // 找到时间区间
        for (let i = 0; i < options.path.length - 1; i++) {
          const currentPoint = options.path[i];
          const nextPoint = options.path[i + 1];
          
          if (time >= currentPoint.time && time <= nextPoint.time) {
            if (config.interpolation.enabled) {
              // 使用插值函数计算位置
              const ratio = (time - currentPoint.time) / (nextPoint.time - currentPoint.time);
              return {
                point: interpolatePoints(currentPoint, nextPoint, ratio, i),
                index: i + ratio
              };
            } else {
              return { point: currentPoint, index: i };
            }
          }
        }
        
        return { point: options.path[options.path.length - 1], index: options.path.length - 1 };
      };

      // 内部函数：更新位置
      const updatePosition = (time: number) => {
        const { point, index } = getPositionAtTime(time);
        
        // 更新标记位置
        if (marker) {
          marker.setPosition([point.lng, point.lat]);
        }

        // 更新已走过的路径
        const currentIndex = Math.floor(index);
        passedPath = fullPath.slice(0, currentIndex + 1);
        if (index % 1 !== 0) {
          // 添加插值点
          passedPath.push([point.lng, point.lat]);
        }
        passedPathLine.setPath(passedPath);

        // 触发回调
        options.callbacks?.onTimeUpdate?.(time, (time - minTime) / (maxTime - minTime));
        
        // 检查是否到达路径点
        if (Math.abs(index - Math.round(index)) < 0.01) {
          const pointIndex = Math.round(index);
          if (pointIndex < options.path.length) {
            options.callbacks?.onReachPoint?.(options.path[pointIndex], pointIndex);
          }
        }
      };

      // 动画循环
      const animate = () => {
        if (!animationState.isPlaying) return;

        const now = Date.now();
        const elapsed = (now - animationState.startTime) * config.speed;
        const currentTime = minTime + (elapsed / totalDuration) * (maxTime - minTime);

        if (currentTime >= maxTime) {
          // 动画结束
          animationState.currentTime = maxTime;
          updatePosition(maxTime);
          animationState.isPlaying = false;
          options.callbacks?.onEnd?.();
          
          if (config.loop) {
            // 循环播放
            animationState.currentTime = minTime;
            updatePosition(minTime);
            animationState.startTime = Date.now();
            animationState.isPlaying = true; // 确保设置为播放状态
            animationState.animationFrameId = requestAnimationFrame(animate);
          }
          return;
        }

        animationState.currentTime = currentTime;
        updatePosition(currentTime);
        
        animationState.animationFrameId = requestAnimationFrame(animate);
      };

      // 控制器对象
      const controller: ITimeBasedPathAnimationController = {
        start() {
          if (animationState.isPlaying) return;
          
          animationState.isPlaying = true;
          animationState.isPaused = false;
          animationState.startTime = Date.now() - (animationState.currentTime - minTime) / (maxTime - minTime) * totalDuration / config.speed;
          
          options.callbacks?.onStart?.();
          animate();
        },

        pause() {
          if (!animationState.isPlaying || animationState.isPaused) return;
          
          animationState.isPlaying = false;
          animationState.isPaused = true;
          animationState.pausedTime = animationState.currentTime;
          
          if (animationState.animationFrameId) {
            cancelAnimationFrame(animationState.animationFrameId);
          }
          
          options.callbacks?.onPause?.();
        },

        resume() {
          if (animationState.isPlaying || !animationState.isPaused) return;
          
          animationState.isPlaying = true;
          animationState.isPaused = false;
          animationState.startTime = Date.now() - (animationState.currentTime - minTime) / (maxTime - minTime) * totalDuration / config.speed;
          
          options.callbacks?.onResume?.();
          animate();
        },

        stop() {
          animationState.isPlaying = false;
          animationState.isPaused = false;
          
          if (animationState.animationFrameId) {
            cancelAnimationFrame(animationState.animationFrameId);
          }
          
          options.callbacks?.onStop?.();
        },

        reset() {
          this.stop();
          animationState.currentTime = minTime;
          updatePosition(minTime);
          options.callbacks?.onReset?.();
        },

        setSpeed(speed: number) {
          const wasPlaying = animationState.isPlaying;
          if (wasPlaying) {
            this.pause();
          }
          
          config.speed = Math.max(0.1, Math.min(10, speed)); // 限制速度范围
          
          if (wasPlaying) {
            this.resume();
          }
        },

        seekToTime(time: number) {
          const clampedTime = Math.max(minTime, Math.min(maxTime, time));
          const wasPlaying = animationState.isPlaying;
          
          if (wasPlaying) {
            this.pause();
          }
          
          animationState.currentTime = clampedTime;
          updatePosition(clampedTime);
          
          if (wasPlaying) {
            this.resume();
          }
        },

        seekToPoint(index: number) {
          const clampedIndex = Math.max(0, Math.min(options.path.length - 1, index));
          const targetPoint = options.path[clampedIndex];
          this.seekToTime(targetPoint.time);
        },

        getState() {
          return {
            isPlaying: animationState.isPlaying,
            isPaused: animationState.isPaused,
            currentTime: animationState.currentTime,
            progress: (animationState.currentTime - minTime) / (maxTime - minTime),
            currentPointIndex: getPositionAtTime(animationState.currentTime).index,
            speed: config.speed
          };
        },

        getDuration() {
          return totalDuration;
        },

        destroy() {
          this.stop();
          
          // 清理地图元素
          if (marker) {
            map.remove(marker);
            marker = null;
          }
          if (fullPathLine) {
            map.remove(fullPathLine);
          }
          if (passedPathLine) {
            map.remove(passedPathLine);
          }
        }
      };

      // 自动播放
      if (config.autoPlay) {
        setTimeout(() => controller.start(), 100);
      }

      resolve(controller);
    });
  }
}

UnifiedProvider.registerServiceToUnifiedProvider(
  "amap",
  "lineManager",
  LineManager
);
