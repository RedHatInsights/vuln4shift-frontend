import React from 'react';
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
import NoClusters from '../../PresentationalComponents/EmptyStates/NoClusters';
import useTextFilter from '../Filters/TextFilter';
import { useUrlBoundParams } from '../../../Helpers/hooks';
import BaseTable from '../Generic/BaseTable';

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
      isLoading={isLoading}
      rows={clusters.map((row) => CLUSTER_LIST_TABLE_MAPPER(row))}
      columns={CLUSTER_LIST_TABLE_COLUMNS}
      filters={filters}
      meta={meta}
      emptyState={<NoClusters />}
      apply={apply}
    />
  );
};

export default ClusterDetailTable;
