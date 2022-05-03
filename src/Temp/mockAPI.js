// This is a temporary file with JSON API mocks.
// Delete this file along with mockEndpoints/ folder
// API endpoints have been implemented properly.

import cves from './mockEndpoints/cves.json';
import cveDetails from './mockEndpoints/cveDetails.json';
import clusters from './mockEndpoints/clusters.json';
import clusterDetails from './mockEndpoints/clusterDetails.json';
import exposedClusters from './mockEndpoints/exposedClusters.json';
import clusterCves from './mockEndpoints/clusterCves.json';

export const fetchCves = () => {
  return cves;
};

export const fetchCveDetails = () => {
  return cveDetails;
};

export const fetchClusters = () => {
  return clusters;
};

export const fetchClusterDetails = () => {
  return clusterDetails;
};

export const fetchExposedClusters = () => {
  return exposedClusters;
};

export const fetchClusterCves = () => {
  return clusterCves;
};
