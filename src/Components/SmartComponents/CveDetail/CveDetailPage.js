import React from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import CveDetailPageHeader from './CveDetailPageHeader';
import CveDetailTable from './CveDetailTable';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const CveDetailPage = () => {
  const chrome = useChrome();

  const { error, cve } = useSelector(({ CveDetailStore }) => CveDetailStore);

  cve.synopsis &&
    chrome.updateDocumentTitle(
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
