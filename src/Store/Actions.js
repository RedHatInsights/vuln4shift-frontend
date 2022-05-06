import * as ActionTypes from '../Store/ActionTypes';
import {
  API_fetchCves,
  API_fetchClusters,
  API_fetchClusterCves,
  API_fetchClusterDetails,
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
