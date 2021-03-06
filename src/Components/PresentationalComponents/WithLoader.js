import {
  Skeleton,
  SkeletonSize,
} from '@redhat-cloud-services/frontend-components/Skeleton';
import SkeletonTable from '@redhat-cloud-services/frontend-components/SkeletonTable/SkeletonTable';
import { Spinner } from '@redhat-cloud-services/frontend-components/Spinner';
import propTypes from 'prop-types';
import React from 'react';
import { TableVariant } from '@patternfly/react-table';
import { Skeleton as PfSkeleton } from '@patternfly/react-core';

export const LoaderType = {
  spinner: 'spinner',
  table: 'table',
  compactTable: 'compactTable',
  rectangle: 'rectangle',
  inlineSkeleton: 'inlineSkeleton',
  skeleton: 'skeleton',
};

const WithLoader = ({ isLoading, variant, children, size, ...props }) => {
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
          <PfSkeleton
            size={size ?? SkeletonSize.lg}
            {...props}
            style={{ display: 'inline-block', ...props.style }}
          />
        );
      default:
        return <Skeleton size={size ?? SkeletonSize.lg} {...props} />;
    }
  }

  return children;
};

WithLoader.propTypes = {
  isLoading: propTypes.bool,
  variant: propTypes.oneOf(Object.keys(LoaderType)),
  style: propTypes.object,
  children: propTypes.node,
  size: propTypes.string,
};

export default WithLoader;
