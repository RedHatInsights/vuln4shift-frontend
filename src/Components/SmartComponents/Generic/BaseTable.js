import React from 'react';
import propTypes from 'prop-types';
import BaseTableBody from '../Generic/BaseTableBody';
import BaseToolbar from '../Generic/BaseToolbar';
import BottomPagination from '../../PresentationalComponents/BottomPagination';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import { useColumnManagement } from '../../../Helpers/hooks';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { ColumnsIcon } from '@patternfly/react-icons';

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
  applyColumns,
}) => {
  const { offset, limit, total_items, sort } = meta;

  const [ColumnManagementModal, setColumnModalOpen] = useColumnManagement(
    columns,
    (columns) => applyColumns(columns)
  );

  return (
    <ErrorHandler error={error}>
      {ColumnManagementModal}
      <BaseToolbar
        isLoading={isLoading}
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
        filterConfig={filterConfig}
        activeFiltersConfig={activeFiltersConfig}
        onExport={onExport}
        actionsConfig={{
          actions: [
            <Button
              onClick={() => setColumnModalOpen(true)}
              variant={ButtonVariant.secondary}
              icon={<ColumnsIcon />}
              key="column-mgmt"
              ouiaId="column-management-modal-open-button"
            >
              Manage columns
            </Button>,
          ],
        }}
      />
      <BaseTableBody
        isLoading={isLoading}
        columns={columns.filter((column) => column.isShown)}
        rows={rows.map((row) => ({
          ...row,
          cells: row.cells.filter((_, i) => columns[i].isShown),
        }))}
        isExpandable={isExpandable}
        emptyState={emptyState}
        sortParam={sort}
        perPage={limit}
        apply={apply}
      />
      <BottomPagination
        isLoading={isLoading}
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
      isShown: propTypes.bool.isRequired,
      isShownByDefault: propTypes.bool.isRequired,
      isUntoggleable: propTypes.bool,
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
  applyColumns: propTypes.func,
};

export default BaseTable;
