import axios from 'axios';

export const fetchCves = async (params) => {
  return axios.get('/api/ocp-vulnerability/v1/cves', { params });
};

export const fetchClusters = async (params) => {
  return axios.get('/api/ocp-vulnerability/v1/clusters', { params });
};

export const fetchExposedClusters = async (params, cveId) => {
  return axios.get(`/api/ocp-vulnerability/v1/cves/${cveId}/exposed_clusters`, {
    params,
  });
};

export const fetchCveDetails = async (cveId) => {
  return axios.get(`/api/ocp-vulnerability/v1/cves/${cveId}`);
};

export const fetchClusterCves = async (clusterId, params) => {
  return axios.get(`/api/ocp-vulnerability/v1/clusters/${clusterId}/cves`, {
    params,
  });
};

export const fetchClusterDetails = async (clusterId, params) => {
  return axios.get(`/api/ocp-vulnerability/v1/clusters/${clusterId}`, {
    params,
  });
};
