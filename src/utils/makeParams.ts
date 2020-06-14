export const makeUrl = (params: any[]) => {
  let count = 0;
  const query = params
    .map(([key, value]) => {
      count++;
      return key + "=" + value + (count < params.length ? "&" : "");
    })
    .toString();

  return query.replace(",", "");
};
