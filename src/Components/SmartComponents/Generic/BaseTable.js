import React from 'react';
import propTypes from 'prop-types';
import BaseTableBody from '../Generic/BaseTableBody';
import BaseToolbar from '../Generic/BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';

const BaseTable = ({
  isLoading,
  isExpandable,
  rows,
  columns,
  filterConfig = [],
  activeFiltersConfig = [],
  meta,
  error,
  emptyState,
  apply,
  onExport,
}) => {
  const { offset, limit, total_items, sort } = meta;

  return (
    <ErrorHandler error={error}>
      <BaseToolbar
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
        filterConfig={filterConfig}
        activeFiltersConfig={activeFiltersConfig}
        onExport={onExport}
      />
      <BaseTableBody
        isLoading={isLoading}
        columns={columns}
        rows={rows}
        isExpandable={isExpandable}
        emptyState={emptyState}
        sortParam={sort}
        perPage={limit}
        apply={apply}
      />
      <BottomPagination
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
      />
    </ErrorHandler>
  );
};

BaseTable.propTypes = {
  isLoading: propTypes.bool.isRequired,
  columns: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.node.isRequired,
      sortParam: propTypes.string,
    })
  ).isRequired,
  rows: propTypes.arrayOf(
    propTypes.shape({
      key: propTypes.string.isRequired,
      cells: propTypes.arrayOf(propTypes.node).isRequired,
      expandableContent: propTypes.node,
    })
  ).isRequired,
  isExpandable: propTypes.bool,
  emptyState: propTypes.node.isRequired,
  sortParam: propTypes.string,
  filterConfig: propTypes.object,
  activeFiltersConfig: propTypes.object,
  meta: propTypes.shape({
    offset: propTypes.number,
    limit: propTypes.number,
    total_items: propTypes.number,
    sort: propTypes.string,
  }),
  error: propTypes.object,
  apply: propTypes.func,
  onExport: propTypes.func,
};

export default BaseTable;
