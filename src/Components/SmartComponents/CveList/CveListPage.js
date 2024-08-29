import React, { Fragment, useEffect } from 'react';
import {
  Alert,
  AlertActionCloseButton,
  AlertVariant,
  Icon,
  Popover,
} from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import CveListTable from './CveListTable';
import { useLocalStorage } from '../../../Helpers/hooks';
import { HEADER_ALERT_DISMISSED_KEY } from '../../../Helpers/constants';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const CveListPage = () => {
  const chrome = useChrome();

  const PRODUCT_DOC =
    'https://access.redhat.com/documentation/en-us/openshift_cluster_manager/1-latest';

  const [wasHeaderAlertDismissed, setHeaderAlertDismissed] = useLocalStorage(
    HEADER_ALERT_DISMISSED_KEY
  );

  useEffect(() => {
    chrome.updateDocumentTitle('CVEs - Vulnerability Dashboard | OpenShift');
  }, []);

  const HeaderTitle = (
    <Popover
      hasAutoWidth
      maxWidth="380px"
      position="right"
      enableFlip
      bodyContent={
        <Fragment>
          The Vulnerability service identifies CVEs with errata that may affect
          your Insights-connected OpenShift clusters. Vulnerability information
          applies for OCP4.8+ version only.
        </Fragment>
      }
      footerContent={
        <a href={PRODUCT_DOC} target="__blank" rel="noopener noreferrer">
          Learn more <ExternalLinkAltIcon />
        </a>
      }
    >
      <span>
        CVEs
        <Icon
          className="pf-v5-u-ml-sm pointer cves-header-questionmark"
          style={{
            verticalAlign: 0,
            color: 'var(--pf-v5-global--secondary-color--100)',
          }}
        >
          <OutlinedQuestionCircleIcon />
        </Icon>
      </span>
    </Popover>
  );

  return (
    <Fragment>
      <PageHeader>
        <PageHeaderTitle title={HeaderTitle} />
        {!wasHeaderAlertDismissed && (
          <Alert
            variant={AlertVariant.info}
            isInline
            className="pf-v5-u-mt-sm"
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
        <Alert
          variant={AlertVariant.info}
          isInline
          title="Check out Red Hat's fully managed Kubernetes-native security platform"
        >
          Performs in-depth vulnerability analysis and protects containerized
          applications across the full application life cycle.
          <br />
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/application-services/acs/overview"
          >
            Visit Red Hat Advanced Cluster Security Cloud Service (RHACSCS)
            <ExternalLinkAltIcon className="pf-v5-u-ml-sm" />
          </a>
        </Alert>
        <CveListTable />
      </section>
    </Fragment>
  );
};

export default CveListPage;
