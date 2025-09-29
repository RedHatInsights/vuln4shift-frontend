import React, { ReactNode } from 'react';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import { Skeleton } from '@patternfly/react-core';
import uniq from 'lodash/uniq';
import { ConditionalFilterProps, FilterChipsProps } from '@redhat-cloud-services/frontend-components';

export type DeclarativeTableRow = {
  key: string,
  cells: ReactNode[],
  expandableContent?: ReactNode,
  selectData?: object,
  isUnselectable?: boolean,
}

export type DeclarativeTableMeta = {
  offset: number,
  limit: number,
  total_items: number,
  sort?: string
}

export type DeclarativeTableBulkAction = {
  label: React.ReactNode,
  onClick: (event: MouseEvent | React.MouseEvent | React.KeyboardEvent, selectedRows: Record<string, any>) => void,
  props: object | ((selectedRows: Record<string, any>) => void),
}

// TODO: Unify page, perPage and itemCount with meta
interface DeclarativeTableToolbarProps {
  isLoading?: boolean,
  isSelectable?: boolean,
  rows: DeclarativeTableRow[],
  page: number,
  perPage: number,
  itemCount: number,
  apply?: (params: { limit?: number, offset?: number }) => void,
  filterConfig: ConditionalFilterProps,
  activeFiltersConfig: FilterChipsProps,
  meta: DeclarativeTableMeta,
  onExport?: (format: string) => void,
  selectedRows: Record<string, any>,
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  fetchBulk?: () => Promise<Record<string, any>>,
  dedicatedAction?: ReactNode,
  bulkActions?: DeclarativeTableBulkAction[]
};

const DeclarativeTableToolbar = ({
  isLoading,
  isSelectable,
  rows,
  page,
  perPage,
  itemCount,
  apply,
  filterConfig,
  activeFiltersConfig,
  meta,
  onExport,
  selectedRows,
  setSelectedRows,
  fetchBulk,
  dedicatedAction,
  bulkActions = [],
}: DeclarativeTableToolbarProps) => {
  const selectAll = () =>
    fetchBulk?.().then((bulkData: Record<string, any>) =>
      setSelectedRows((prevSelected: Record<string, any>) => {
        const newSelected: Record<string, any> = { ...prevSelected };

        Object.entries(bulkData).forEach(([key, value]) => {
          newSelected[key] = value;
        });

        return newSelected;
      })
    );

  return (
    <PrimaryToolbar
      pagination={
        isLoading ? (
          <Skeleton fontSize="xl" width="200px" />
        ) : (
          {
            isDisabled: apply === undefined || itemCount === 0,
            itemCount,
            page,
            perPage,
            ouiaId: 'pagination-top',
            onSetPage: (event, page, limit, offset) => apply?.({ limit, offset }),
            onPerPageSelect: (event, limit) => apply?.({ limit, offset: 0 }),
          }
        )
      }
      filterConfig={filterConfig?.items?.length > 0 ? filterConfig : undefined}
      activeFiltersConfig={activeFiltersConfig}
      exportConfig={
        onExport && {
          isDisabled: itemCount === 0,
          onSelect: (e, format) => onExport(format),
        }
      }
      dedicatedAction={dedicatedAction}
      bulkSelect={
        isSelectable ? {
          count: Object.keys(selectedRows).length,
          items: [
            {
              title: 'Select none (0 items)',
              onClick: () => setSelectedRows({}),
            },
            {
              title: `Select page (${rows.length} ${rows.length === 1 ? 'item' : 'items'
                })`,
              onClick: () =>
                setSelectedRows((prevSelected) => {
                  const newSelected = { ...prevSelected };

                  rows.forEach((row) => {
                    newSelected[row.key] = row.selectData ?? true;
                  });

                  return newSelected;
                })
            },
            ...(fetchBulk !== undefined
              ? [
                {
                  title: `Select all (${meta.total_items} ${meta.total_items === 1 ? 'item' : 'items'
                    })`,
                  onClick: selectAll,
                },
              ]
              : []),
          ],
          isDisabled: meta.total_items === 0 && Object.keys(selectedRows).length === 0,
          checked: Object.keys(selectedRows).length > 0,
          onSelect: () =>
            Object.keys(selectedRows).length === 0 ? selectAll() : setSelectedRows({}),
        } : undefined
      }
      actionsConfig={{
        actions: [
          '',
          ...bulkActions.map((action: DeclarativeTableBulkAction) => ({
            ...action,
            props: typeof (action.props) === 'function' ? action.props(selectedRows) : action.props,
            onClick: (e: MouseEvent | React.MouseEvent | React.KeyboardEvent) => action.onClick(e, selectedRows),
          })),
        ],
      }}
    />
  );
};

export default DeclarativeTableToolbar;
