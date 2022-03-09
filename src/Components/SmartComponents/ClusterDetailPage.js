import React, { Fragment } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import CveTable from './CveTable';
import PropTypes from 'prop-types';

const ClusterDetailPage = ({ match }) => {
  return (
    <Fragment>
      <PageHeader>
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
