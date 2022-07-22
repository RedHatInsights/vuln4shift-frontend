import React, { Fragment, useEffect } from 'react';
import BaseTableBody from '../Generic/BaseTableBody';
import {
  CLUSTER_DETAIL_TABLE_COLUMNS,
  CLUSTER_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClusterDetailTable } from '../../../Store/Actions';
import BaseToolbar from '../Generic/BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import NoCves from '../../PresentationalComponents/EmptyStates/NoCves';
import { useRouteMatch } from 'react-router-dom';

const ClusterDetailTable = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const { cves, total_items, isTableLoading } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  useEffect(() => {
    dispatch(fetchClusterDetailTable(match.params.clusterId));
  }, []);

  return (
    <Fragment>
      <BaseToolbar page={1} perPage={20} itemCount={total_items} />
      <BaseTableBody
        isLoading={isTableLoading}
        columns={CLUSTER_DETAIL_TABLE_COLUMNS}
        rows={cves.map((row) => CLUSTER_DETAIL_TABLE_MAPPER(row))}
        isExpandable
        emptyState={<NoCves />}
      />
      <BottomPagination page={1} perPage={20} itemCount={total_items} />
    </Fragment>
  );
};

export default ClusterDetailTable;
