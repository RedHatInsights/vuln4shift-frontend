import { Spinner } from '@redhat-cloud-services/frontend-components/Spinner';
import propTypes from 'prop-types';
import React from 'react';
import { TableVariant } from '@patternfly/react-table';
import { Skeleton } from '@patternfly/react-core';
import { SkeletonTable } from '@patternfly/react-component-groups';

export const LoaderType = {
  spinner: 'spinner',
  table: 'table',
  compactTable: 'compactTable',
  rectangle: 'rectangle',
  inlineSkeleton: 'inlineSkeleton',
  skeleton: 'skeleton',
};

const WithLoader = ({ isLoading, variant, children, ...props }) => {
  if (isLoading) {
    switch (variant) {
      case LoaderType.spinner:
        return <Spinner centered {...props} />;
      case LoaderType.table:
        return <SkeletonTable {...props} />;
      case LoaderType.compactTable:
        return <SkeletonTable variant={TableVariant.compact} {...props} />;
      case LoaderType.rectangle:
        return <Skeleton shape="square" {...props} />;
      case LoaderType.inlineSkeleton:
        return (
          <Skeleton
            fontSize="sm"
            {...props}
            style={{ display: 'inline-block', ...props.style }}
          />
        );
      default:
        return <Skeleton fontSize="sm" {...props} />;
    }
  }

  return children;
};

WithLoader.propTypes = {
  isLoading: propTypes.bool,
  variant: propTypes.oneOf(Object.keys(LoaderType)),
  style: propTypes.object,
  children: propTypes.node,
};

export default WithLoader;
