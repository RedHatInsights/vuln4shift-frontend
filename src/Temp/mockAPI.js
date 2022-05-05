// This is a temporary file with JSON API mocks.
// Delete this file along with mockEndpoints/ folder
// API endpoints have been implemented properly.

import cves from './mockEndpoints/cves.json';
import cveDetails from './mockEndpoints/cveDetails.json';
import clusters from './mockEndpoints/clusters.json';
import clusterDetails from './mockEndpoints/clusterDetails.json';
import exposedClusters from './mockEndpoints/exposedClusters.json';
import clusterCves from './mockEndpoints/clusterCves.json';

export const API_fetchCves = () => {
  return cves;
};

export const API_fetchCveDetails = () => {
  return cveDetails;
};

export const API_fetchClusters = () => {
  return clusters;
};

export const API_fetchClusterDetails = () => {
  return clusterDetails;
};

export const API_fetchExposedClusters = () => {
  return exposedClusters;
};

export const API_fetchClusterCves = () => {
  return clusterCves;
};
