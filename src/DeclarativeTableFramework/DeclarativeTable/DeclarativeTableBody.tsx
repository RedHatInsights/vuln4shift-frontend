import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ExpandableRowContent,
  SortByDirection,
  ActionsColumn,
  IAction,
  ISortBy,
} from '@patternfly/react-table';
import { TableVariant } from '@patternfly/react-table';
import { DEFAULT_LIMIT } from './constants';
import { SkeletonTable } from '@patternfly/react-component-groups';
import { DeclarativeTableColumn } from './DeclarativeTable';
import { DeclarativeTableRow } from './DeclarativeTableToolbar';
import { ThSortType } from '@patternfly/react-table/dist/esm/components/Table/base/types';

interface DeclarativeTableBodyProps {
  isLoading?: boolean,
  columns: DeclarativeTableColumn[],
  rows: DeclarativeTableRow[],
  isExpandable?: boolean,
  isSelectable?: boolean,
  emptyState?: React.ReactNode,
  sortParam?: string,
  perPage: number,
  apply?: (params: { limit?: number, offset?: number, sort?: string }) => void,
  selectedRows: Record<string, any>,
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  rowActions?: IAction[],
}

const DeclarativeTableBody = ({
  isLoading,
  columns,
  rows,
  isExpandable = false,
  isSelectable = false,
  emptyState,
  sortParam = '',
  perPage,
  apply,
  selectedRows,
  setSelectedRows,
  rowActions,
}: DeclarativeTableBodyProps) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [areAllRowsExpanded, setAreAllRowsExpanded] = useState<boolean>(false);
  const [inertiaRowCount, setInertiaRowCount] = useState<number>(0);

  useEffect(() => {
    if (!isLoading) {
      setInertiaRowCount(rows.length);
    }
  }, [rows, isLoading]);

  useEffect(() => {
    setAreAllRowsExpanded(
      rows.length > 0 && rows.filter(row => row.expandableContent).length === expandedRows.length
    );
  }, [expandedRows]);

  useEffect(() => {
    areAllRowsExpanded && setExpandedRows(rows.filter(row => row.expandableContent).map((row) => row.key));
  }, [rows]);

  const onExpandRow = (rowKey: string, isExpanding: boolean) =>
    setExpandedRows((prevExpanded) => {
      const otherExpandedRows = prevExpanded.filter((r) => r !== rowKey);
      return isExpanding ? [...otherExpandedRows, rowKey] : otherExpandedRows;
    });

  const onToggleSelectRow = (row: DeclarativeTableRow, isTogglingOn: boolean) =>
    setSelectedRows((prevSelected) => {
      const newSelectedRows = { ...prevSelected };

      if (isTogglingOn) {
        newSelectedRows[row.key] = row.selectData ?? true;
      } else {
        delete newSelectedRows[row.key];
      }

      return newSelectedRows;
    });

  const isRowExpanded = (rowKey: string) => expandedRows.includes(rowKey);
  const isRowSelected = (row: DeclarativeTableRow) => !!selectedRows[row.key];

  const createSortBy = (columns: DeclarativeTableColumn[], sortParam: string, columnIndex: number): ISortBy => {
    if (inertiaRowCount === 0 || !sortParam) {
      return {};
    }

    const direction =
      sortParam[0] === '-' ? SortByDirection.desc : SortByDirection.asc;

    sortParam = sortParam.replace(/^(-|\+)/, '').split(',')[0];

    const selectedColumnIndex = columns.findIndex(
      (column: DeclarativeTableColumn) => column.sortParam === sortParam
    );

    return {
      index: selectedColumnIndex,
      direction,
      defaultDirection:
        columns[columnIndex]?.sortDefaultDirection ?? SortByDirection.desc,
    };
  };

  const getSortParams = (columnIndex: number): ThSortType => ({
    sortBy: createSortBy(columns, sortParam, columnIndex),
    onSort: (event, index, direction) => {
      let columnName = columns[columnIndex].sortParam;

      if (direction === SortByDirection.desc) {
        columnName = '-' + columnName;
      }

      rows.length > 0 && apply?.({ sort: columnName });
    },
    columnIndex,
  });

  const columnHeaders = columns.map((column, index) => (
    <Th
      key={column.key}
      sort={column.sortParam ? getSortParams(index) : undefined}
      width={column.width as (10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 60 | 70 | 80 | 90 | 100 | undefined)}
    >
      {column.title}
    </Th>
  ));

  return isLoading ? (
    <SkeletonTable
      variant={TableVariant.compact}
      rowsCount={perPage || DEFAULT_LIMIT}
      columns={columnHeaders}
      isExpandable={isExpandable}
      isSelectable={isSelectable}
    />
  ) : (
    <Table variant={TableVariant.compact}>
      <Thead>
        <Tr>
          {isExpandable && (
            <Th
              // makes sure the headers do not move on empty state
              style={{ width: 72, minWidth: 72 }}
              expand={
                rows.length > 0 ? {
                  onToggle: () =>
                    setExpandedRows(
                      areAllRowsExpanded ? [] : rows.filter(row => row.expandableContent).map((row) => row.key)
                    ),
                  // looks like Patternfly has this condition reversed
                  areAllExpanded: !areAllRowsExpanded,
                  collapseAllAriaLabel: 'Collapse all'
                } : undefined
              }
              aria-label="Expand or collapse all button"
            />
          )}
          {isSelectable && <Th style={{ width: 29, minWidth: 29 }} screenReaderText="Column with row select checkboxes" />}
          {columnHeaders}
          {rowActions && <Th screenReaderText="Column with row actions" />}
        </Tr>
      </Thead>
      {rows.length === 0 ? (
        <Tbody>
          <Tr>
            <Td colSpan={100}>{emptyState}</Td>
          </Tr>
        </Tbody>
      ) : (
        rows.map((row, rowIndex) => (
          <Tbody key={rowIndex} isExpanded={isRowExpanded(row.key)}>
            <Tr>
              {isExpandable && (row.expandableContent ? (
                <Td
                  expand={{
                    rowIndex,
                    isExpanded: isRowExpanded(row.key),
                    onToggle: () =>
                      onExpandRow(row.key, !isRowExpanded(row.key)),
                  }}
                />
              ) : <Td />)}
              {isSelectable && (
                <Td
                  select={{
                    rowIndex,
                    isSelected: isRowSelected(row),
                    onSelect: (_event, isSelecting) =>
                      onToggleSelectRow(row, isSelecting),
                    isDisabled: row.isUnselectable,
                  }}
                />
              )}
              {row.cells.map((cell, cellIndex) => (
                <Td
                  key={cellIndex}
                  dataLabel={typeof (columns[cellIndex].title) === 'string'
                    ? columns[cellIndex].title
                    : columns[cellIndex].dataLabel}
                >
                  {cell}
                </Td>
              ))}
              {rowActions && (
                <Td isActionCell>
                  <ActionsColumn rowData={row.selectData} items={rowActions} isDisabled={false} />
                </Td>
              )}
            </Tr>
            {isExpandable && row.expandableContent && (
              <Tr isExpanded={isRowExpanded(row.key)}>
                <Td colSpan={100}>
                  <ExpandableRowContent>
                    {row.expandableContent}
                  </ExpandableRowContent>
                </Td>
              </Tr>
            )}
          </Tbody>
        ))
      )}
    </Table>
  );
};

export default DeclarativeTableBody;
