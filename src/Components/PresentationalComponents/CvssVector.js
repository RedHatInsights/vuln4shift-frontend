import {
  Popover,
  TextContent,
  Text,
  TextVariants,
  Icon,
} from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import { TableVariant } from '@patternfly/react-table';
import {
  Table,
  TableBody,
  TableHeader,
} from '@patternfly/react-table/deprecated';
import propTypes from 'prop-types';
import React from 'react';
import WithLoader, { LoaderType } from './WithLoader';
import { V3names, V2names } from '../../Helpers/vectorNames';

export const parseVector = (vector, namesMapping) => {
  let parsedVector = {};

  vector?.split('/').forEach((curr) => {
    let [key, val] = curr.split(':');

    const name = namesMapping[key]?.name;
    const value = namesMapping[key]?.values[val] ?? 'N/A';

    if (name) {
      parsedVector[name] = value;
    }
  });

  return parsedVector;
};

const CvssVector = ({
  cvss2Vector,
  cvss3Vector,
  score,
  isLoading,
  hasMetadata,
}) => {
  const cvssVersion = cvss2Vector ? 'CVSS 2.0' : 'CVSS 3.0';
  const cvssVector = cvss2Vector || cvss3Vector;
  const namesMapping = cvss2Vector ? V2names : V3names;
  const parsedVector = parseVector(cvssVector, namesMapping);

  delete parsedVector.cvssVersion;

  return hasMetadata ? (
    <TextContent>
      <Popover
        id="popover-cvss"
        position="bottom"
        maxWidth="100%"
        enableFlip
        headerContent={`${cvssVersion} vector breakdown`}
        bodyContent={
          <WithLoader
            isLoading={isLoading}
            columns={['Metric', 'Value']}
            rows={8}
            variant={LoaderType.compactTable}
          >
            {cvssVector ? (
              <Table
                aria-label="Metric breakdown"
                variant={TableVariant.compact}
                gridBreakPoint=""
                cells={['Metric', 'Value']}
                rows={Object.entries(parsedVector)}
              >
                <TableHeader />
                <TableBody />
              </Table>
            ) : (
              'N/A'
            )}
          </WithLoader>
        }
      >
        <Text component={TextVariants.h6} className="pointer pf-u-mb-xs">
          {cvssVersion} base score
          <Icon
            style={{ color: 'var(--pf-global--secondary-color--100)' }}
            className="pf-u-ml-xs"
          >
            <OutlinedQuestionCircleIcon />
          </Icon>
        </Text>
      </Popover>
      <WithLoader
        isLoading={isLoading}
        variant={LoaderType.inlineSkeleton}
        width="360px"
      >
        <span
          className="pf-u-mr-md"
          data-ouia-component-id="cve-detail-cvss-score"
        >
          {score}
        </span>
        <span
          id="cvss-vector-content"
          data-ouia-component-id="cve-detail-cvss-score-breakdown"
        >
          Vector:
          {' ' + cvssVector?.substring(cvssVector.indexOf('/') + 1) || 'N/A'}
        </span>
      </WithLoader>
    </TextContent>
  ) : (
    <TextContent>
      <Text component={TextVariants.h6} className="pf-u-mb-xs">
        CVSS base score
      </Text>
      <span data-ouia-component-id="cve-detail-cvss-score">Unknown</span>
    </TextContent>
  );
};

CvssVector.propTypes = {
  cvss2Vector: propTypes.string,
  cvss3Vector: propTypes.string,
  score: propTypes.any.isRequired,
  isLoading: propTypes.bool.isRequired,
  hasMetadata: propTypes.bool.isRequired,
};

export default CvssVector;
