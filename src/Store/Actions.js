import * as ActionTypes from '../Store/ActionTypes';
import {
  API_fetchCves,
  API_fetchClusters,
  API_fetchClusterCves,
  API_fetchClusterDetails,
  API_fetchExposedClusters,
  API_fetchCveDetails,
} from '../Temp/mockAPI';

export const fetchCveListTable = (params) => ({
  type: ActionTypes.FETCH_CVE_LIST_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => API_fetchCves(params),
});

export const fetchClusterListTable = (params) => ({
  type: ActionTypes.FETCH_CLUSTER_LIST_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => API_fetchClusters(params),
});

export const fetchCveDetailTable = (params) => ({
  type: ActionTypes.FETCH_CVE_DETAIL_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => API_fetchExposedClusters(params),
});

export const fetchCveDetails = (params) => ({
  type: ActionTypes.FETCH_CVE_DETAILS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => API_fetchCveDetails(params),
});

export const fetchClusterDetailTable = (params) => ({
  type: ActionTypes.FETCH_CLUSTER_DETAIL_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => API_fetchClusterCves(params),
});

export const fetchClusterDetails = (params) => ({
  type: ActionTypes.FETCH_CLUSTER_DETAILS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => API_fetchClusterDetails(params),
});
