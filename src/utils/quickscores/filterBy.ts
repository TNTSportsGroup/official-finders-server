export function filterBy<T>(fn: (e: T) => boolean) {
  return function(data: T[]) {
    return data.filter(fn);
  };
}
