import React from 'react';
import {
  CVE_DETAIL_ALLOWED_PARAMS,
  CVE_DETAIL_TABLE_COLUMNS,
  CVE_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import NoClusters from '../../PresentationalComponents/EmptyStates/NoClusters';
import { useRouteMatch } from 'react-router-dom';
import BaseTable from '../Generic/BaseTable';
import { useUrlBoundParams } from '../../../Helpers/hooks';
import {
  changeCveDetailsTableParams,
  fetchCveDetailTable,
} from '../../../Store/Actions';
import useTextFilter from '../Filters/TextFilter';

const CveDetailTable = () => {
  const match = useRouteMatch();

  const { clusters, isTableLoading, meta } = useSelector(
    ({ CveDetailStore }) => CveDetailStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CVE_DETAIL_ALLOWED_PARAMS,
    defaultParams: meta,
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

  return (
    <BaseTable
      isLoading={isTableLoading}
      rows={clusters.map((row) => CVE_DETAIL_TABLE_MAPPER(row))}
      columns={CVE_DETAIL_TABLE_COLUMNS}
      filters={filters}
      meta={meta}
      emptyState={<NoClusters />}
      apply={apply}
    />
  );
};

export default CveDetailTable;
