import React, { Fragment, useState } from 'react';
import propTypes from 'prop-types';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ExpandableRowContent,
} from '@patternfly/react-table';

const BaseTable = ({ columns, rows }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const setRowExpanded = (row, isExpanding) =>
    setExpandedRows((prevExpanded) => {
      const otherExpandedRows = prevExpanded.filter((r) => r !== row);
      return isExpanding ? [...otherExpandedRows, row] : otherExpandedRows;
    });

  const isRowExpanded = (row) => expandedRows.includes(row);

  return (
    <TableComposable variant="compact">
      <Thead>
        <Tr>
          <Th /> {/* expandible caret column */}
          {columns.map((column) => (
            <Th key={column.title} sort>
              {column.title}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            <Tr>
              <Td
                expand={{
                  rowIndex,
                  isExpanded: isRowExpanded(row.key),
                  onToggle: () =>
                    setRowExpanded(row.key, !isRowExpanded(row.key)),
                }}
              />
              {row.cells.map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </Tr>
            <Tr isExpanded={isRowExpanded(row.key)}>
              <Td colspan={100}>
                <ExpandableRowContent>{row.description}</ExpandableRowContent>
              </Td>
            </Tr>
          </Fragment>
        ))}
      </Tbody>
    </TableComposable>
  );
};

BaseTable.propTypes = {
  columns: propTypes.array,
  rows: propTypes.array,
};

export default BaseTable;
