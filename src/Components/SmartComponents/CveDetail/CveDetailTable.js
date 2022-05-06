import React, { Fragment, useEffect, useState } from 'react';
import BaseTable from '../BaseTable';
import {
  CVE_DETAIL_TABLE_COLUMNS,
  CVE_DETAIL_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCveDetailTable } from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';

const CveDetailTable = () => {
  const dispatch = useDispatch();
  const { clusters, total_items } = useSelector(
    ({ CveDetailStore }) => CveDetailStore
  );

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // API response delay simulation
    setTimeout(() => {
      dispatch(fetchCveDetailTable());
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Fragment>
      <BaseToolbar page={1} perPage={20} itemCount={total_items} />
      <BaseTable
        isLoading={isLoading}
        columns={CVE_DETAIL_TABLE_COLUMNS}
        rows={clusters.map((row) => CVE_DETAIL_TABLE_MAPPER(row))}
      />
      <BottomPagination page={1} perPage={20} itemCount={total_items} />
    </Fragment>
  );
};

export default CveDetailTable;
