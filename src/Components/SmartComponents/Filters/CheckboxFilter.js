import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const checkboxFilter = ({ urlParam, label, value, items, apply }) => {
  const onValueChanged = (values) => {
    apply({
      [urlParam]: values.join(','),
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
        onValueChanged(value);
      },
      items,
      value: value ? value.split(',') : [],
    },
  };
};

export default checkboxFilter;
