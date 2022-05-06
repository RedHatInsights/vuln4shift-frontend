import React, { Fragment, useEffect, useState } from 'react';
import BaseTable from '../BaseTable';
import {
  CLUSTER_DETAIL_TABLE_COLUMNS,
  CLUSTER_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClusterDetailTable } from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';

const ClusterDetailTable = () => {
  const dispatch = useDispatch();
  const { cves, total_items } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // API response delay simulation
    setTimeout(() => {
      dispatch(fetchClusterDetailTable());
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Fragment>
      <BaseToolbar page={1} perPage={20} itemCount={total_items} />
      <BaseTable
        isLoading={isLoading}
        columns={CLUSTER_DETAIL_TABLE_COLUMNS}
        rows={cves.map((row) => CLUSTER_DETAIL_TABLE_MAPPER(row))}
        isExpandable
      />
      <BottomPagination page={1} perPage={20} itemCount={total_items} />
    </Fragment>
  );
};

export default ClusterDetailTable;
