import React, { Fragment, useEffect } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Link, useRouteMatch } from 'react-router-dom';
import ClusterDetailTable from './ClusterDetailTable';
import WithLoader, {
  LoaderType,
} from '../..//PresentationalComponents/WithLoader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClusterDetails } from '../../../Store/Actions';
import DateFormat from '@redhat-cloud-services/frontend-components/DateFormat/DateFormat';

const ClusterDetailPage = () => {
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
    <Fragment>
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
        <Fragment>
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
        </Fragment>
      </PageHeader>
      <Main>
        <ClusterDetailTable />
      </Main>
    </Fragment>
  );
};

export default ClusterDetailPage;
