import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const useTextFilter = ({ urlParam, label, placeholder, value, apply }) => {
  const [searchValue, setSearchValue] = useState();
  const [handleSearch] = useState(() =>
    debounce((newValue) => {
      if (newValue !== undefined) {
        apply({ [urlParam]: newValue, offset: 0 });
      }
    }, 400)
  );

  useEffect(() => setSearchValue(value), [value]);

  return {
    type: conditionalFilterType.text,
    label: label,
    key: urlParam,
    filterValues: {
      'aria-label': 'search-field',
      id: `search-${label.id}`,
      onChange: (event, value) => {
        setSearchValue(value);
        handleSearch(value);
      },
      placeholder: placeholder,
      value: searchValue,
    },
  };
};

export default useTextFilter;
