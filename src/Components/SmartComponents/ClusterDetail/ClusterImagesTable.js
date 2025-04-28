import React from 'react';
import {
  CLUSTER_IMAGES_ALLOWED_PARAMS,
  CLUSTER_IMAGES_DEFAULT_FILTERS,
  CLUSTER_IMAGES_EXPORT_PREFIX,
  CLUSTER_IMAGES_TABLE_MAPPER,
  IMAGE_REGISTRY_OPTIONS,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeClusterImagesTableColumns,
  changeClusterImagesTableParams,
  fetchClusterImagesTable,
} from '../../../Store/Actions';
import { useParams } from 'react-router-dom';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import { setupFilters } from '../../../Helpers/miscHelper';
import useTextFilter from '../Filters/TextFilter';
import BaseTable from '../Table/BaseTable';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { fetchClusterImages } from '../../../Helpers/apiHelper';
import { uniqBy } from 'lodash';
import checkboxFilter from '../Filters/CheckboxFilter';

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
    useTextFilter({
      urlParam: 'search',
      label: 'Name',
      placeholder: 'Search image name',
      value: search,
      chipLabel: 'Search term',
    }),
    checkboxFilter({
      urlParam: 'registry',
      label: 'Registry',
      value: registry,
      items: uniqBy(
        IMAGE_REGISTRY_OPTIONS.concat(
          (dynamic_registry_options ?? []).map((registry) => ({
            label: registry,
            value: registry,
          }))
        ),
        'value'
      ),
      placeholder: 'Filter by registry',
      chipLabel: 'Registry',
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
