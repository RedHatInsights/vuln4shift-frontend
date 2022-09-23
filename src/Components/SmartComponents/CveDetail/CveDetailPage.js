import React from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import CveDetailPageHeader from './CveDetailPageHeader';
import CveDetailTable from './CveDetailTable';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';

const CveDetailPage = () => {
  const { error, cve } = useSelector(({ CveDetailStore }) => CveDetailStore);

  cve.synopsis &&
    insights.chrome.updateDocumentTitle(
      `${cve.synopsis} - CVEs - OCP Vulnerability | Red Hat Insights | console.redhat.com`
    );

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
