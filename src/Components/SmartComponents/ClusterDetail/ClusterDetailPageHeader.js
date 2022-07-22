import React, { useEffect } from 'react';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import DateFormat from '@redhat-cloud-services/frontend-components/DateFormat/DateFormat';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WithLoader, {
  LoaderType,
} from '../../PresentationalComponents/WithLoader';
import { fetchClusterDetails } from '../../../Store/Actions';

const ClusterDetailPageHeader = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const { cluster, isDetailLoading } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  useEffect(() => {
    dispatch(fetchClusterDetails(match.params.clusterId));
  }, []);

  const pageTitle = (
    <WithLoader
      variant={LoaderType.inlineSkeleton}
      width="300px"
      fontSize="lg"
      isLoading={isDetailLoading}
      style={{ verticalAlign: -4 }}
    >
      {cluster.display_name}
    </WithLoader>
  );

  return (
    <PageHeader>
      <Breadcrumb className="pf-u-mb-md">
        <BreadcrumbItem>
          <Link to="/">Vulnerability</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/clusters">Clusters</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <WithLoader
            variant={LoaderType.inlineSkeleton}
            width="200px"
            fontSize="sm"
            isLoading={isDetailLoading}
            style={{ verticalAlign: -4 }}
          >
            {cluster.display_name}
          </WithLoader>
        </BreadcrumbItem>
      </Breadcrumb>
      <PageHeaderTitle title={pageTitle} className="pf-u-mb-sm" />
      UUID:&nbsp;
      <WithLoader
        variant={LoaderType.inlineSkeleton}
        width="300px"
        fontSize="sm"
        isLoading={isDetailLoading}
        style={{ verticalAlign: -4 }}
      >
        {match.params.clusterId}
      </WithLoader>
      <br />
      Last seen:&nbsp;
      <WithLoader
        variant={LoaderType.inlineSkeleton}
        width="200px"
        fontSize="sm"
        isLoading={isDetailLoading}
        style={{ verticalAlign: -4 }}
      >
        <DateFormat date={cluster.last_seen} type="exact" />
      </WithLoader>
    </PageHeader>
  );
};

export default ClusterDetailPageHeader;
