import React, { FormEvent } from 'react';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

export type CheckboxFilterItem = {
  label: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
}

interface CheckboxFilterProps {
  urlParam: string;
  label: string;
  value?: string;
  placeholder: string;
  items: CheckboxFilterItem[];
  chipLabel: string;
  apply: (params: object, replaceState?: boolean) => void;
}

const checkboxFilter =
  ({ urlParam, label, value, placeholder, items, chipLabel, apply }: CheckboxFilterProps) => {
    const onValuesChanged = (values: string[]) => {
      apply({
        [urlParam]: values.length === 0 ? undefined : values.join(','),
        offset: 0,
      });
    };

    const itemsWithFixedIcon = items.map(item => ({
      ...item,
      label: item.icon ? <span>{item.icon} {item.label}</span> : item.label,
      icon: undefined
    }));

    const filterConfig = {
      label,
      type: conditionalFilterType.checkbox,
      urlParam,
      key: urlParam,
      filterValues: {
        onChange: (_event: FormEvent<HTMLInputElement>, values: string[]) => {
          onValuesChanged(values);
        },
        items: itemsWithFixedIcon,
        value: value ? value.split(',') : [],
        placeholder,
      },
    };

    const activeFiltersConfig = {
      isShown: !!value,
      onDelete: (chips: { value: string }[]) => {
        const itemsToRemove = chips.map((chip) => chip.value);

        const newValue = value!
          .split(',')
          .filter((value) => !itemsToRemove.includes(value));

        onValuesChanged(newValue);
      },
      key: urlParam,
      category: chipLabel,
      chips: items
        .filter((item) => value?.split(',').includes(item.value))
        .map((item) => ({ name: item.label, value: item.value })),
    };

    return { filterConfig, activeFiltersConfig };
  };

export default checkboxFilter;
