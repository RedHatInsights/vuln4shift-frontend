import React, { Fragment } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ClusterTable from './CveTable';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Link } from 'react-router-dom';

const CveDetailPage = ({ match }) => {
  return (
    <Fragment>
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Vulnerability</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/cves">CVEs</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{match.params.cveId}</BreadcrumbItem>
        </Breadcrumb>
        <PageHeaderTitle title={match.params.cveId} />
      </PageHeader>
      <Main>
        <ClusterTable />
      </Main>
    </Fragment>
  );
};

CveDetailPage.propTypes = {
  match: PropTypes.object,
};

export default CveDetailPage;
