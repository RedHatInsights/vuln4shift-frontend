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

export const setupFilters = (filters) => {
  let filterConfig = { items: [] };
  let activeFiltersConfig = {
    filters: [],
    onDelete: (_, categories) =>
      categories.forEach((category) => category.onDelete(category.chips)),
    deleteTitle: 'Reset filter',
  };

  filters.forEach((filter) => {
    filterConfig.items.push(filter.filterConfig);

    filter.activeFiltersConfig?.isShown &&
      activeFiltersConfig.filters.push(filter.activeFiltersConfig);
  });

  activeFiltersConfig.showDeleteButton = activeFiltersConfig.filters.length > 0;

  return [filterConfig, activeFiltersConfig];
};
