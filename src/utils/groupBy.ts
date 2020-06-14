export const groupBy = (arr: any[], f: any) =>
  new Promise<any>((resolve, reject) => {
    const a = arr.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    resolve(a);
  });
