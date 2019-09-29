export const initializeFields = list =>
  list.reduce((a, c) => {
    a[c] = 0;
    return a;
  }, {});