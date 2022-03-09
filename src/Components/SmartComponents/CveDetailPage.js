import React, { Fragment } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ClusterTable from './CveTable';
import PropTypes from 'prop-types';

const CveDetailPage = ({ match }) => {
  return (
    <Fragment>
      <PageHeader>
        <PageHeaderTitle title={match.params.cve} />
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
