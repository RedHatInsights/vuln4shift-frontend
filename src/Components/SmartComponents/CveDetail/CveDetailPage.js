import React from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import CveDetailPageHeader from './CveDetailPageHeader';
import CveDetailTable from './CveDetailTable';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';

const CveDetailPage = () => {
  const { error } = useSelector(({ CveDetailStore }) => CveDetailStore);

  return (
    <ErrorHandler error={error}>
      <CveDetailPageHeader />
      <Main>
        <CveDetailTable />
      </Main>
    </ErrorHandler>
  );
};

export default CveDetailPage;
