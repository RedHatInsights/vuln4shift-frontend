import React, { Fragment } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import ClusterTable from './CveTable';
import CveDetailPageHeader from '../PresentationalComponents/CveDetailPageHeader';

const CveDetailPage = () => {
  return (
    <Fragment>
      <CveDetailPageHeader />
      <Main>
        <ClusterTable />
      </Main>
    </Fragment>
  );
};

export default CveDetailPage;
