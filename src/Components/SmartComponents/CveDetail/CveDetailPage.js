import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import CveDetailPageHeader from './CveDetailPageHeader';
import CveClustersTable from './CveClustersTable';
import CveImagesTable from './CveImagesTable';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import TableTabs from '../../PresentationalComponents/TableTabs';
import {
  CVE_DETAIL_TABS,
  EXPOSED_IMAGES_FEATURE_FLAG,
} from '../../../Helpers/constants';
import { useFeatureFlag } from '../../../Helpers/hooks';

const CveDetailPage = ({ activeTab }) => {
  const chrome = useChrome();

  const areExposedImagesEnabled = useFeatureFlag(EXPOSED_IMAGES_FEATURE_FLAG);

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
      <section className="pf-v5-l-page__main-section pf-v5-c-page__main-section">
        <TableTabs
          activeTab={activeTab}
          tabs={[
            {
              title: 'Exposed clusters',
              path: CVE_DETAIL_TABS.clusters,
              Component: CveClustersTable,
            },
            ...(areExposedImagesEnabled
              ? [
                  {
                    title: 'Exposed images',
                    path: CVE_DETAIL_TABS.images,
                    Component: CveImagesTable,
                  },
                ]
              : []),
          ]}
        />
      </section>
    </ErrorHandler>
  );
};

CveDetailPage.propTypes = {
  activeTab: propTypes.oneOf(Object.values(CVE_DETAIL_TABS)).isRequired,
};

export default CveDetailPage;
