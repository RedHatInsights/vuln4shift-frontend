import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import React from 'react';

const BaseToolbar = () => {
  return (
    <PrimaryToolbar
      pagination={{
        isDisabled: false,
        itemCount: 20,
        page: 1,
        perPage: 20,
        ouiaId: 'pagination-top',
      }}
    />
  );
};

export default BaseToolbar;
