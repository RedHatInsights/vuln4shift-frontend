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
      'Clusters - Vulnerability Dashboard | OpenShift'
    );
  }, []);

  return (
    <Fragment>
      <PageHeader>
        <PageHeaderTitle title="Vulnerable clusters" />
        {!wasHeaderAlertDismissed && (
          <Alert
            variant={AlertVariant.info}
            isInline
            className="pf-v6-u-mt-sm"
            title="Vulnerability information applies to OCP4.8+ version only"
            actionClose={
              <AlertActionCloseButton
                onClose={() => setHeaderAlertDismissed(true)}
              />
            }
          />
        )}
      </PageHeader>
      <section className="pf-v6-l-page__main-section pf-v6-c-page__main-section">
        <ClusterListTable />
      </section>
    </Fragment>
  );
};

export default ClusterListPage;
