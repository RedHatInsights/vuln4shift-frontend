import axios from 'axios';

if (window.Cypress) {
  axios.defaults.baseURL = 'http://localhost:5500';
}

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

export const fetchClusterCves = async (params, clusterId) => {
  return axios.get(`/api/ocp-vulnerability/v1/clusters/${clusterId}/cves`, {
    params,
  });
};

export const fetchClusterDetails = async (clusterId) => {
  return axios.get(`/api/ocp-vulnerability/v1/clusters/${clusterId}`);
};
