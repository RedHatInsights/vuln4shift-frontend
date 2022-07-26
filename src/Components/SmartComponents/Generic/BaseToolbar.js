import React from 'react';
import propTypes from 'prop-types';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';

const BaseToolbar = ({
  page,
  perPage,
  itemCount,
  apply,
  filterConfig,
  activeFiltersConfig,
  onExport,
}) => {
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
      activeFiltersConfig={activeFiltersConfig}
      exportConfig={
        onExport && {
          isDisabled: itemCount === 0,
          onSelect: (e, format) => onExport(format),
        }
      }
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
  activeFiltersConfig: propTypes.shape({
    filters: propTypes.array,
  }),
  onExport: propTypes.func,
};

export default BaseToolbar;
