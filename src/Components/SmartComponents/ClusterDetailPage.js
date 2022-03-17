import React, { Fragment } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import CveTable from './CveTable';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Link } from 'react-router-dom';

const ClusterDetailPage = ({ match }) => {
  return (
    <Fragment>
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Vulnerability</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/clusters">Clusters</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{match.params.clusterId}</BreadcrumbItem>
        </Breadcrumb>
        <PageHeaderTitle title={match.params.clusterId} />
      </PageHeader>
      <Main>
        <CveTable />
      </Main>
    </Fragment>
  );
};

ClusterDetailPage.propTypes = {
  match: PropTypes.object,
};

export default ClusterDetailPage;
