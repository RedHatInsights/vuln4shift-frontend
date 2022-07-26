import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const radioFilter = ({
  urlParam,
  label,
  value,
  placeholder,
  items,
  apply,
  chipLabel,
}) => {
  const onValueChanged = (value) => {
    apply({
      [urlParam]: value,
      offset: 0,
    });
  };

  const filterConfig = {
    label,
    type: conditionalFilterType.radio,
    urlParam,
    key: urlParam,
    filterValues: {
      onChange: (event, value) => {
        onValueChanged(value);
      },
      items,
      value: value || items[0].value,
      placeholder,
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
