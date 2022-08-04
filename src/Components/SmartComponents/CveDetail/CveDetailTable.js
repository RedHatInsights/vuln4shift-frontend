import React from 'react';
import {
  CVE_DETAIL_ALLOWED_PARAMS,
  CVE_DETAIL_DEFAULT_FILTERS,
  CVE_DETAIL_TABLE_COLUMNS,
  CVE_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import NoMatchingClusters from '../../PresentationalComponents/EmptyStates/NoMatchingClusters';
import NoExposedClusters from '../../PresentationalComponents/EmptyStates/NoExposedClusters';
import { useRouteMatch } from 'react-router-dom';
import BaseTable from '../Generic/BaseTable';
import { useUrlBoundParams } from '../../../Helpers/hooks';
import {
  changeCveDetailsTableParams,
  fetchCveDetailTable,
} from '../../../Store/Actions';
import useTextFilter from '../Filters/TextFilter';
import { setupFilters } from '../../../Helpers/miscHelper';

const CveDetailTable = () => {
  const match = useRouteMatch();

  const { clusters, isTableLoading, meta } = useSelector(
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
      emptyState={
        areAnyFiltersApplied ? <NoMatchingClusters /> : <NoExposedClusters />
      }
      apply={apply}
    />
  );
};

export default CveDetailTable;
