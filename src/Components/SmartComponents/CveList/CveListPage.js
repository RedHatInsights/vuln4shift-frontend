import React, { Fragment } from 'react';
import {
  Alert,
  AlertActionCloseButton,
  AlertVariant,
  Popover,
} from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import CveListTable from './CveListTable';
import { useLocalStorage } from '../../../Helpers/hooks';
import { HEADER_ALERT_DISMISSED_KEY } from '../../../Helpers/constants';

const CveListPage = () => {
  // TODO: Add correct link
  const PRODUCT_DOC = 'https://access.redhat.com/';

  const [wasHeaderAlertDismissed, setHeaderAlertDismissed] = useLocalStorage(
    HEADER_ALERT_DISMISSED_KEY
  );

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
        <OutlinedQuestionCircleIcon
          color="var(--pf-global--secondary-color--100)"
          className="pf-u-ml-sm pointer cves-header-questionmark"
          style={{ verticalAlign: '0' }}
        />
      </span>
    </Popover>
  );

  return (
    <Fragment>
      <PageHeader>
        <PageHeaderTitle title={HeaderTitle} className="pf-u-mb-sm" />
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
        <CveListTable />
      </Main>
    </Fragment>
  );
};

export default CveListPage;
