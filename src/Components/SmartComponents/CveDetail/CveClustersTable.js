import React from 'react';
import {
  DeclarativeTable,
  setupFilters,
} from '../../../DeclarativeTableFramework';
import {
  clusterStatusFilter,
  clusterTextFilter,
  CVE_CLUSTERS_ALLOWED_PARAMS,
  CVE_CLUSTERS_DEFAULT_FILTERS,
  CVE_CLUSTERS_EXPORT_PREFIX,
  CVE_CLUSTERS_TABLE_MAPPER,
  providerFilter,
  versionFilter,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { useParams } from 'react-router-dom';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import {
  changeCveClustersTableColumns,
  changeCveClustersTableParams,
  fetchCveClustersTable,
} from '../../../Store/Actions';
import { fetchExposedClusters } from '../../../Helpers/apiHelper';

const CveClustersTable = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { clusters, isTableLoading, meta, error, columns } = useSelector(
    ({ CveClustersStore }) => CveClustersStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CVE_CLUSTERS_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: params.cveId,
    fetchAction: fetchCveClustersTable,
    changeParamsAction: changeCveClustersTableParams,
  });

  const {
    search,
    status,
    dynamic_status_options,
    version,
    dynamic_version_options,
    provider,
    dynamic_provider_options,
  } = meta;

  const onExport = useExport({
    filenamePrefix: CVE_CLUSTERS_EXPORT_PREFIX,
    fetchAction: fetchExposedClusters,
    fetchActionParam: params.cveId,
    allowedParams: CVE_CLUSTERS_ALLOWED_PARAMS,
  });

  const filters = [
    clusterTextFilter(search, apply),
    clusterStatusFilter(status, dynamic_status_options, apply),
    versionFilter(version, dynamic_version_options, apply),
    providerFilter(provider, dynamic_provider_options, apply),
  ];

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CVE_CLUSTERS_DEFAULT_FILTERS,
    apply
  );

  return (
    <DeclarativeTable
      isLoading={isTableLoading}
      rows={clusters.map((row) => CVE_CLUSTERS_TABLE_MAPPER(row))}
      columns={columns}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={<NoMatchingItems items="clusters" />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
      applyColumns={(columns) =>
        dispatch(changeCveClustersTableColumns(columns))
      }
    />
  );
};

export default CveClustersTable;
