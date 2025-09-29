import React, { FormEvent } from 'react';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

export type RadioFilterItem = {
  label: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
}

interface RadioFilterProps {
  urlParam: string;
  label: string;
  value?: string;
  placeholder: string;
  items: RadioFilterItem[];
  chipLabel: string;
  apply: (params: object, replaceState?: boolean ) => void;
}

const radioFilter =
  ({ urlParam, label, value, placeholder, items, chipLabel, apply }: RadioFilterProps) => {
    const onValueChanged = (value?: string) => {
      apply({
        [urlParam]: value,
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
      type: conditionalFilterType.radio,
      urlParam,
      key: urlParam,
      filterValues: {
        onChange: (event: FormEvent<HTMLInputElement>, value: string) => {
          onValueChanged(value);
        },
        items: itemsWithFixedIcon,
        value: value,
        placeholder
      },
    };

    const activeFiltersConfig = {
      isShown: !!value,
      onDelete: () => {
        onValueChanged(undefined);
      },
      key: urlParam,
      category: chipLabel,
      chips: items
        .filter((item) => item.value === value)
        ?.map((item) => ({ name: item.label, value: item.value })),
    };

    return { filterConfig, activeFiltersConfig };
  };

export default radioFilter;
