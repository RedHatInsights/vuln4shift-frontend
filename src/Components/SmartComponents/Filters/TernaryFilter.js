import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const ternaryFilter = ({
  urlParam,
  label,
  value,
  placeholder,
  items,
  apply,
}) => {
  const onValuesChanged = (values) => {
    apply({
      [urlParam]: items.map((item) => values.includes(item.value)).join(','),
      page: 1,
    });
  };

  return {
    label,
    type: conditionalFilterType.checkbox,
    urlParam,
    key: urlParam,
    filterValues: {
      onChange: (event, value) => {
        onValuesChanged(value);
      },
      items,
      value: value
        ? items
            .map((item) => item.value)
            .filter((_, index) => value.split(',')[index] === 'true')
        : [],
      placeholder,
    },
  };
};

export default ternaryFilter;
