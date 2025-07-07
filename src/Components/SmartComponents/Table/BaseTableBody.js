import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ExpandableRowContent,
  SortByDirection,
} from '@patternfly/react-table';
import { TableVariant } from '@patternfly/react-table';
import { DEFAULT_LIMIT } from '../../../Helpers/constants';
import { SkeletonTable } from '@patternfly/react-component-groups';

const BaseTableBody = ({
  isLoading,
  columns,
  rows,
  isExpandable = false,
  emptyState,
  sortParam,
  perPage,
  apply,
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [areAllRowsExpanded, setAreAllRowsExpanded] = useState(false);

  useEffect(() => {
    setAreAllRowsExpanded(
      rows.length > 0 && rows.length === expandedRows.length
    );
  }, [expandedRows]);

  useEffect(() => {
    areAllRowsExpanded && setExpandedRows(rows.map((row) => row.key));
  }, [rows]);

  const onExpandRow = (row, isExpanding) =>
    setExpandedRows((prevExpanded) => {
      const otherExpandedRows = prevExpanded.filter((r) => r !== row);
      return isExpanding ? [...otherExpandedRows, row] : otherExpandedRows;
    });

  const isRowExpanded = (row) => expandedRows.includes(row);

  const createSortBy = (columns, sortParam, columnIndex) => {
    if (rows.length === 0 || !sortParam) {
      return {};
    }

    const direction =
      sortParam[0] === '-' ? SortByDirection.desc : SortByDirection.asc;

    sortParam = sortParam.replace(/^(-|\+)/, '').split(',')[0];

    const selectedColumnIndex = columns.findIndex(
      (item) => item.sortParam === sortParam
    );

    return {
      index: selectedColumnIndex,
      direction,
      defaultDirection:
        columns[columnIndex]?.sortDefaultDirection ?? SortByDirection.desc,
    };
  };

  const getSortParams = (columnIndex) => ({
    sortBy: createSortBy(columns, sortParam, columnIndex),
    onSort: (event, index, direction) => {
      let columnName = columns[columnIndex].sortParam;

      if (direction === SortByDirection.desc) {
        columnName = '-' + columnName;
      }

      rows.length > 0 && apply({ sort: columnName });
    },
    columnIndex,
  });

  const columnHeaders = columns.map((column, index) => (
    <Th
      key={column.title}
      sort={column.sortParam && getSortParams(index)}
      width={column.width}
    >
      {column.title}
    </Th>
  ));

  return isLoading ? (
    <SkeletonTable
      variant={TableVariant.compact}
      rowsCount={perPage || DEFAULT_LIMIT}
      columns={columnHeaders}
      sortBy={createSortBy(columns, sortParam)}
      isExpandable={isExpandable}
    />
  ) : (
    <Table variant={TableVariant.compact}>
      <Thead>
        <Tr>
          {isExpandable && rows.length > 0 && (
            <Th
              expand={{
                onToggle: () =>
                  setExpandedRows(
                    areAllRowsExpanded ? [] : rows.map((row) => row.key)
                  ),
                // looks like Patternfly has this condition reversed
                areAllExpanded: !areAllRowsExpanded,
              }}
              ouiaId="expand-all"
            />
          )}
          {columnHeaders}
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
              {isExpandable && (
                <Td
                  expand={{
                    rowIndex,
                    isExpanded: isRowExpanded(row.key),
                    onToggle: () =>
                      onExpandRow(row.key, !isRowExpanded(row.key)),
                  }}
                />
              )}
              {row.cells.map((cell, cellIndex) => (
                <Td key={cellIndex} dataLabel={columns[cellIndex].title}>
                  {cell}
                </Td>
              ))}
            </Tr>
            {isExpandable && (
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

BaseTableBody.propTypes = {
  isLoading: propTypes.bool.isRequired,
  columns: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.node.isRequired,
      sortParam: propTypes.string,
      sortDefaultDirection: propTypes.oneOf([undefined, 'asc', 'desc']),
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
  perPage: propTypes.number,
  apply: propTypes.func,
};

export default BaseTableBody;
