import React, { Fragment, useEffect } from 'react';
import BaseTable from '../BaseTable';
import {
  CVE_DETAIL_TABLE_COLUMNS,
  CVE_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCveDetailTable } from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import NoClusters from '../../PresentationalComponents/EmptyStates/NoClusters';
import { useRouteMatch } from 'react-router-dom';

const CveDetailTable = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const { clusters, total_items, isTableLoading } = useSelector(
    ({ CveDetailStore }) => CveDetailStore
  );

  useEffect(() => {
    dispatch(fetchCveDetailTable(match.params.cveId));
  }, []);

  return (
    <Fragment>
      <BaseToolbar page={1} perPage={20} itemCount={total_items} />
      <BaseTable
        isLoading={isTableLoading}
        columns={CVE_DETAIL_TABLE_COLUMNS}
        rows={clusters.map((row) => CVE_DETAIL_TABLE_MAPPER(row))}
        emptyState={<NoClusters />}
      />
      <BottomPagination page={1} perPage={20} itemCount={total_items} />
    </Fragment>
  );
};

export default CveDetailTable;
