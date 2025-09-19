import React, { MouseEvent, useState } from 'react';
import { ColumnManagementModal, ColumnManagementModalColumn } from '@patternfly/react-component-groups';
import isEqual from 'lodash/isEqual';
import { ConditionalFilterProps, FilterChipsFilter, FilterChipsProps } from '@redhat-cloud-services/frontend-components';
import { DeclarativeTableColumn } from './DeclarativeTable';

export const useLocalStorage = (key: string) => {
  const [sessionValue, setSessionValue] = useState(localStorage.getItem(key));

  const setValue = (newValue: string) => {
    setSessionValue(newValue);
    localStorage.setItem(key, newValue);
  };

  const removeValue = () => {
    localStorage.removeItem(key);
  }

  return [sessionValue, setValue, removeValue];
};

export const useColumnManagement = (
  columns: DeclarativeTableColumn[],
  onApply: (newColumns: DeclarativeTableColumn[]) => void
): [React.ReactNode, (isOpen: boolean) => void] => {
  const [isModalOpen, setModalOpen] = useState(false);

  return [
    <ColumnManagementModal
      appliedColumns={columns.map(column => ({ ...column, isShownByDefault: column.isShownByDefault ?? false }))}
      applyColumns={(newColumns) => onApply(newColumns)}
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      key="column-mgmt-modal"
    />,
    setModalOpen,
  ];
};

interface AreAnyFiltersAppliedArgs {
  currentParams: { [key: string]: any };
  defaultParams: { [key: string]: any };
  filterParams: string[];
}

export const areAnyFiltersApplied = ({
  currentParams,
  defaultParams,
  filterParams,
}: AreAnyFiltersAppliedArgs) => {
  // filter out params which have nothing to do with filtering, like page, sort, etc.
  const reducedParams = filterParams.reduce(
    (acc, param) => ({
      ...acc,
      ...(currentParams[param] && { [param]: currentParams[param] }),
    }),
    {}
  );

  return !isEqual(reducedParams, defaultParams);
};

export const setupFilters = (
  filters: { filterConfig: any, activeFiltersConfig: any }[],
  meta: { limit: number, [key: string]: any },
  defaultFilters: object,
  apply: (params: object, replaceState?: boolean) => void
) => {
  if (filters.length === 0) {
    return [undefined, undefined];
  }

  const filterKeys = filters.map((item) => item.filterConfig.key);

  const showDeleteButton = areAnyFiltersApplied({
    currentParams: meta,
    defaultParams: defaultFilters,
    filterParams: filterKeys,
  });

  const filterConfig: ConditionalFilterProps = { items: [] };
  const activeFiltersConfig: FilterChipsProps = {
    filters: [],
    onDelete: (_event: MouseEvent, categories: FilterChipsFilter[], isReset: boolean | undefined) =>
      isReset
        ? apply({ ...defaultFilters, offset: 0, limit: meta.limit }, true)
        : categories.forEach((category: any) => category.onDelete(category.chips)),
    deleteTitle: 'Reset filter',
    showDeleteButton,
  };

  filters.forEach((filter) => {
    filterConfig.items.push(filter.filterConfig);

    filter.activeFiltersConfig?.isShown &&
      activeFiltersConfig.filters!.push(filter.activeFiltersConfig);
  });

  return [filterConfig, activeFiltersConfig, showDeleteButton];
};

export const decodeRangeFilter = (range?: string, defaultRange = { min: 0, max: 10 }): [number, number] => {
  if (!range?.includes(',')) {
    range = ',';
  }

  const [urlMin, urlMax] = range.split(',');

  const min = +urlMin || defaultRange.min;
  const max = +urlMax || defaultRange.max;

  return [min, max];
};
