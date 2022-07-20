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
  Object.entries(urlParams)
    .filter(([key, value]) => !allowedParams.includes(key) || value === '')
    .forEach(([key]) => delete urlParams[key]);

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

export const useUrlBoundParams = (
  allowedParams,
  defaultParams,
  fetchAction,
  changeParamsAction
) => {
  const dispatch = useDispatch();

  const [urlParameters, setUrlParams] = useUrlParams(allowedParams);

  useEffect(() => {
    apply({ ...defaultParams, ...urlParameters });
  }, []);

  useDeepCompareEffect(() => {
    dispatch(fetchAction(urlParameters));
  }, [urlParameters]);

  const apply = (newParams) => {
    setUrlParams({ ...urlParameters, ...newParams });
    dispatch(changeParamsAction({ ...urlParameters, ...newParams }));
  };

  return apply;
};
