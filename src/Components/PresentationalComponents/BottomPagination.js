import React from 'react';
import { Pagination, PaginationVariant } from '@patternfly/react-core';

const BottomPagination = () => {
  return (
    <Pagination
      page={1}
      itemCount={20}
      perPage={20}
      variant={PaginationVariant.bottom}
      ouiaId="pagination-bottom"
      isDisabled={false}
    />
  );
};

export default BottomPagination;
