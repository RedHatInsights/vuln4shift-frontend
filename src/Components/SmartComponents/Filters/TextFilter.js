import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const useTextFilter = ({
  urlParam,
  label,
  placeholder,
  value,
  apply,
  chipLabel,
}) => {
  const [searchValue, setSearchValue] = useState();
  const [handleSearch] = useState(() =>
    debounce((newValue) => {
      apply({ [urlParam]: newValue, offset: 0 });
    }, 400)
  );

  useEffect(() => setSearchValue(value ?? ''), [value]);

  const filterConfig = {
    type: conditionalFilterType.text,
    label: label,
    key: urlParam,
    filterValues: {
      'aria-label': 'search-field',
      id: `text-filter-${urlParam}`,
      onChange: (event, value) => {
        setSearchValue(value);
        handleSearch(value);
      },
      placeholder,
      value: searchValue,
    },
  };

  const activeFiltersConfig = {
    isShown: !!value,
    onDelete: () => apply({ [urlParam]: undefined, offset: 0 }),
    key: urlParam,
    category: chipLabel,
    chips: [
      {
        name: value,
      },
    ],
  };

  return { filterConfig, activeFiltersConfig };
};

export default useTextFilter;
