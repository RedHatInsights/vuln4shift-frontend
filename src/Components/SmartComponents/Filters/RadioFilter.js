import { conditionalFilterType } from '@redhat-cloud-services/frontend-components/ConditionalFilter';

const radioFilter = ({ urlParam, label, value, placeholder, items, apply }) => {
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

  return { filterConfig };
};

export default radioFilter;
