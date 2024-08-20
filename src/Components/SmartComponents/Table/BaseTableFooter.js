import React from 'react';
import propTypes from 'prop-types';
import {
  Pagination,
  PaginationVariant,
  Skeleton,
} from '@patternfly/react-core';

const BaseTableFooter = ({ isLoading, page, perPage, itemCount, apply }) => {
  return isLoading ? (
    <div className="pf-v5-c-pagination pf-m-bottom">
      <Skeleton fontSize="xl" width="350px" style={{ margin: 10 }} />
    </div>
  ) : (
    <Pagination
      page={page}
      itemCount={itemCount}
      perPage={perPage}
      variant={PaginationVariant.bottom}
      ouiaId="pagination-bottom"
      isDisabled={itemCount === 0}
      onSetPage={(event, page, limit, offset) => apply({ limit, offset })}
      onPerPageSelect={(event, limit) => apply({ limit, offset: 0 })}
    />
  );
};

BaseTableFooter.propTypes = {
  isLoading: propTypes.bool,
  page: propTypes.number,
  perPage: propTypes.number,
  itemCount: propTypes.number,
  apply: propTypes.func,
};

export default BaseTableFooter;
