import * as ActionTypes from '../Store/ActionTypes';
import * as api from '../Helpers/apiHelper';
import { API_fetchClusterCves, API_fetchClusterDetails } from '../Temp/mockAPI';

export const fetchCveListTable = (params) => ({
  type: ActionTypes.FETCH_CVE_LIST_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => api.fetchCves(params),
});

export const fetchClusterListTable = (params) => ({
  type: ActionTypes.FETCH_CLUSTER_LIST_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => api.fetchClusters(params),
});

export const fetchCveDetailTable = (cveId, params) => ({
  type: ActionTypes.FETCH_CVE_DETAIL_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => api.fetchExposedClusters(cveId, params),
});

export const fetchCveDetails = (cveId, params) => ({
  type: ActionTypes.FETCH_CVE_DETAILS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => api.fetchCveDetails(cveId, params),
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
