import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import RangeFilterComponent from './RangeFilterComponent';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface RangeFilterProps {
  urlParam: string;
  label: string;
  minMaxLabels?: { min: string, max: string },
  range: { min: number, max: number },
  value: { min: number, max: number };
  placeholder: string;
  chipLabel: string;
  chipDecimalPlaces?: number,
  apply: (params: object, replaceState?: boolean ) => void;
}

const useRangeFilter =
  ({
    urlParam,
    label,
    minMaxLabels = { min: 'Min', max: 'Max' },
    range,
    value,
    placeholder,
    chipLabel,
    chipDecimalPlaces = 1,
    apply,
  }: RangeFilterProps) => {
    const [handleSearch] = useState(() =>
      debounce((newValue = {}) => {
        if (
          newValue.min >= range.min &&
          newValue.max <= range.max &&
          newValue.min <= newValue.max
        ) {
          apply({
            [urlParam]: `${newValue.min},${newValue.max}`,
            offset: 0,
          });
        }
      }, 600)
    );

    const [inputValue, setInputValue] = useState<{ min?: string, max?: string } | undefined>();

    useDeepCompareEffect(() => {
      setInputValue({
        min: (value ?? range).min.toString(),
        max: (value ?? range).max.toString(),
      });
    }, [value]);

    const filterConfig = {
      label,
      type: conditionalFilterType.custom,
      key: urlParam,
      urlParam,
      filterValues: {
        children: (
          <RangeFilterComponent
            setValues={handleSearch}
            range={range}
            selectProps={{ placeholderText: placeholder }}
            minMaxLabels={minMaxLabels}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        ),
      },
    };

    const activeFiltersConfig = {
      // TODO: Fix chips not shown but Reset button shown with default value
      isShown: value.min !== range.min || value.max !== range.max,
      onDelete: () => {
        apply({
          [urlParam]: undefined,
          offset: 0,
        });
      },
      key: urlParam,
      category: chipLabel,
      chips: [
        {
          name:
            value.min.toFixed(chipDecimalPlaces) +
            ' - ' +
            value.max.toFixed(chipDecimalPlaces),
        },
      ],
    };

    return { filterConfig, activeFiltersConfig };
  };

export default useRangeFilter;
