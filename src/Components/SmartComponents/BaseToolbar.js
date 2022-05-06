import React from 'react';
import propTypes from 'prop-types';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';

const BaseToolbar = ({ page = 1, perPage = 20, itemCount }) => {
  return (
    <PrimaryToolbar
      pagination={{
        isDisabled: itemCount === 0,
        itemCount,
        page,
        perPage,
        ouiaId: 'pagination-top',
      }}
    />
  );
};

BaseToolbar.propTypes = {
  page: propTypes.number,
  perPage: propTypes.number,
  itemCount: propTypes.number,
};

export default BaseToolbar;
