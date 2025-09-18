import React from 'react';
import {
  Pagination,
  PaginationVariant,
  Skeleton,
} from '@patternfly/react-core';

interface DeclarativeTableFooterProps {
  isLoading?: boolean,
  page: number,
  perPage: number,
  itemCount: number,
  apply?: (params: { limit?: number, offset?: number}) => void,
};

const DeclarativeTableFooter = ({ isLoading, page, perPage, itemCount, apply }: DeclarativeTableFooterProps) => {
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
      isDisabled={apply === undefined || itemCount === 0}
      onSetPage={(event, page, limit, offset) => apply?.({ limit, offset })}
      onPerPageSelect={(event, limit) => apply?.({ limit, offset: 0 })}
    />
  );
};

export default DeclarativeTableFooter;
