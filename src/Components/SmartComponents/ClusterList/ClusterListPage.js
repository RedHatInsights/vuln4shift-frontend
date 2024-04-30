import React, { Fragment, useEffect } from 'react';
import {
  Alert,
  AlertActionCloseButton,
  AlertVariant,
} from '@patternfly/react-core';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ClusterListTable from './ClusterListTable';
import { HEADER_ALERT_DISMISSED_KEY } from '../../../Helpers/constants';
import { useLocalStorage } from '../../../Helpers/hooks';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const ClusterListPage = () => {
  const chrome = useChrome();

  const [wasHeaderAlertDismissed, setHeaderAlertDismissed] = useLocalStorage(
    HEADER_ALERT_DISMISSED_KEY
  );

  useEffect(() => {
    chrome.updateDocumentTitle(
      'Clusters - Vulnerability Dashboard | Red Hat Insights | console.redhat.com'
    );
  }, []);

  return (
    <Fragment>
      <PageHeader>
        <PageHeaderTitle title="Vulnerable clusters" className="pf-u-mb-sm" />
        {!wasHeaderAlertDismissed && (
          <Alert
            variant={AlertVariant.info}
            isInline
            className="pf-u-mt-md"
            title="Vulnerability information applies to OCP4.8+ version only"
            actionClose={
              <AlertActionCloseButton
                onClose={() => setHeaderAlertDismissed(true)}
              />
            }
          />
        )}
      </PageHeader>
      <section className="pf-v5-l-page__main-section pf-v5-c-page__main-section">
        <ClusterListTable />
      </section>
    </Fragment>
  );
};

export default ClusterListPage;
