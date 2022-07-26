import React from 'react';
import {
  CVE_LIST_ALLOWED_PARAMS,
  CVE_LIST_TABLE_COLUMNS,
  CVE_LIST_TABLE_MAPPER,
  EXPOSED_CLUSTERS_OPTIONS,
  PUBLISHED_OPTIONS,
  SEVERITY_OPTIONS,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import {
  fetchCveListTable,
  changeCveListTableParams,
} from '../../../Store/Actions';
import NoCves from '../../PresentationalComponents/EmptyStates/NoCves';
import { useUrlBoundParams } from '../../../Helpers/hooks';
import useTextFilter from '../Filters/TextFilter';
import useRangeFilter from '../Filters/RangeFilter';
import { getCvssScoreFromUrlParam } from '../../../Helpers/miscHelper';
import checkboxFilter from '../Filters/CheckboxFilter';
import radioFilter from '../Filters/RadioFilter';
import BaseTable from '../Generic/BaseTable';

const CveListTable = () => {
  const { cves, isLoading, meta } = useSelector(
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
    }),
    checkboxFilter({
      urlParam: 'affected_clusters',
      label: 'Exposed clusters',
      value: affected_clusters,
      items: EXPOSED_CLUSTERS_OPTIONS,
      placeholder: 'Filter by exposed clusters',
      apply,
      chipLabel: 'Exposed clusters',
    }),
  ];

  return (
    <BaseTable
      isLoading={isLoading}
      isExpandable
      rows={cves.map((row) => CVE_LIST_TABLE_MAPPER(row))}
      columns={CVE_LIST_TABLE_COLUMNS}
      filters={filters}
      meta={meta}
      emptyState={<NoCves />}
      apply={apply}
    />
  );
};

export default CveListTable;
