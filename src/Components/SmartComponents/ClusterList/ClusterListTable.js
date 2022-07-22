import React, { Fragment } from 'react';
import BaseTableBody from '../Generic/BaseTableBody';
import {
  CLUSTER_LIST_ALLOWED_PARAMS,
  CLUSTER_LIST_TABLE_COLUMNS,
  CLUSTER_LIST_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import {
  changeClusterListTableParams,
  fetchClusterListTable,
} from '../../../Store/Actions';
import BaseToolbar from '../Generic/BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import NoClusters from '../../PresentationalComponents/EmptyStates/NoClusters';
import { setupFilters } from '../../../Helpers/miscHelper';
import useTextFilter from '../Filters/TextFilter';
import { useUrlBoundParams } from '../../../Helpers/hooks';

const ClusterDetailTable = () => {
  const { clusters, isLoading, meta } = useSelector(
    ({ ClusterListStore }) => ClusterListStore
  );

  const apply = useUrlBoundParams(
    CLUSTER_LIST_ALLOWED_PARAMS,
    meta,
    fetchClusterListTable,
    changeClusterListTableParams
  );

  const { total_items, limit, offset, sort, search } = meta;

  const [filterConfig, activeFiltersConfig] = setupFilters([
    useTextFilter({
      urlParam: 'search',
      label: 'Name',
      placeholder: 'Filter by name',
      value: search,
      apply,
      chipLabel: 'Search term',
    }),
  ]);

  return (
    <Fragment>
      <BaseToolbar
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
        filterConfig={filterConfig}
        activeFiltersConfig={activeFiltersConfig}
      />
      <BaseTableBody
        isLoading={isLoading}
        columns={CLUSTER_LIST_TABLE_COLUMNS}
        rows={clusters.map((row) => CLUSTER_LIST_TABLE_MAPPER(row))}
        emptyState={<NoClusters />}
        sortParam={sort}
        apply={apply}
      />
      <BottomPagination
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
      />
    </Fragment>
  );
};

export default ClusterDetailTable;
