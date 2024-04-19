import * as ActionTypes from '../Store/ActionTypes';
import * as api from '../Helpers/apiHelper';

// TODO: Consider adding prefix to distinguish from API functions

/* FETCHING DATA */
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

export const fetchCveClustersTable = (cveId, params) => ({
  type: ActionTypes.FETCH_CVE_CLUSTERS_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => api.fetchExposedClusters(cveId, params),
});

export const fetchCveImagesTable = (cveId, params) => ({
  type: ActionTypes.FETCH_CVE_IMAGES_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => api.fetchExposedImages(cveId, params),
});

export const fetchCveDetails = (cveId, params) => ({
  type: ActionTypes.FETCH_CVE_DETAILS,
  meta: {
    timestamp: new Date(),
    noNotificationOnError: true,
  },
  payload: () => api.fetchCveDetails(cveId, params),
});

export const fetchClusterCveTable = (clusterId, params) => ({
  type: ActionTypes.FETCH_CLUSTER_CVES_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => api.fetchClusterCves(clusterId, params),
});

export const fetchClusterImagesTable = (clusterId, params) => ({
  type: ActionTypes.FETCH_CLUSTER_IMAGES_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => api.fetchClusterImages(clusterId, params),
});

export const fetchClusterDetails = (clusterId, params) => ({
  type: ActionTypes.FETCH_CLUSTER_DETAILS,
  meta: {
    timestamp: new Date(),
    noNotificationOnError: true,
  },
  payload: () => api.fetchClusterDetails(clusterId, params),
});

/* CHANGING TABLE PARAMS */
export const changeCveListTableParams = (params) => ({
  type: ActionTypes.CHANGE_CVE_LIST_TABLE_PARAMS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => params,
});

export const changeClusterListTableParams = (params) => ({
  type: ActionTypes.CHANGE_CLUSTER_LIST_TABLE_PARAMS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => params,
});

export const changeCveClustersTableParams = (params) => ({
  type: ActionTypes.CHANGE_CVE_CLUSTERS_TABLE_PARAMS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => params,
});

export const changeCveImagesTableParams = (params) => ({
  type: ActionTypes.CHANGE_CVE_IMAGES_TABLE_PARAMS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => params,
});

export const changeClusterCvesTableParams = (params) => ({
  type: ActionTypes.CHANGE_CLUSTER_CVES_TABLE_PARAMS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => params,
});

export const changeClusterImagesTableParams = (params) => ({
  type: ActionTypes.CHANGE_CLUSTER_IMAGES_TABLE_PARAMS,
  meta: {
    timestamp: new Date(),
  },
  payload: () => params,
});
