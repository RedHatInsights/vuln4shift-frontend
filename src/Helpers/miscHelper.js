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

export const isTimestampValid = (stateTimestamp, actionTimestamp) =>
  actionTimestamp >= stateTimestamp;

export const urlChangeTab = (urlPath, newTab) => {
  const lastSlashIndex = urlPath.lastIndexOf('/');
  return urlPath.substring(0, lastSlashIndex + 1) + newTab;
};
