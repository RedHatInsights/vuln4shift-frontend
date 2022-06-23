import axios from 'axios';

export const fetchClusters = async (params) => {
  return axios.get('/api/ocp-vulnerability/v1/clusters', { params });
};
