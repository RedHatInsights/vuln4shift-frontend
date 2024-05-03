import React from 'react';
import {
  CVE_IMAGES_DEFAULT_FILTERS,
  CVE_IMAGES_EXPORT_PREFIX,
  CVE_IMAGES_TABLE_COLUMNS,
  CVE_IMAGES_TABLE_MAPPER,
  CVE_IMAGES_ALLOWED_PARAMS,
  IMAGE_REGISTRY_OPTIONS,
} from '../../../Helpers/constants';
import { useSelector } from 'react-redux';
import NoMatchingItems from '../../PresentationalComponents/EmptyStates/NoMatchingItems';
import { useParams } from 'react-router-dom';
import BaseTable from '../Generic/BaseTable';
import { useExport, useUrlBoundParams } from '../../../Helpers/hooks';
import {
  changeCveImagesTableParams,
  fetchCveImagesTable,
} from '../../../Store/Actions';
import useTextFilter from '../Filters/TextFilter';
import { setupFilters } from '../../../Helpers/miscHelper';
import { fetchExposedImages } from '../../../Helpers/apiHelper';
import checkboxFilter from '../Filters/CheckboxFilter';
import { uniqBy } from 'lodash';

const CveImagesTable = () => {
  const params = useParams();

  const { images, isTableLoading, meta, error } = useSelector(
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
    useTextFilter({
      urlParam: 'search',
      label: 'Name',
      placeholder: 'Filter by name',
      value: search,
      apply,
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
      apply,
      chipLabel: 'Registry',
    }),
  ];

  const [filterConfig, activeFiltersConfig] = setupFilters(
    filters,
    meta,
    CVE_IMAGES_DEFAULT_FILTERS,
    apply
  );

  return (
    <BaseTable
      isLoading={isTableLoading}
      rows={images.map((row) => CVE_IMAGES_TABLE_MAPPER(row))}
      columns={CVE_IMAGES_TABLE_COLUMNS}
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

export default CveImagesTable;
