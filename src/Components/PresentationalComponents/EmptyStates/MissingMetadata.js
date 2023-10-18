import React from 'react';
import propTypes from 'prop-types';
import {
  EmptyState,
  EmptyStateBody,
  Bullseye,
  Text,
} from '@patternfly/react-core';

const MissingMetadata = ({ ...props }) => (
  <Bullseye>
    <EmptyState variant="lg" {...props}>
      <Text>
        <strong>No description available</strong>
      </Text>
      <EmptyStateBody>
        This CVE has been published, however metadata about this CVE is not yet
        available on Red Hat Insights. Metadata is usually available on Insights
        within 24 hours of a CVE being published.
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

MissingMetadata.propTypes = {
  props: propTypes.object,
};

export default MissingMetadata;
