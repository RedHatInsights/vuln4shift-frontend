import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  Bullseye,
  EmptyStateVariant,
  Text,
} from '@patternfly/react-core';

const MissingMetadata = () => (
  <Bullseye>
    <EmptyState variant={EmptyStateVariant.large} style={{ padding: 0 }}>
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

export default MissingMetadata;
