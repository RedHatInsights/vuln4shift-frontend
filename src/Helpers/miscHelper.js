import isEqual from 'lodash/isEqual';

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

export const deepFreeze = (object) => {
  const propNames = Object.getOwnPropertyNames(object);

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
};

export const subtractDays = (currentDate, toSubtract) => {
  return currentDate.setDate(currentDate.getDate() - toSubtract);
};

export const subtractYears = (currentDate, toSubtract) => {
  return currentDate.setFullYear(currentDate.getFullYear() - toSubtract);
};

export const areAnyFiltersApplied = ({
  currentParams,
  defaultParams,
  filterParams,
}) => {
  // filter out params which have nothing to do with filtering, like page, sort, etc.
  const reducedParams = filterParams.reduce(
    (acc, param) => ({
      ...acc,
      ...(currentParams[param] && { [param]: currentParams[param] }),
    }),
    {}
  );

  return !isEqual(reducedParams, defaultParams);
};

export const setupFilters = (filters, meta, defaultFilters, apply) => {
  filters = filters.map((filter) => filter(apply));

  if (filters.length === 0) {
    return [undefined, undefined];
  }

  const filterKeys = filters.map((item) => item.filterConfig.key);
  const showDeleteButton = areAnyFiltersApplied({
    currentParams: meta,
    defaultParams: defaultFilters,
    filterParams: filterKeys,
  });

  let filterConfig = { items: [] };
  let activeFiltersConfig = {
    filters: [],
    onDelete: (_, categories, isReset) =>
      isReset
        ? apply({ ...defaultFilters, offset: 0, limit: meta.limit }, true)
        : categories.forEach((category) => category.onDelete(category.chips)),
    deleteTitle: 'Reset filter',
    showDeleteButton,
  };

  filters.forEach((filter) => {
    filterConfig.items.push(filter.filterConfig);

    filter.activeFiltersConfig?.isShown &&
      activeFiltersConfig.filters.push(filter.activeFiltersConfig);
  });

  return [filterConfig, activeFiltersConfig, showDeleteButton];
};

export const isTimestampValid = (stateTimestamp, actionTimestamp) =>
  actionTimestamp >= stateTimestamp;

export const urlChangeTab = (urlPath, newTab) => {
  const lastSlashIndex = urlPath.lastIndexOf('/');
  return urlPath.substring(0, lastSlashIndex + 1) + newTab;
};
