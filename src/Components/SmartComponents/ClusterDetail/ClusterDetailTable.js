import React from 'react';
import {
  CLUSTER_DETAIL_ALLOWED_PARAMS,
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
import { useUrlBoundParams } from '../../../Helpers/hooks';
import { getCvssScoreFromUrlParam } from '../../../Helpers/miscHelper';
import useTextFilter from '../Filters/TextFilter';
import useRangeFilter from '../Filters/RangeFilter';
import checkboxFilter from '../Filters/CheckboxFilter';
import radioFilter from '../Filters/RadioFilter';
import BaseTable from '../Generic/BaseTable';

const ClusterDetailTable = () => {
  const match = useRouteMatch();

  const { cves, isTableLoading, meta } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CLUSTER_DETAIL_ALLOWED_PARAMS,
    defaultParams: meta,
    additionalParam: match.params.clusterId,
    fetchAction: fetchClusterDetailTable,
    changeParamsAction: changeClusterDetailsTableParams,
  });

  const { search, cvss_score, severity, published } = meta;

  const [cvss_score_min, cvss_score_max] = getCvssScoreFromUrlParam(cvss_score);

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
    }),
  ];

  return (
    <BaseTable
      isLoading={isTableLoading}
      isExpandable
      rows={cves.map((row) => CLUSTER_DETAIL_TABLE_MAPPER(row))}
      columns={CLUSTER_DETAIL_TABLE_COLUMNS}
      filters={filters}
      meta={meta}
      emptyState={<NoCves />}
      apply={apply}
    />
  );
};

export default ClusterDetailTable;
