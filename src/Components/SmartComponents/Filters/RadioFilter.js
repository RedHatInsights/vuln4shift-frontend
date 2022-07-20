import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const radioFilter = ({ urlParam, label, value, placeholder, items, apply }) => {
  const onValueChanged = (value) => {
    apply({
      [urlParam]: value,
      page: 1,
    });
  };

  return {
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
};

export default radioFilter;
