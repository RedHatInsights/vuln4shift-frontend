import React, { Fragment, useEffect, useState } from 'react';
import SkeletonTable from '@redhat-cloud-services/frontend-components/SkeletonTable/SkeletonTable';
import BaseTable from '../BaseTable';
import {
  CLUSTER_DETAIL_TABLE_COLUMNS,
  CLUSTER_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClusterDetailTable } from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import { TableVariant } from '@patternfly/react-table';

const ClusterDetailTable = () => {
  const dispatch = useDispatch();
  const cves = useSelector(({ ClusterDetailStore }) => ClusterDetailStore.cves);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // API response delay simulation
    setTimeout(() => setLoading(false), 1000);

    dispatch(fetchClusterDetailTable());
  }, []);

  return isLoading ? (
    <SkeletonTable
      colSize={CLUSTER_DETAIL_TABLE_COLUMNS.length}
      rowSize={20}
      variant={TableVariant.compact}
    />
  ) : (
    <Fragment>
      <BaseToolbar />
      <BaseTable
        columns={CLUSTER_DETAIL_TABLE_COLUMNS}
        rows={cves.map((row) => CLUSTER_DETAIL_TABLE_MAPPER(row))}
      />
      <BottomPagination page={1} perPage={20} itemCount={20} />
    </Fragment>
  );
};

export default ClusterDetailTable;
