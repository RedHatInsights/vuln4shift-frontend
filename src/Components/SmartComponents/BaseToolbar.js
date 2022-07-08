import React from 'react';
import propTypes from 'prop-types';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';

// TODO: Move the page, perPage calculation to this component
const BaseToolbar = ({ page, perPage, itemCount, apply, filterConfig }) => {
  return (
    <PrimaryToolbar
      pagination={{
        isDisabled: itemCount === 0,
        itemCount,
        page,
        perPage,
        ouiaId: 'pagination-top',
        onSetPage: (event, page, limit, offset) => apply({ limit, offset }),
        onPerPageSelect: (event, limit) => apply({ limit, offset: 0 }),
      }}
      filterConfig={filterConfig}
    />
  );
};

BaseToolbar.propTypes = {
  page: propTypes.number,
  perPage: propTypes.number,
  itemCount: propTypes.number,
  apply: propTypes.func,
  filterConfig: propTypes.shape({
    items: propTypes.array,
  }),
};

export default BaseToolbar;
