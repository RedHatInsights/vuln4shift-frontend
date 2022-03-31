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
        <Breadcrumb className="pf-u-mb-md">
          <BreadcrumbItem>
            <Link to="/">Vulnerability</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/clusters">Clusters</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>rhel-9.0</BreadcrumbItem>
        </Breadcrumb>
        <PageHeaderTitle title="rhel-9.0" className="pf-u-mb-sm" />
        <Fragment>
          UUID: {match.params.clusterId}
          <br />
          Last seen: 31 Mar 2022 06:33 UTC
        </Fragment>
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
