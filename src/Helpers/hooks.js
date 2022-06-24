import { useState } from 'react';
import qs from 'query-string';

export const useLocalStorage = (key) => {
  const [sessionValue, setSessionValue] = useState(localStorage.getItem(key));

  const setValue = (newValue) => {
    setSessionValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [sessionValue, setValue];
};

export function filterUrlParams(urlParams, allowedParams) {
  Object.keys(urlParams)
    .filter((key) => !allowedParams.includes(key))
    .forEach((key) => delete urlParams[key]);

  return urlParams;
}

export const useUrlParams = (allowedParams) => {
  const url = new URL(window.location);
  const urlParams = filterUrlParams(qs.parse(url.search), allowedParams);

  const setUrlParams = (parameters) => {
    const searchParams = qs.stringify(
      filterUrlParams(parameters, allowedParams)
    );

    window.history.replaceState(
      null,
      null,
      `${url.origin}${url.pathname}?${searchParams}`
    );
  };

  return [urlParams, setUrlParams];
};
