import { useEffect, useState } from 'react';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { EXPOSED_CLUSTERS_OPTIONS, PUBLISHED_OPTIONS } from './constants';
import {
  addNotification,
  clearNotifications,
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import { downloadFile } from '@redhat-cloud-services/frontend-components-utilities/helpers';

// TODO: Consider moving some of these non-hook functions to constants.js or miscHelper.js

export const useLocalStorage = (key) => {
  const [sessionValue, setSessionValue] = useState(localStorage.getItem(key));

  const setValue = (newValue) => {
    setSessionValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [sessionValue, setValue];
};

export function filterParams(urlParams, allowedParams) {
  const paramsCopy = { ...urlParams };

  Object.entries(paramsCopy)
    .filter(([key, value]) => !allowedParams.includes(key) || value === '')
    .forEach(([key]) => delete paramsCopy[key]);

  return paramsCopy;
}

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

const transformExposedClustersParam = (urlParams) => {
  if (urlParams.affected_clusters) {
    urlParams.affected_clusters = EXPOSED_CLUSTERS_OPTIONS.map((item) =>
      urlParams.affected_clusters.split(',').includes(item.value)
        ? 'true'
        : 'false'
    ).join(',');
  }

  return urlParams;
};

const transformClusterSeverityParam = (urlParams) => {
  if (urlParams.cluster_severity) {
    if (urlParams.cluster_severity.split(',').includes('any')) {
      urlParams.cluster_severity = undefined;
    }
  } else {
    urlParams.cluster_severity = 'low,moderate,important,critical';
  }

  return urlParams;
};

// when creating additional transformer in the future
// create a new function for it and then add the function to this array
const URL_TRANSFORMERS = [
  transformPublishedParam,
  transformExposedClustersParam,
  transformClusterSeverityParam,
];

const transformUrlParamsBeforeFetching = (urlParams) => {
  let newParams = { ...urlParams, total_items: undefined };

  URL_TRANSFORMERS.forEach((transformer) => {
    newParams = transformer(newParams);
  });

  return newParams;
};

const NUMERICAL_URL_PARAMS = ['limit', 'offset'];

export const useUrlParams = (allowedParams) => {
  const getUrlParams = () => {
    const url = new URL(window.location);
    return filterParams(qs.parse(url.search), allowedParams);
  };

  const setUrlParams = (newParams) => {
    const url = new URL(window.location);
    const queryParams = qs.stringify(newParams);

    window.history.replaceState(
      null,
      null,
      `${url.origin}${url.pathname}?${queryParams}`
    );
  };

  return [getUrlParams, setUrlParams];
};

export const useUrlBoundParams = ({
  allowedParams,
  initialParams,
  additionalParam,
  fetchAction,
  changeParamsAction,
}) => {
  const dispatch = useDispatch();

  const [getUrlParams, setUrlParams] = useUrlParams(allowedParams);

  useEffect(() => {
    if (window.location.search === '') {
      apply({ ...initialParams });
    }
  }, [window.location.search]);

  useEffect(() => {
    const initialUrlParams = getUrlParams();

    apply({ ...initialParams, ...initialUrlParams });
  }, []);

  const apply = (newParams, isReset = false) => {
    const previousUrlParams = getUrlParams();

    let combinedParams = isReset
      ? { ...newParams }
      : { ...previousUrlParams, ...newParams };

    // convert numerical params to numbers
    for (const property in combinedParams) {
      if (NUMERICAL_URL_PARAMS.includes(property)) {
        combinedParams[property] = Number(combinedParams[property]);
      }
    }

    dispatch(changeParamsAction(combinedParams));

    const filteredParams = filterParams(combinedParams, allowedParams);

    dispatch(
      fetchAction(
        transformUrlParamsBeforeFetching(filteredParams),
        additionalParam
      )
    );

    setUrlParams(filteredParams);
  };

  return apply;
};

export const useExport = (filenamePrefix, fetchAction, fetchActionParam) => {
  const dispatch = useDispatch();

  const DEFAULT_PARAMS = {
    report: true,
  };

  const onExport = async (format, params) => {
    dispatch(
      addNotification({
        variant: 'info',
        title:
          'Preparing export. Once complete, your download will start automatically.',
      })
    );

    const formattedDate =
      new Date().toISOString().replace(/[T:]/g, '-').split('.')[0] + '-utc';

    const payload = await fetchAction(
      {
        ...transformUrlParamsBeforeFetching(params),
        ...DEFAULT_PARAMS,
        data_format: format,
      },
      fetchActionParam
    );

    let data =
      format === 'json' ? JSON.stringify(payload.data.data) : payload.data.data;

    downloadFile(data, filenamePrefix + formattedDate, format);

    dispatch(clearNotifications());

    dispatch(
      addNotification({
        variant: 'success',
        title: 'Downloading export',
      })
    );
  };

  return onExport;
};
