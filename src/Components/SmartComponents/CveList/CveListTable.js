import React from 'react';
import {
  CVE_LIST_ALLOWED_PARAMS,
  CVE_LIST_DEFAULT_FILTERS,
  CVE_LIST_TABLE_MAPPER,
  CVE_LIST_EXPORT_PREFIX,
  cveSeverityFilter,
  publishedFilter,
  cvssFilter,
  cveTextFilter,
  affectedFilter,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCveListTable,
  changeCveListTableParams,
  changeCveListTableColumns,
} from '../../../Store/Actions';
import NoMatchingCves from '../../PresentationalComponents/EmptyStates/NoMatchingCves';
import { useUrlBoundParams, useExport } from '../../../Helpers/hooks';
import {
  getCvssScoreFromUrlParam,
  setupFilters,
} from '../../../Helpers/miscHelper';
import BaseTable from '../Table/BaseTable';
import { fetchCves } from '../../../Helpers/apiHelper';

const CveListTable = () => {
  const dispatch = useDispatch();

  const { cves, isLoading, meta, error, columns } = useSelector(
    ({ CveListStore }) => CveListStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CVE_LIST_ALLOWED_PARAMS,
    initialParams: meta,
    fetchAction: fetchCveListTable,
    changeParamsAction: changeCveListTableParams,
  });

  const { search, cvss_score, severity, published, affected_clusters } = meta;

  const [cvss_score_min, cvss_score_max] = getCvssScoreFromUrlParam(cvss_score);

  const onExport = useExport({
    filenamePrefix: CVE_LIST_EXPORT_PREFIX,
    fetchAction: fetchCves,
    allowedParams: CVE_LIST_ALLOWED_PARAMS,
  });

  const filters = [
    cveTextFilter(search),
    publishedFilter(published),
    cveSeverityFilter(severity),
    cvssFilter(cvss_score_min, cvss_score_max),
    affectedFilter(affected_clusters),
  ];

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CVE_LIST_DEFAULT_FILTERS,
    apply
  );

  return (
    <BaseTable
      isLoading={isLoading}
      isExpandable
      rows={cves.map((row) => CVE_LIST_TABLE_MAPPER(row))}
      columns={columns}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={<NoMatchingCves />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
      applyColumns={(columns) => dispatch(changeCveListTableColumns(columns))}
    />
  );
};

export default CveListTable;
