import React, { Fragment, useEffect } from 'react';
import BaseTable from '../BaseTable';
import {
  CVE_LIST_TABLE_COLUMNS,
  CVE_LIST_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCveListTable } from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import NoCves from '../../PresentationalComponents/EmptyStates/NoCves';

const CveListTable = () => {
  const dispatch = useDispatch();

  const { cves, total_items, isLoading } = useSelector(
    ({ CveListStore }) => CveListStore
  );

  useEffect(() => {
    dispatch(fetchCveListTable());
  }, []);

  return (
    <Fragment>
      <BaseToolbar page={1} perPage={20} itemCount={total_items} />
      <BaseTable
        isLoading={isLoading}
        columns={CVE_LIST_TABLE_COLUMNS}
        rows={cves.map((row) => CVE_LIST_TABLE_MAPPER(row))}
        isExpandable
        emptyState={<NoCves />}
      />
      <BottomPagination page={1} perPage={20} itemCount={total_items} />
    </Fragment>
  );
};

export default CveListTable;
