import React, { useEffect } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import CveDetailPageHeader from './CveDetailPageHeader';
import CveDetailTable from './CveDetailTable';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const CveDetailPage = () => {
  const chrome = useChrome();

  const { error, cve } = useSelector(({ CveDetailStore }) => CveDetailStore);

  useEffect(() => {
    cve.synopsis &&
      chrome.updateDocumentTitle(
        `${cve.synopsis} - CVEs - Vulnerability Dashboard | Red Hat Insights | console.redhat.com`
      );
  }, [cve.synopsis]);

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
