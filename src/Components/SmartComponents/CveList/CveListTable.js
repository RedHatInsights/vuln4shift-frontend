import React, { Fragment } from 'react';
import BaseTable from '../BaseTable';
import {
  CVE_LIST_ALLOWED_PARAMS,
  CVE_LIST_TABLE_COLUMNS,
  CVE_LIST_TABLE_MAPPER,
  SEVERITY_OPTIONS,
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
import useTextFilter from '../Filters/TextFilter';
import useRangeFilter from '../Filters/RangeFilter';
import { getCvssScoreFromUrlParam } from '../../../Helpers/miscHelper';
import checkboxFilter from '../Filters/CheckboxFilter';

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

  const { total_items, limit, offset, sort, search, cvss_score, severity } =
    meta;
  const [cvss_score_min, cvss_score_max] = getCvssScoreFromUrlParam(cvss_score);

  return (
    <Fragment>
      <BaseToolbar
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
        filterConfig={{
          items: [
            useTextFilter({
              urlParam: 'search',
              label: 'CVE',
              placeholder: 'Search ID or description',
              value: search,
              apply,
            }),
            useRangeFilter({
              urlParam: 'cvss_score',
              label: 'CVSS score',
              minMaxLabels: {
                min: 'Min CVSS',
                max: 'Max CVSS',
              },
              range: {
                min: 0,
                max: 10,
              },
              value: {
                min: cvss_score_min,
                max: cvss_score_max,
              },
              placeholder: 'Filter by CVSS score range',
              apply,
            }),
            checkboxFilter({
              urlParam: 'severity',
              label: 'Severity',
              value: severity,
              items: SEVERITY_OPTIONS,
              placeholder: 'Filter by severity',
              apply,
            }),
          ],
        }}
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
