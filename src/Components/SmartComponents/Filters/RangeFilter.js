import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import RangeFilterComponent from '../../PresentationalComponents/RangeFilterComponent';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const useRangeFilter = ({
  urlParam,
  label,
  minMaxLabels,
  range,
  value,
  placeholder,
  apply,
}) => {
  const [searchValue, setSearchValue] = useState();
  const [handleSearch] = useState(() =>
    debounce((newValue) => {
      if (
        newValue.min >= 0 &&
        newValue.max <= 10 &&
        newValue.min <= newValue.max
      ) {
        apply({
          [urlParam]: `${newValue.min},${newValue.max}`,
          offset: 0,
        });
      }
    }, 600)
  );

  useEffect(() => {
    setSearchValue({
      min: isNaN(value.min) ? range.min : value.min,
      max: isNaN(value.max) ? range.max : value.max,
    });
  }, [value.min, value.max]);

  const setValue = (newValue) => {
    setSearchValue(newValue);
    handleSearch(newValue);
  };

  return {
    label,
    type: conditionalFilterType.custom,
    key: urlParam,
    urlParam,
    filterValues: {
      children: (
        <RangeFilterComponent
          defaultValues={searchValue}
          setValues={setValue}
          range={range}
          className="pf-u-mb-0"
          selectProps={{ placeholderText: placeholder }}
          minMaxLabels={minMaxLabels}
        />
      ),
    },
  };
};

export default useRangeFilter;
