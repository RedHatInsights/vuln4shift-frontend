import React from 'react';
import {
  CVE_LIST_ALLOWED_PARAMS,
  CVE_LIST_DEFAULT_FILTERS,
  CVE_LIST_TABLE_MAPPER,
  EXPOSED_CLUSTERS_OPTIONS,
  PUBLISHED_OPTIONS,
  SEVERITY_OPTIONS,
  CVE_LIST_EXPORT_PREFIX,
  EXPOSED_IMAGES_FEATURE_FLAG,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCveListTable,
  changeCveListTableParams,
  changeCveListTableColumns,
} from '../../../Store/Actions';
import NoMatchingCves from '../../PresentationalComponents/EmptyStates/NoMatchingCves';
import {
  useUrlBoundParams,
  useExport,
  useFeatureFlag,
} from '../../../Helpers/hooks';
import useTextFilter from '../Filters/TextFilter';
import useRangeFilter from '../Filters/RangeFilter';
import {
  getCvssScoreFromUrlParam,
  setupFilters,
} from '../../../Helpers/miscHelper';
import checkboxFilter from '../Filters/CheckboxFilter';
import radioFilter from '../Filters/RadioFilter';
import BaseTable from '../Generic/BaseTable';
import { fetchCves } from '../../../Helpers/apiHelper';

const CveListTable = () => {
  const dispatch = useDispatch();

  const areExposedImagesEnabled = useFeatureFlag(EXPOSED_IMAGES_FEATURE_FLAG);

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
      rows={cves.map((row) =>
        CVE_LIST_TABLE_MAPPER(row, areExposedImagesEnabled)
      )}
      columns={columns.filter(
        (columns) =>
          areExposedImagesEnabled || columns.title !== 'Exposed images'
      )}
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
