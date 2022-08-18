import React from 'react';
import {
  CLUSTER_DETAIL_ALLOWED_PARAMS,
  CLUSTER_DETAIL_DEFAULT_FILTERS,
  CLUSTER_DETAIL_EXPORT_PREFIX,
  CLUSTER_DETAIL_TABLE_COLUMNS,
  CLUSTER_DETAIL_TABLE_MAPPER,
  PUBLISHED_OPTIONS,
  SEVERITY_OPTIONS,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import {
  changeClusterDetailsTableParams,
  fetchClusterDetailTable,
} from '../../../Store/Actions';
import NoCves from '../../PresentationalComponents/EmptyStates/NoCves';
import { useRouteMatch } from 'react-router-dom';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import {
  getCvssScoreFromUrlParam,
  setupFilters,
} from '../../../Helpers/miscHelper';
import useTextFilter from '../Filters/TextFilter';
import useRangeFilter from '../Filters/RangeFilter';
import checkboxFilter from '../Filters/CheckboxFilter';
import radioFilter from '../Filters/RadioFilter';
import BaseTable from '../Generic/BaseTable';
import NoMatchingCves from '../../PresentationalComponents/EmptyStates/NoMatchingCves';
import { fetchClusterCves } from '../../../Helpers/apiHelper';

const ClusterDetailTable = () => {
  const match = useRouteMatch();

  const { cves, isTableLoading, meta, error } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CLUSTER_DETAIL_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: match.params.clusterId,
    fetchAction: fetchClusterDetailTable,
    changeParamsAction: changeClusterDetailsTableParams,
  });

  const { search, cvss_score, severity, published } = meta;

  const [cvss_score_min, cvss_score_max] = getCvssScoreFromUrlParam(cvss_score);

  const onExport = useExport(
    CLUSTER_DETAIL_EXPORT_PREFIX,
    fetchClusterCves,
    match.params.clusterId
  );

  const filters = [
    useTextFilter({
      urlParam: 'search',
      label: 'CVE',
      placeholder: 'Search ID or description',
      value: search,
      apply,
      chipLabel: 'Search term',
    }),
    radioFilter({
      urlParam: 'published',
      label: 'Publish date',
      value: published,
      items: PUBLISHED_OPTIONS,
      placeholder: 'Filter by publish date',
      apply,
      chipLabel: 'Publish date',
    }),
    checkboxFilter({
      urlParam: 'severity',
      label: 'Severity',
      value: severity,
      items: SEVERITY_OPTIONS,
      placeholder: 'Filter by severity',
      apply,
      chipLabel: 'Severity',
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
      chipLabel: 'CVSS base score',
    }),
  ];

  const [filterConfig, activeFiltersConfig, areAnyFiltersApplied] =
    setupFilters(filters, meta, CLUSTER_DETAIL_DEFAULT_FILTERS, apply);

  return (
    <BaseTable
      isLoading={isTableLoading}
      isExpandable
      rows={cves.map((row) => CLUSTER_DETAIL_TABLE_MAPPER(row))}
      columns={CLUSTER_DETAIL_TABLE_COLUMNS}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={areAnyFiltersApplied ? <NoMatchingCves /> : <NoCves />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
    />
  );
};

export default ClusterDetailTable;
