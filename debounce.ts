export const debounce = <T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number,
): ((...args: T) => Promise<U>) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return async (...args: T): Promise<U> => {
    if (timer) clearTimeout(timer);

    return new Promise((resolve, reject) => {
      timer = setTimeout(async () => {
        try {
          const result = await callback(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, wait);
    });
  };
};
