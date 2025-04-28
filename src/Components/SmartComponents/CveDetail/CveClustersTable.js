import React from 'react';
import {
  CLUSTER_PROVIDER_OPTIONS,
  CLUSTER_STATUS_OPTIONS,
  CLUSTER_VERSION_OPTIONS,
  CVE_CLUSTERS_ALLOWED_PARAMS,
  CVE_CLUSTERS_DEFAULT_FILTERS,
  CVE_CLUSTERS_EXPORT_PREFIX,
  CVE_CLUSTERS_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { useParams } from 'react-router-dom';
import BaseTable from '../Table/BaseTable';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import {
  changeCveClustersTableColumns,
  changeCveClustersTableParams,
  fetchCveClustersTable,
} from '../../../Store/Actions';
import useTextFilter from '../Filters/TextFilter';
import { setupFilters } from '../../../Helpers/miscHelper';
import { fetchExposedClusters } from '../../../Helpers/apiHelper';
import checkboxFilter from '../Filters/CheckboxFilter';
import { uniqBy } from 'lodash';

const CveClustersTable = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { clusters, isTableLoading, meta, error, columns } = useSelector(
    ({ CveClustersStore }) => CveClustersStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CVE_CLUSTERS_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: params.cveId,
    fetchAction: fetchCveClustersTable,
    changeParamsAction: changeCveClustersTableParams,
  });

  const {
    search,
    status,
    dynamic_status_options,
    version,
    dynamic_version_options,
    provider,
    dynamic_provider_options,
  } = meta;

  const onExport = useExport({
    filenamePrefix: CVE_CLUSTERS_EXPORT_PREFIX,
    fetchAction: fetchExposedClusters,
    fetchActionParam: params.cveId,
    allowedParams: CVE_CLUSTERS_ALLOWED_PARAMS,
  });

  const filters = [
    useTextFilter({
      urlParam: 'search',
      label: 'Name',
      placeholder: 'Filter by name',
      value: search,
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
      chipLabel: 'Version',
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
      chipLabel: 'Provider',
    }),
  ];

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CVE_CLUSTERS_DEFAULT_FILTERS,
    apply
  );

  return (
    <BaseTable
      isLoading={isTableLoading}
      rows={clusters.map((row) => CVE_CLUSTERS_TABLE_MAPPER(row))}
      columns={columns}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={<NoMatchingItems items="clusters" />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
      applyColumns={(columns) =>
        dispatch(changeCveClustersTableColumns(columns))
      }
    />
  );
};

export default CveClustersTable;
