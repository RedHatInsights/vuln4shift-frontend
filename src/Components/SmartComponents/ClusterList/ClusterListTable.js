import React from 'react';
import {
  DeclarativeTable,
  setupFilters,
} from '../../../DeclarativeTableFramework';
import {
  CLUSTER_LIST_ALLOWED_PARAMS,
  CLUSTER_LIST_DEFAULT_FILTERS,
  CLUSTER_LIST_EXPORT_PREFIX,
  CLUSTER_LIST_TABLE_MAPPER,
  clusterTextFilter,
  clusterStatusFilter,
  versionFilter,
  providerFilter,
  clusterSeverityFilter,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeClusterListTableColumns,
  changeClusterListTableParams,
  fetchClusterListTable,
} from '../../../Store/Actions';
import NoClusters from '../../PresentationalComponents/EmptyStates/NoClusters';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { fetchClusters } from '../../../Helpers/apiHelper';

const ClusterCvesTable = () => {
  const dispatch = useDispatch();

  const { clusters, isLoading, meta, error, columns } = useSelector(
    ({ ClusterListStore }) => ClusterListStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CLUSTER_LIST_ALLOWED_PARAMS,
    initialParams: meta,
    fetchAction: fetchClusterListTable,
    changeParamsAction: changeClusterListTableParams,
  });

  const {
    search,
    status,
    dynamic_status_options,
    version,
    dynamic_version_options,
    cluster_severity,
    provider,
    dynamic_provider_options,
  } = meta;

  const onExport = useExport({
    filenamePrefix: CLUSTER_LIST_EXPORT_PREFIX,
    fetchAction: fetchClusters,
    allowedParams: CLUSTER_LIST_ALLOWED_PARAMS,
  });

  const filters = [
    clusterTextFilter(search, apply),
    clusterStatusFilter(status, dynamic_status_options, apply),
    versionFilter(version, dynamic_version_options, apply),
    clusterSeverityFilter(cluster_severity, apply),
    providerFilter(provider, dynamic_provider_options, apply),
  ];

  const [filterConfig, activeFiltersConfig, areAnyFiltersApplied] =
    setupFilters(filters, meta, CLUSTER_LIST_DEFAULT_FILTERS, apply);

  return (
    <DeclarativeTable
      isLoading={isLoading}
      rows={clusters.map((row) => CLUSTER_LIST_TABLE_MAPPER(row))}
      columns={columns}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={
        areAnyFiltersApplied ? (
          <NoMatchingItems items="clusters" />
        ) : (
          <NoClusters />
        )
      }
      apply={apply}
      onExport={(format) => onExport(format, meta)}
      applyColumns={(columns) =>
        dispatch(changeClusterListTableColumns(columns))
      }
    />
  );
};

export default ClusterCvesTable;
