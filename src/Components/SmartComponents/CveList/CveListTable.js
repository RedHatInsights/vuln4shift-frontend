import React, { Fragment, useEffect } from 'react';
import BaseTable from '../BaseTable';
import {
  CVE_LIST_ALLOWED_PARAMS,
  CVE_LIST_TABLE_COLUMNS,
  CVE_LIST_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCveListTable,
  changeCveListTableParams,
} from '../../../Store/Actions';
import BaseToolbar from '../BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import NoCves from '../../PresentationalComponents/EmptyStates/NoCves';
import { useUrlParams } from '../../../Helpers/hooks';
import useDeepCompareEffect from 'use-deep-compare-effect';

const CveListTable = () => {
  const dispatch = useDispatch();
  const [urlParameters, setUrlParams] = useUrlParams(CVE_LIST_ALLOWED_PARAMS);

  const { cves, isLoading, meta } = useSelector(
    ({ CveListStore }) => CveListStore
  );

  const { total_items, limit, offset } = meta;

  useEffect(() => {
    setUrlParams(meta);
  }, []);

  useDeepCompareEffect(() => {
    dispatch(fetchCveListTable(urlParameters));
  }, [urlParameters]);

  const apply = (params) => {
    setUrlParams(params);
    dispatch(changeCveListTableParams(urlParameters));
  };

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
