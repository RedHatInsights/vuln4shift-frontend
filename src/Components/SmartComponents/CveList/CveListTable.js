import React, { Fragment, useEffect, useState } from 'react';
import BaseTable from '../BaseTable';
import {
  CVE_LIST_TABLE_COLUMNS,
  CVE_LIST_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCveListTable } from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';

const CveListTable = () => {
  const dispatch = useDispatch();

  const { cves, total_items } = useSelector(({ CveListStore }) => CveListStore);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // API response delay simulation
    setTimeout(() => {
      dispatch(fetchCveListTable());
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Fragment>
      <BaseToolbar page={1} perPage={20} itemCount={total_items} />
      <BaseTable
        isLoading={isLoading}
        columns={CVE_LIST_TABLE_COLUMNS}
        rows={cves.map((row) => CVE_LIST_TABLE_MAPPER(row))}
        isExpandable
      />
      <BottomPagination page={1} perPage={20} itemCount={total_items} />
    </Fragment>
  );
};

export default CveListTable;
