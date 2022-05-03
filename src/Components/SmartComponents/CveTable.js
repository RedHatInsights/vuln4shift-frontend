import React, { Fragment, useEffect, useState } from 'react';
import SkeletonTable from '@redhat-cloud-services/frontend-components/SkeletonTable/SkeletonTable';
import BaseTable from './BaseTable';
import {
  CVE_LIST_TABLE_COLUMNS,
  CVE_LIST_TABLE_MAPPER,
} from '../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCveListTable } from '../../Store/Actions';
import BaseToolbar from './BaseToolbar';
import BottomPagination from '../PresentationalComponents/BottomPagination';

const CveTable = () => {
  const dispatch = useDispatch();
  const cves = useSelector(({ CveListStore }) => CveListStore.cves);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // API response delay simulation
    setTimeout(() => setLoading(false), 1000);

    dispatch(fetchCveListTable());
  }, []);

  return isLoading ? (
    <SkeletonTable colSize={CVE_LIST_TABLE_COLUMNS.length} rowSize={20} />
  ) : (
    <Fragment>
      <BaseToolbar />
      <BaseTable
        columns={CVE_LIST_TABLE_COLUMNS}
        rows={cves.map((row) => CVE_LIST_TABLE_MAPPER(row))}
      />
      <BottomPagination />
    </Fragment>
  );
};

export default CveTable;
