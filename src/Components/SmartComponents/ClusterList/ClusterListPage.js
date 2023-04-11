import React, { Fragment, useEffect } from 'react';
import {
  Alert,
  AlertActionCloseButton,
  AlertVariant,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
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
      'Clusters - OCP Vulnerability | Red Hat Insights | console.redhat.com'
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
      <Main>
        <ClusterListTable />
      </Main>
    </Fragment>
  );
};

export default ClusterListPage;
