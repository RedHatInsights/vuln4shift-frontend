import { FormEvent, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

interface TextFilterProps {
  urlParam: string;
  label: string;
  placeholder: string;
  value?: string;
  chipLabel: string;
  apply: (params: object, replaceState?: boolean ) => void;
}

const useTextFilter =
  ({ urlParam, label, placeholder, value, chipLabel, apply }: TextFilterProps) => {
    const [searchValue, setSearchValue] = useState<string>();
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
        onChange: (event: FormEvent<HTMLInputElement>, value: string) => {
          setSearchValue(value);
          handleSearch(value);
        },
        placeholder,
        value: searchValue ?? '',
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
