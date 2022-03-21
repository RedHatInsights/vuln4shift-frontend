import React, { Fragment } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ClusterTable from './CveTable';
import ShieldSet from '../PresentationalComponents/ShieldSet';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { Shield } from '@redhat-cloud-services/frontend-components/Shield';
import CvssVector from '../PresentationalComponents/CvssVector';

const CveDetailPage = ({ match }) => {
  return (
    <Fragment>
      <PageHeader>
        <Breadcrumb className="pf-u-mb-md">
          <BreadcrumbItem>
            <Link to="/">Vulnerability</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/cves">CVEs</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{match.params.cveId}</BreadcrumbItem>
        </Breadcrumb>
        <PageHeaderTitle title={match.params.cveId} />
        Shield example: <Shield impact="Critical" hasLabel />
        <br />
        Shield set example:
        <ShieldSet
          count={{
            critical: 1,
            important: 2,
            moderate: 0,
            low: 4,
          }}
        />
        <CvssVector
          isLoading={false}
          score={7.8}
          cvss3Vector="CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H"
        />
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
