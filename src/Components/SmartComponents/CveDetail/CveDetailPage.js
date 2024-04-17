import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import CveDetailPageHeader from './CveDetailPageHeader';
import CveDetailTable from './CveDetailTable';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import TableTabs from '../../PresentationalComponents/TableTabs';
import { CVE_DETAIL_TABS } from '../../../Helpers/constants';

const CveDetailPage = ({ activeTab }) => {
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
        <TableTabs
          activeTab={activeTab}
          tabs={[
            {
              title: 'Exposed clusters',
              path: CVE_DETAIL_TABS.clusters,
              Component: CveDetailTable,
            },
          ]}
        />
      </Main>
    </ErrorHandler>
  );
};

CveDetailPage.propTypes = {
  activeTab: propTypes.oneOf(Object.values(CVE_DETAIL_TABS)).isRequired,
};

export default CveDetailPage;
