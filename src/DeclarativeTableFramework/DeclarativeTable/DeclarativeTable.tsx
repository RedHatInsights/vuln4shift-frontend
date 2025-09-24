import React, { useState } from 'react';
// @ts-ignore
import DeclarativeTableBody from './DeclarativeTableBody';
import DeclarativeTableToolbar, { DeclarativeTableBulkAction, DeclarativeTableMeta, DeclarativeTableRow } from './DeclarativeTableToolbar';
import DeclarativeTableFooter from './DeclarativeTableFooter';
import ErrorHandler from './ErrorHandler';
import { useColumnManagement } from './helpers';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { ColumnsIcon } from '@patternfly/react-icons';
import { ColumnManagementModalColumn } from '@patternfly/react-component-groups';
import { ConditionalFilterProps, FilterChipsProps } from '@redhat-cloud-services/frontend-components';
import { IAction } from '@patternfly/react-table';

export type DeclarativeTableColumn = Omit<ColumnManagementModalColumn, 'isShownByDefault'> & {
  isShownByDefault?: boolean,
  dataLabel?: string,
  sortParam?: string,
  sortDefaultDirection?: 'asc' | 'desc',
  width?: number,
}

interface DeclarativeTableProps {
  isLoading?: boolean,
  isExpandable?: boolean,
  isSelectable?: boolean,
  areColumnsManageable?: boolean,
  rows: DeclarativeTableRow[],
  columns: DeclarativeTableColumn[],
  filterConfig?: ConditionalFilterProps,
  activeFiltersConfig?: FilterChipsProps,
  meta: DeclarativeTableMeta,
  errorStatus?: number | string,
  emptyState?: React.ReactNode,
  apply?: (params: { limit?: number, offset?: number }) => void,
  onExport?: (format: string) => void,
  applyColumns?: (newColumns: DeclarativeTableColumn[]) => void,
  fetchBulk?: () => Promise<Record<string, any>>,
  bulkActions?: DeclarativeTableBulkAction[],
  rowActions?: IAction[],
}

const DeclarativeTable = ({
  isLoading,
  isExpandable,
  isSelectable,
  areColumnsManageable,
  rows,
  columns,
  filterConfig = { items: []},
  activeFiltersConfig = {},
  meta,
  errorStatus,
  emptyState,
  apply,
  onExport,
  applyColumns,
  fetchBulk,
  bulkActions,
  rowActions,
}: DeclarativeTableProps) => {
  const { offset, limit, total_items, sort } = meta;

  const [selectedRows, setSelectedRows] = useState({});

  const [ColumnManagementModal, setColumnModalOpen] = useColumnManagement(
    columns,
    (columns) => applyColumns?.(columns)
  );

  return (
    <ErrorHandler errorStatus={errorStatus}>
      {ColumnManagementModal}
      <DeclarativeTableToolbar
        isLoading={isLoading}
        isSelectable={isSelectable}
        rows={rows}
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
        filterConfig={filterConfig}
        activeFiltersConfig={activeFiltersConfig}
        meta={meta}
        onExport={onExport}
        dedicatedAction={[...areColumnsManageable ? [
          <Button
            onClick={() => setColumnModalOpen(true)}
            variant={ButtonVariant.secondary}
            icon={<ColumnsIcon />}
            key="column-mgmt"
            ouiaId="column-management-modal-open-button"
          >
            Manage columns
          </Button>
          ] : []
        ]}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        fetchBulk={fetchBulk}
        bulkActions={bulkActions}
      />
      <DeclarativeTableBody
        isLoading={isLoading}
        columns={columns.filter((column) => !areColumnsManageable || column.isShown === undefined || column.isShown)}
        rows={rows.map((row) => ({
          ...row,
          cells: row.cells.filter((_, i) => !areColumnsManageable || columns[i].isShown === undefined || columns[i].isShown),
        }))}
        isExpandable={isExpandable}
        isSelectable={isSelectable}
        emptyState={emptyState}
        sortParam={sort}
        perPage={limit}
        apply={apply}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rowActions={rowActions}
      />
      <DeclarativeTableFooter
        isLoading={isLoading}
        page={offset / limit + 1}
        perPage={limit}
        itemCount={total_items}
        apply={apply}
      />
    </ErrorHandler>
  );
};

export default DeclarativeTable;
