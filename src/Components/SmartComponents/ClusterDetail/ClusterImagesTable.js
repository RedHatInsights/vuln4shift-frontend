import React from 'react';
import {
  CLUSTER_IMAGES_ALLOWED_PARAMS,
  CLUSTER_IMAGES_DEFAULT_FILTERS,
  CLUSTER_IMAGES_EXPORT_PREFIX,
  CLUSTER_IMAGES_TABLE_COLUMNS,
  CLUSTER_IMAGES_TABLE_MAPPER,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import {
  changeClusterImagesTableParams,
  fetchClusterImagesTable,
} from '../../../Store/Actions';
import { useParams } from 'react-router-dom';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import { setupFilters } from '../../../Helpers/miscHelper';
import useTextFilter from '../Filters/TextFilter';
import BaseTable from '../Generic/BaseTable';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { fetchClusterImages } from '../../../Helpers/apiHelper';

const ClusterImagesTable = () => {
  const params = useParams();

  const { exposed_images, isTableLoading, meta, error } = useSelector(
    ({ ClusterImagesStore }) => ClusterImagesStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CLUSTER_IMAGES_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: params.clusterId,
    fetchAction: fetchClusterImagesTable,
    changeParamsAction: changeClusterImagesTableParams,
  });

  const { search } = meta;

  const onExport = useExport({
    filenamePrefix: CLUSTER_IMAGES_EXPORT_PREFIX,
    fetchAction: fetchClusterImages,
    fetchActionParam: params.clusterId,
    allowedParams: CLUSTER_IMAGES_ALLOWED_PARAMS,
  });

  const filters = [
    useTextFilter({
      urlParam: 'search',
      label: 'Name',
      placeholder: 'Search image name',
      value: search,
      apply,
      chipLabel: 'Search term',
    }),
  ];

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CLUSTER_IMAGES_DEFAULT_FILTERS,
    apply
  );

  return (
    <BaseTable
      isLoading={isTableLoading}
      rows={exposed_images.map((row) => CLUSTER_IMAGES_TABLE_MAPPER(row))}
      columns={CLUSTER_IMAGES_TABLE_COLUMNS}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={<NoMatchingItems items="images" />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
    />
  );
};

export default ClusterImagesTable;
