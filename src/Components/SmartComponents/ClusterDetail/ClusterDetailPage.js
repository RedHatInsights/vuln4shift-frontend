import React, { Fragment, useEffect, useState } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import ClusterDetailTable from './ClusterDetailTable';
import WithLoader, {
  LoaderType,
} from '../..//PresentationalComponents/WithLoader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClusterDetails } from '../../../Store/Actions';
import DateFormat from '@redhat-cloud-services/frontend-components/DateFormat/DateFormat';

const ClusterDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const cluster = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore.cluster
  );

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // API response delay simulation
    setTimeout(() => setLoading(false), 1000);

    dispatch(fetchClusterDetails());
  }, []);

  const pageTitle = (
    <WithLoader
      variant={LoaderType.inlineSkeleton}
      width="300px"
      fontSize="lg"
      isLoading={isLoading}
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
              isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
            style={{ verticalAlign: -4 }}
          >
            <DateFormat date={cluster.updated} type="exact" />
          </WithLoader>
        </Fragment>
      </PageHeader>
      <Main>
        <ClusterDetailTable />
      </Main>
    </Fragment>
  );
};

ClusterDetailPage.propTypes = {
  match: PropTypes.object,
};

export default ClusterDetailPage;
