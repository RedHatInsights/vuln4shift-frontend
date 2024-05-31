import React from 'react';
import {
  CLUSTER_CVES_ALLOWED_PARAMS,
  CLUSTER_CVES_DEFAULT_FILTERS,
  CLUSTER_CVES_EXPORT_PREFIX,
  CLUSTER_CVES_TABLE_MAPPER,
  PUBLISHED_OPTIONS,
  SEVERITY_OPTIONS,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeClusterCvesTableColumns,
  changeClusterCvesTableParams,
  fetchClusterCvesTable,
} from '../../../Store/Actions';
import { useParams } from 'react-router-dom';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import {
  getCvssScoreFromUrlParam,
  setupFilters,
} from '../../../Helpers/miscHelper';
import useTextFilter from '../Filters/TextFilter';
import useRangeFilter from '../Filters/RangeFilter';
import checkboxFilter from '../Filters/CheckboxFilter';
import radioFilter from '../Filters/RadioFilter';
import BaseTable from '../Table/BaseTable';
import NoMatchingCves from '../../PresentationalComponents/EmptyStates/NoMatchingCves';
import { fetchClusterCves } from '../../../Helpers/apiHelper';

const ClusterCvesTable = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { cves, isTableLoading, meta, error, columns } = useSelector(
    ({ ClusterCvesStore }) => ClusterCvesStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CLUSTER_CVES_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: params.clusterId,
    fetchAction: fetchClusterCvesTable,
    changeParamsAction: changeClusterCvesTableParams,
  });

  const { search, cvss_score, severity, published } = meta;

  const [cvss_score_min, cvss_score_max] = getCvssScoreFromUrlParam(cvss_score);

  const onExport = useExport({
    filenamePrefix: CLUSTER_CVES_EXPORT_PREFIX,
    fetchAction: fetchClusterCves,
    fetchActionParam: params.clusterId,
    allowedParams: CLUSTER_CVES_ALLOWED_PARAMS,
  });

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

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CLUSTER_CVES_DEFAULT_FILTERS,
    apply
  );

  return (
    <BaseTable
      isLoading={isTableLoading}
      isExpandable
      rows={cves.map((row) => CLUSTER_CVES_TABLE_MAPPER(row))}
      columns={columns}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={<NoMatchingCves />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
      applyColumns={(columns) =>
        dispatch(changeClusterCvesTableColumns(columns))
      }
    />
  );
};

export default ClusterCvesTable;
