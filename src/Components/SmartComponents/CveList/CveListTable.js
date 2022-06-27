import React, { Fragment } from 'react';
import BaseTable from '../BaseTable';
import {
  CVE_LIST_ALLOWED_PARAMS,
  CVE_LIST_TABLE_COLUMNS,
  CVE_LIST_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import {
  fetchCveListTable,
  changeCveListTableParams,
} from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import NoCves from '../../PresentationalComponents/EmptyStates/NoCves';
import { useUrlBoundParams } from '../../../Helpers/hooks';

const CveListTable = () => {
  const { cves, isLoading, meta } = useSelector(
    ({ CveListStore }) => CveListStore
  );

  const apply = useUrlBoundParams(
    CVE_LIST_ALLOWED_PARAMS,
    meta,
    fetchCveListTable,
    changeCveListTableParams
  );

  const { total_items, limit, offset, sort } = meta;

  return (
    <Fragment>
      <BaseToolbar
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
      />
      <BaseTable
        isLoading={isLoading}
        columns={CVE_LIST_TABLE_COLUMNS}
        rows={cves.map((row) => CVE_LIST_TABLE_MAPPER(row))}
        isExpandable
        emptyState={<NoCves />}
        sortParam={sort}
        apply={apply}
      />
      <BottomPagination
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
      />
    </Fragment>
  );
};

export default CveListTable;
