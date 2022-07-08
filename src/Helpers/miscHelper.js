export const getCvssScoreFromUrlParam = (urlParam) => {
  if (!urlParam?.includes(',')) {
    urlParam = ',';
  }

  const urlMin = urlParam.split(',')[0];
  const urlMax = urlParam.split(',')[1];

  let min, max;

  min = urlMin === '' ? 0 : Number(urlMin);
  max = urlMax === '' ? 10 : Number(urlMax);

  return [min, max];
};
