import React from 'react';
import {
  CVE_DETAIL_ALLOWED_PARAMS,
  CVE_DETAIL_DEFAULT_FILTERS,
  CVE_DETAIL_EXPORT_PREFIX,
  CVE_DETAIL_TABLE_COLUMNS,
  CVE_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import NoMatchingClusters from '../../PresentationalComponents/EmptyStates/NoMatchingClusters';
import NoExposedClusters from '../../PresentationalComponents/EmptyStates/NoExposedClusters';
import { useRouteMatch } from 'react-router-dom';
import BaseTable from '../Generic/BaseTable';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import {
  changeCveDetailsTableParams,
  fetchCveDetailTable,
} from '../../../Store/Actions';
import useTextFilter from '../Filters/TextFilter';
import { setupFilters } from '../../../Helpers/miscHelper';
import { fetchExposedClusters } from '../../../Helpers/apiHelper';

const CveDetailTable = () => {
  const match = useRouteMatch();

  const { clusters, isTableLoading, meta, error } = useSelector(
    ({ CveDetailStore }) => CveDetailStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CVE_DETAIL_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: match.params.cveId,
    fetchAction: fetchCveDetailTable,
    changeParamsAction: changeCveDetailsTableParams,
  });

  const { search } = meta;

  const onExport = useExport(
    CVE_DETAIL_EXPORT_PREFIX,
    fetchExposedClusters,
    match.params.cveId
  );

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
    setupFilters(filters, meta, CVE_DETAIL_DEFAULT_FILTERS, apply);

  return (
    <BaseTable
      isLoading={isTableLoading}
      rows={clusters.map((row) => CVE_DETAIL_TABLE_MAPPER(row))}
      columns={CVE_DETAIL_TABLE_COLUMNS}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={
        areAnyFiltersApplied ? <NoMatchingClusters /> : <NoExposedClusters />
      }
      apply={apply}
      onExport={(format) => onExport(format, meta)}
    />
  );
};

export default CveDetailTable;
