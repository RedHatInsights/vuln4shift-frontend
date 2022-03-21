import {
  Popover,
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import {
  Table,
  TableBody,
  TableHeader,
  TableVariant,
} from '@patternfly/react-table';
import propTypes from 'prop-types';
import React from 'react';
import WithLoader, { LoaderType } from './WithLoader';
import { V3names, V2names } from './vectorNames';

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

const CvssVector = ({ cvss2Vector, cvss3Vector, score, isLoading }) => {
  const cvssVersion = cvss3Vector ? 'CVSS 3.0' : 'CVSS 2.0';
  const cvssVector = cvss3Vector || cvss2Vector;
  const namesMapping = cvss3Vector ? V3names : V2names;
  const parsedVector = parseVector(cvssVector, namesMapping);

  delete parsedVector.cvssVersion;

  return (
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
            colSize={2}
            rowSize={8}
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
          <OutlinedQuestionCircleIcon
            color="var(--pf-global--secondary-color--100)"
            className="pf-u-ml-xs"
          />
        </Text>
      </Popover>

      <WithLoader isLoading={isLoading} style={{ width: '320px' }}>
        <span className="pf-u-mr-md">{score}</span>
        <span id="cvss-vector-content">
          Vector:
          {cvssVector?.substring(cvssVector.indexOf('/') + 1) || 'N/A'}
        </span>
      </WithLoader>
    </TextContent>
  );
};

CvssVector.propTypes = {
  cvss2Vector: propTypes.string,
  cvss3Vector: propTypes.string,
  score: propTypes.any.isRequired,
  isLoading: propTypes.bool.isRequired,
};

export default CvssVector;
