import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const checkboxFilter = ({
  urlParam,
  label,
  value,
  placeholder,
  items,
  apply,
  chipLabel,
}) => {
  const onValuesChanged = (values) => {
    apply({
      [urlParam]: values.join(','),
      offset: 0,
    });
  };

  const filterConfig = {
    label,
    type: conditionalFilterType.checkbox,
    urlParam,
    key: urlParam,
    filterValues: {
      onChange: (event, value) => {
        onValuesChanged(value);
      },
      items,
      value: value ? value.split(',') : [],
      placeholder,
    },
  };

  const activeFiltersConfig = {
    isShown: !!value,
    onDelete: (chips) => {
      const itemsToRemove = chips.map((chip) => chip.value);

      const newValue = value
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
