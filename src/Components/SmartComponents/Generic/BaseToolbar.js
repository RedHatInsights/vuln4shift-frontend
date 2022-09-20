import React from 'react';
import propTypes from 'prop-types';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import { Skeleton } from '@patternfly/react-core';

const BaseToolbar = ({
  isLoading,
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
      pagination={
        isLoading ? (
          <Skeleton fontSize="xl" width="200px" style={{ margin: 10 }} />
        ) : (
          {
            isDisabled: itemCount === 0,
            itemCount,
            page,
            perPage,
            ouiaId: 'pagination-top',
            onSetPage: (event, page, limit, offset) => apply({ limit, offset }),
            onPerPageSelect: (event, limit) => apply({ limit, offset: 0 }),
          }
        )
      }
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
  isLoading: propTypes.bool,
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
