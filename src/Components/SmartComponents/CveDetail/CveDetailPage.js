import React, { Fragment } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import CveDetailPageHeader from '../../PresentationalComponents/CveDetailPageHeader';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import CveDetailTable from './CveDetailTable';

const CveDetailPage = () => {
  return (
    <Fragment>
      <CveDetailPageHeader />
      <Main>
        <TextContent>
          <Text component={TextVariants.h2} className="pf-u-mb-md">
            Exposed clusters
          </Text>
        </TextContent>
        <CveDetailTable />
      </Main>
    </Fragment>
  );
};

export default CveDetailPage;
