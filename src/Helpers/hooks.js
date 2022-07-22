import { useState, useEffect } from 'react';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { PUBLISHED_OPTIONS } from './constants';

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

const transformPublishedParam = (urlParams) => {
  const formatDate = (timestamp) => {
    const pad = (number) => `${`${number}`.length === 1 ? '0' : ''}${number}`;

    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // month is zero indexed
    const day = date.getDate();

    return `${year}-${pad(month)}-${pad(day)}`;
  };

  if (urlParams.published) {
    const option = PUBLISHED_OPTIONS.find(
      (option) => option.value === urlParams.published
    );

    urlParams.published = `${option.from ? formatDate(option.from) : ''},${
      option.to ? formatDate(option.to) : ''
    }`;
  }

  return urlParams;
};

// when creating additional transformer in the future
// create a new function for it and then add the function to this array
const urlTransformers = [transformPublishedParam];

const transformUrlParamsBeforeFetching = (urlParams) => {
  let newParams = { ...urlParams };

  urlTransformers.forEach((transformer) => {
    newParams = transformer(newParams);
  });

  return newParams;
};

export const useUrlBoundParams = ({
  allowedParams,
  defaultParams,
  additionalParam,
  fetchAction,
  changeParamsAction,
}) => {
  const dispatch = useDispatch();

  const [urlParams] = useUrlParams(allowedParams);

  useEffect(() => {
    apply({ ...defaultParams, ...urlParams });
  }, []);

  useDeepCompareEffect(() => {
    dispatch(
      fetchAction(transformUrlParamsBeforeFetching(urlParams), additionalParam)
    );
  }, [urlParams]);

  const apply = (newParams) => {
    const [urlParams, setUrlParams] = useUrlParams(allowedParams);

    setUrlParams({ ...urlParams, ...newParams });
    dispatch(changeParamsAction({ ...urlParams, ...newParams }));
  };

  return apply;
};
