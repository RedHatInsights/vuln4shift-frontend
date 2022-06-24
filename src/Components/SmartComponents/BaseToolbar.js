import React from 'react';
import propTypes from 'prop-types';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';

const BaseToolbar = ({ page, perPage, itemCount, apply }) => {
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
    />
  );
};

BaseToolbar.propTypes = {
  page: propTypes.number,
  perPage: propTypes.number,
  itemCount: propTypes.number,
  apply: propTypes.number,
};

export default BaseToolbar;
