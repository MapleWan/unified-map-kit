/**
 * 通用配置项格式化方法
 * @param options 用户输入的配置项
 * @param requiredFields 必填字段列表
 * @param defaultValues 默认值映射表
 * @returns 格式化后的配置项
 */
export function formatOptions<T>(
  options: Partial<T>,
  requiredFields: Array<keyof T> = [],
  defaultValues: Partial<T> = {}
): T {
  if (!options) {
    throw new Error("Options is required");
  }

  // 必填字段校验
  for (const field of requiredFields) {
    if (options[field] === undefined || options[field] === null) {
      throw new Error(`Parameter '${String(field)}' is required`);
    }
  }

  // 合并默认值
  const result = { ...defaultValues, ...options } as T;

  // 处理嵌套对象的默认值
  for (const key in defaultValues) {
    if (
      typeof defaultValues[key] === "object" &&
      !Array.isArray(defaultValues[key]) &&
      options[key] !== undefined &&
      options[key] !== null
    ) {
      result[key] = {
        ...(defaultValues[key] as Record<string, any>),
        ...(options[key] as Record<string, any>),
      } as T[typeof key];
    }
  }

  return result;
}
