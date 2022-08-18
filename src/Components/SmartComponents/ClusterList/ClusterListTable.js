import React from 'react';
import {
  CLUSTER_LIST_ALLOWED_PARAMS,
  CLUSTER_LIST_DEFAULT_FILTERS,
  CLUSTER_LIST_EXPORT_PREFIX,
  CLUSTER_LIST_TABLE_COLUMNS,
  CLUSTER_LIST_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import {
  changeClusterListTableParams,
  fetchClusterListTable,
} from '../../../Store/Actions';
import NoClusters from '../../PresentationalComponents/EmptyStates/NoClusters';
import useTextFilter from '../Filters/TextFilter';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import BaseTable from '../Generic/BaseTable';
import { setupFilters } from '../../../Helpers/miscHelper';
import NoMatchingClusters from '../../PresentationalComponents/EmptyStates/NoMatchingClusters';
import { fetchClusters } from '../../../Helpers/apiHelper';

const ClusterDetailTable = () => {
  const { clusters, isLoading, meta, error } = useSelector(
    ({ ClusterListStore }) => ClusterListStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CLUSTER_LIST_ALLOWED_PARAMS,
    initialParams: meta,
    fetchAction: fetchClusterListTable,
    changeParamsAction: changeClusterListTableParams,
  });

  const { search } = meta;

  const onExport = useExport(CLUSTER_LIST_EXPORT_PREFIX, fetchClusters);

  const filters = [
    useTextFilter({
      urlParam: 'search',
      label: 'Name',
      placeholder: 'Filter by name',
      value: search,
      apply,
      chipLabel: 'Search term',
    }),
  ];

  const [filterConfig, activeFiltersConfig, areAnyFiltersApplied] =
    setupFilters(filters, meta, CLUSTER_LIST_DEFAULT_FILTERS, apply);

  return (
    <BaseTable
      isLoading={isLoading}
      rows={clusters.map((row) => CLUSTER_LIST_TABLE_MAPPER(row))}
      columns={CLUSTER_LIST_TABLE_COLUMNS}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={
        areAnyFiltersApplied ? <NoMatchingClusters /> : <NoClusters />
      }
      apply={apply}
      onExport={(format) => onExport(format, meta)}
    />
  );
};

export default ClusterDetailTable;
