import React from 'react';
import {
  CLUSTER_PROVIDER_OPTIONS,
  CLUSTER_STATUS_OPTIONS,
  CLUSTER_VERSION_OPTIONS,
  CVE_DETAIL_ALLOWED_PARAMS,
  CVE_DETAIL_DEFAULT_FILTERS,
  CVE_DETAIL_EXPORT_PREFIX,
  CVE_DETAIL_TABLE_COLUMNS,
  CVE_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import NoMatchingClusters from '../../PresentationalComponents/EmptyStates/NoMatchingClusters';
import { useParams } from 'react-router-dom';
import BaseTable from '../Generic/BaseTable';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import {
  changeCveDetailsTableParams,
  fetchCveDetailTable,
} from '../../../Store/Actions';
import useTextFilter from '../Filters/TextFilter';
import { setupFilters } from '../../../Helpers/miscHelper';
import { fetchExposedClusters } from '../../../Helpers/apiHelper';
import checkboxFilter from '../Filters/CheckboxFilter';
import { uniqBy } from 'lodash';

const CveDetailTable = () => {
  const params = useParams();

  const { clusters, isTableLoading, meta, error } = useSelector(
    ({ CveDetailStore }) => CveDetailStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CVE_DETAIL_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: params.cveId,
    fetchAction: fetchCveDetailTable,
    changeParamsAction: changeCveDetailsTableParams,
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
    filenamePrefix: CVE_DETAIL_EXPORT_PREFIX,
    fetchAction: fetchExposedClusters,
    fetchActionParam: params.cveId,
    allowedParams: CVE_DETAIL_ALLOWED_PARAMS,
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

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CVE_DETAIL_DEFAULT_FILTERS,
    apply
  );

  return (
    <BaseTable
      isLoading={isTableLoading}
      rows={clusters.map((row) => CVE_DETAIL_TABLE_MAPPER(row))}
      columns={CVE_DETAIL_TABLE_COLUMNS}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={<NoMatchingClusters />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
    />
  );
};

export default CveDetailTable;
