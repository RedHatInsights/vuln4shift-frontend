import axios from 'axios';

export const fetchCves = async (params) => {
  return axios.get('/api/ocp-vulnerability/v1/cves', { params });
};

export const fetchClusters = async (params) => {
  return axios.get('/api/ocp-vulnerability/v1/clusters', { params });
};
