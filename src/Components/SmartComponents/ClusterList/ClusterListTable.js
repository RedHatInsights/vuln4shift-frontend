import React, { Fragment, useEffect } from 'react';
import BaseTable from '../BaseTable';
import {
  CLUSTER_LIST_TABLE_COLUMNS,
  CLUSTER_LIST_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClusterListTable } from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import NoClusters from '../../PresentationalComponents/EmptyStates/NoClusters';

const ClusterDetailTable = () => {
  const dispatch = useDispatch();
  const { clusters, total_items, isLoading } = useSelector(
    ({ ClusterListStore }) => ClusterListStore
  );

  useEffect(() => {
    dispatch(fetchClusterListTable());
  }, []);

  return (
    <Fragment>
      <BaseToolbar page={1} perPage={20} itemCount={total_items} />
      <BaseTable
        isLoading={isLoading}
        columns={CLUSTER_LIST_TABLE_COLUMNS}
        rows={clusters.map((row) => CLUSTER_LIST_TABLE_MAPPER(row))}
        emptyState={<NoClusters />}
      />
      <BottomPagination page={1} perPage={20} itemCount={total_items} />
    </Fragment>
  );
};

export default ClusterDetailTable;
