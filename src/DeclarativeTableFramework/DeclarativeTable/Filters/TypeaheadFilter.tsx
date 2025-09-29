import React, { ReactNode, useState } from 'react';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';
import TypeaheadFilterComponent from './TypeaheadFilterComponent';

export type TypeaheadFilterItem = {
  value: string,
  label: ReactNode,
  isDisabled?: boolean,
  className?: string
};

interface TypeaheadFilterProps {
  urlParam: string;
  label: string;
  value: string;
  placeholder: string;
  chipLabel: string;
  noItemsLabel?: string;
  apply: (params: object, replaceState?: boolean ) => void;
  fetchItems: (query: string) => Promise<string[]>;
};

const useTypeaheadFilter =
  ({ urlParam, label, value, placeholder, chipLabel, noItemsLabel = "No items", apply, fetchItems }: TypeaheadFilterProps) => {
    const [items, setItems] = useState<TypeaheadFilterItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const onValuesChanged = (values: string[]) => {
      apply({
        [urlParam]: values.length === 0 ? undefined : values.join(','),
        offset: 0,
      });
    };

    const filterConfig = {
      label,
      type: conditionalFilterType.custom,
      urlParam,
      key: urlParam,
      filterValues: {
        children:
          <TypeaheadFilterComponent
            inputValue={inputValue}
            setInputValue={setInputValue}
            items={items}
            setItems={setItems}
            fetchItems={fetchItems}
            onValuesChanged={onValuesChanged}
            value={value}
            placeholder={placeholder}
            noItemsLabel={noItemsLabel}
          />
      },
    };

    const activeFiltersConfig = {
      isShown: !!value,
      onDelete: (chips: { value: string }[]) => {
        const itemsToRemove = chips.map((chip) => chip.value);

        const newValue = value
          .split(',')
          .filter((value) => !itemsToRemove.includes(value));

        onValuesChanged(newValue);
      },
      key: urlParam,
      category: chipLabel,
      chips: items // TODO: Entered text filters out chips
        .filter((item) => value?.split(',').includes(item.value))
        .map((item) => ({ name: item.label, value: item.value })),
    };

    return { filterConfig, activeFiltersConfig };
  };

export default useTypeaheadFilter;
