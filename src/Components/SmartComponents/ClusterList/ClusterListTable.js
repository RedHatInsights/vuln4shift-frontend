import React from 'react';
import {
  CLUSTER_LIST_ALLOWED_PARAMS,
  CLUSTER_LIST_DEFAULT_FILTERS,
  CLUSTER_LIST_EXPORT_PREFIX,
  CLUSTER_LIST_TABLE_MAPPER,
  CLUSTER_STATUS_OPTIONS,
  CLUSTER_VERSION_OPTIONS,
  CLUSTER_PROVIDER_OPTIONS,
  CLUSTER_SEVERITY_OPTIONS,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeClusterListTableColumns,
  changeClusterListTableParams,
  fetchClusterListTable,
} from '../../../Store/Actions';
import NoClusters from '../../PresentationalComponents/EmptyStates/NoClusters';
import useTextFilter from '../Filters/TextFilter';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import BaseTable from '../Table/BaseTable';
import { setupFilters } from '../../../Helpers/miscHelper';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { fetchClusters } from '../../../Helpers/apiHelper';
import checkboxFilter from '../Filters/CheckboxFilter';
import { uniqBy } from 'lodash';

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
    useTextFilter({
      urlParam: 'search',
      label: 'Name',
      placeholder: 'Filter by name',
      value: search,
      apply,
      chipLabel: 'Search term',
    }),
    checkboxFilter({
      urlParam: 'status',
      label: 'Status',
      value: status,
      items: uniqBy(
        CLUSTER_STATUS_OPTIONS.concat(
          (dynamic_status_options ?? []).map((status) => ({
            label: status,
            value: status,
          }))
        ),
        'value'
      ),
      placeholder: 'Filter by status',
      apply,
      chipLabel: 'Status',
    }),
    checkboxFilter({
      urlParam: 'version',
      label: 'Version',
      value: version,
      items: uniqBy(
        CLUSTER_VERSION_OPTIONS.concat(
          (dynamic_version_options ?? []).map((version) => ({
            label: version,
            value: version,
          }))
        ),
        'value'
      ),
      placeholder: 'Filter by version',
      apply,
      chipLabel: 'Version',
    }),
    checkboxFilter({
      urlParam: 'cluster_severity',
      label: 'CVEs severity',
      value: cluster_severity,
      items: CLUSTER_SEVERITY_OPTIONS,
      placeholder: 'Filter by CVEs severity',
      apply,
      chipLabel: 'CVEs severity',
    }),
    checkboxFilter({
      urlParam: 'provider',
      label: 'Provider',
      value: provider,
      items: uniqBy(
        CLUSTER_PROVIDER_OPTIONS.concat(
          (dynamic_provider_options ?? []).map((provider) => ({
            label: provider,
            value: provider,
          }))
        ),
        'value'
      ),
      placeholder: 'Filter by provider',
      apply,
      chipLabel: 'Provider',
    }),
  ];

  const [filterConfig, activeFiltersConfig, areAnyFiltersApplied] =
    setupFilters(filters, meta, CLUSTER_LIST_DEFAULT_FILTERS, apply);

  return (
    <BaseTable
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
