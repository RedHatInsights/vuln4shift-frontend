import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import RangeFilterComponent from '../../PresentationalComponents/RangeFilterComponent';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';
import useDeepCompareEffect from 'use-deep-compare-effect';

const useRangeFilter = ({
  urlParam,
  label,
  minMaxLabels,
  range,
  value,
  placeholder,
  apply,
  chipLabel,
  chipDecimalPlaces = 1,
}) => {
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

  const [inputValue, setInputValue] = useState();

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
          className="pf-u-mb-0"
          selectProps={{ placeholderText: placeholder }}
          minMaxLabels={minMaxLabels}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      ),
    },
  };

  const activeFiltersConfig = {
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
