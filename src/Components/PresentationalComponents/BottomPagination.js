import React from 'react';
import propTypes from 'prop-types';
import { Pagination, PaginationVariant } from '@patternfly/react-core';

const BottomPagination = ({ page, perPage, itemCount }) => {
  return (
    <Pagination
      page={page}
      itemCount={itemCount}
      perPage={perPage}
      variant={PaginationVariant.bottom}
      ouiaId="pagination-bottom"
      isDisabled={itemCount === 0}
    />
  );
};

BottomPagination.propTypes = {
  page: propTypes.number,
  perPage: propTypes.number,
  itemCount: propTypes.number,
};

export default BottomPagination;
