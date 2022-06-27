import { useState, useEffect } from 'react';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';

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

export const useUrlBoundParams = (allowedParams, meta, fetch, changeParams) => {
  const dispatch = useDispatch();

  const [urlParameters, setUrlParams] = useUrlParams(allowedParams);

  useEffect(() => {
    apply({ ...meta, ...urlParameters });
  }, []);

  useDeepCompareEffect(() => {
    dispatch(fetch(urlParameters));
  }, [urlParameters]);

  const apply = (newParams) => {
    setUrlParams({ ...urlParameters, ...newParams });
    dispatch(changeParams(urlParameters));
  };

  return apply;
};
