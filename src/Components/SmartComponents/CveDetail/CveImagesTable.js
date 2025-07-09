import React from 'react';
import { DeclarativeTable, setupFilters } from 'declarative-table';
import {
  CVE_IMAGES_DEFAULT_FILTERS,
  CVE_IMAGES_EXPORT_PREFIX,
  CVE_IMAGES_TABLE_MAPPER,
  CVE_IMAGES_ALLOWED_PARAMS,
  imageTextFilter,
  registryFilter,
} from '../../../Helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { useParams } from 'react-router-dom';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import {
  changeCveImagesTableColumns,
  changeCveImagesTableParams,
  fetchCveImagesTable,
} from '../../../Store/Actions';
import { fetchExposedImages } from '../../../Helpers/apiHelper';

const CveImagesTable = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { images, isTableLoading, meta, error, columns } = useSelector(
    ({ CveImagesStore }) => CveImagesStore
  );

  const apply = useUrlBoundParams({
    allowedParams: CVE_IMAGES_ALLOWED_PARAMS,
    initialParams: meta,
    additionalParam: params.cveId,
    fetchAction: fetchCveImagesTable,
    changeParamsAction: changeCveImagesTableParams,
  });

  const { search, registry, dynamic_registry_options } = meta;

  const onExport = useExport({
    filenamePrefix: CVE_IMAGES_EXPORT_PREFIX,
    fetchAction: fetchExposedImages,
    fetchActionParam: params.cveId,
    allowedParams: CVE_IMAGES_ALLOWED_PARAMS,
  });

  const filters = [
    imageTextFilter(search, apply),
    registryFilter(registry, dynamic_registry_options, apply),
  ];

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CVE_IMAGES_DEFAULT_FILTERS,
    apply
  );

  return (
    <DeclarativeTable
      isLoading={isTableLoading}
      rows={images.map((row) => CVE_IMAGES_TABLE_MAPPER(row))}
      columns={columns}
      filterConfig={filterConfig}
      activeFiltersConfig={activeFiltersConfig}
      meta={meta}
      error={error}
      emptyState={<NoMatchingItems items="images" />}
      apply={apply}
      onExport={(format) => onExport(format, meta)}
      applyColumns={(columns) => dispatch(changeCveImagesTableColumns(columns))}
    />
  );
};

export default CveImagesTable;
