import React from 'react';
import {
  DeclarativeTable,
  setupFilters,
} from '../../../DeclarativeTableFramework';
import {
  CLUSTER_IMAGES_ALLOWED_PARAMS,
  CLUSTER_IMAGES_DEFAULT_FILTERS,
  CLUSTER_IMAGES_EXPORT_PREFIX,
  CLUSTER_IMAGES_TABLE_MAPPER,
  imageTextFilter,
  registryFilter,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeClusterImagesTableColumns,
  changeClusterImagesTableParams,
  fetchClusterImagesTable,
} from '../../../Store/Actions';
import { useParams } from 'react-router-dom';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { fetchClusterImages } from '../../../Helpers/apiHelper';

const ClusterImagesTable = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { exposed_images, isTableLoading, meta, error, columns } = useSelector(
    ({ ClusterImagesStore }) => ClusterImagesStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CLUSTER_IMAGES_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: params.clusterId,
    fetchAction: fetchClusterImagesTable,
    changeParamsAction: changeClusterImagesTableParams,
  });

  const { search, registry, dynamic_registry_options } = meta;

  const onExport = useExport({
    filenamePrefix: CLUSTER_IMAGES_EXPORT_PREFIX,
    fetchAction: fetchClusterImages,
    fetchActionParam: params.clusterId,
    allowedParams: CLUSTER_IMAGES_ALLOWED_PARAMS,
  });

  const filters = [
    imageTextFilter(search, apply),
    registryFilter(registry, dynamic_registry_options, apply),
  ];

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CLUSTER_IMAGES_DEFAULT_FILTERS,
    apply
  );

  return (
    <DeclarativeTable
      isLoading={isTableLoading}
      rows={exposed_images.map((row) => CLUSTER_IMAGES_TABLE_MAPPER(row))}
      columns={columns}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={<NoMatchingItems items="images" />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
      applyColumns={(columns) =>
        dispatch(changeClusterImagesTableColumns(columns))
      }
    />
  );
};

export default ClusterImagesTable;
