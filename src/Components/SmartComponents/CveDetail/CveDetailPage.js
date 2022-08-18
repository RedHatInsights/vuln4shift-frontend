import React from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import CveDetailPageHeader from './CveDetailPageHeader';
import CveDetailTable from './CveDetailTable';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';

const CveDetailPage = () => {
  const { error } = useSelector(({ CveDetailStore }) => CveDetailStore);

  return (
    <ErrorHandler error={error}>
      <CveDetailPageHeader />
      <Main>
        <TextContent>
          <Text component={TextVariants.h2} className="pf-u-mb-md">
            Exposed clusters
          </Text>
        </TextContent>
        <CveDetailTable />
      </Main>
    </ErrorHandler>
  );
};

export default CveDetailPage;
