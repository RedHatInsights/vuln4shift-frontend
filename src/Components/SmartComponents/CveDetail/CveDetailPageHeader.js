import React, { useEffect, useState, Fragment } from 'react';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import {
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  Grid,
  GridItem,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { Shield } from '@redhat-cloud-services/frontend-components/Shield';
import CvssVector from '../../PresentationalComponents/CvssVector';
import { useRouteMatch } from 'react-router-dom';
import WithLoader, {
  LoaderType,
} from '../../PresentationalComponents/WithLoader';
import MissingMetadata from '../../PresentationalComponents/EmptyStates/MissingMetadata';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCveDetails } from '../../../Store/Actions';
import { processDate } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import parseCvssScore from '@redhat-cloud-services/frontend-components-utilities/parseCvssScore';
import { SEVERITY_OPTIONS } from '../../../Helpers/constants';

const CveDetailPageHeader = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const { cve, isDetailLoading } = useSelector(
    ({ CveDetailStore }) => CveDetailStore
  );

  const {
    description,
    severity,
    publish_date,
    cvss2_score,
    cvss3_score,
    cvss2_metrics,
    cvss3_metrics,
  } = cve;

  const [hasMetadata, setHasMetadata] = useState(true);

  useEffect(() => {
    dispatch(fetchCveDetails(match.params.cveId));
  }, []);

  return (
    <PageHeader>
      <Breadcrumb className="pf-u-mb-md">
        <BreadcrumbItem>
          <Link to="/">Vulnerability</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/cves">CVEs</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{match.params.cveId}</BreadcrumbItem>
      </Breadcrumb>
      <PageHeaderTitle
        title={
          <Fragment>
            <span className="pf-u-mr-md">{match.params.cveId}</span>
            {/* TODO: Implement after backend starts providing known exploit param
            hasKnownExploit && <KnownExploitLabel
              labelProps={{ style: { verticalAlign: 4, fontWeight: 300 } }}
            />
            */}
          </Fragment>
        }
        className="pf-u-mb-sm"
      />
      <Grid hasGutter>
        <GridItem md={8} sm={12}>
          <Stack hasGutter>
            {hasMetadata && (
              <StackItem className="pf-u-mt-sm">
                Publish date:&nbsp;
                <WithLoader
                  isLoading={isDetailLoading}
                  variant={LoaderType.inlineSkeleton}
                  width="100px"
                  fontSize="sm"
                  style={{ verticalAlign: -4 }}
                >
                  {processDate(publish_date)}
                </WithLoader>
              </StackItem>
            )}
            <StackItem>
              <WithLoader
                isLoading={isDetailLoading}
                variant={LoaderType.rectangle}
                style={{ height: '132px', width: '100%' }}
              >
                {hasMetadata ? (
                  <TextContent style={{ textAlign: 'justify' }}>
                    <Text component={TextVariants.p}>{description}</Text>
                  </TextContent>
                ) : (
                  <MissingMetadata />
                )}
              </WithLoader>
            </StackItem>
            <StackItem className="pf-u-mt-sm pf-u-mb-md">
              <a
                href={`https://access.redhat.com/security/cve/${match.params.cveId}`}
                target="__blank"
                rel="noopener noreferrer"
              >
                View in Red Hat CVE database <ExternalLinkAltIcon />
              </a>
            </StackItem>
          </Stack>
        </GridItem>

        <GridItem md={4} sm={12} className="pf-u-mt-sm pf-u-ml-sm">
          <Stack hasGutter>
            <StackItem>
              <TextContent>
                <Text
                  component={TextVariants.h6}
                  className="pointer pf-u-mb-xs"
                >
                  Severity
                </Text>
              </TextContent>
              <WithLoader
                isLoading={isDetailLoading}
                variant={LoaderType.inlineSkeleton}
                width="100px"
                fontSize="sm"
                style={{ verticalAlign: -4 }}
              >
                <b>
                  <span
                    style={{
                      color:
                        hasMetadata &&
                        SEVERITY_OPTIONS.find(
                          (option) => option.label === severity
                        )?.textColor,
                    }}
                  >
                    <Shield
                      impact={hasMetadata ? severity : 'Unknown'}
                      hasLabel
                    />
                  </span>
                </b>
              </WithLoader>
            </StackItem>
            <StackItem>
              <CvssVector
                isLoading={isDetailLoading}
                score={parseCvssScore(cvss3_score ?? cvss2_score)}
                cvss2Vector={cvss2_metrics}
                cvss3Vector={cvss3_metrics}
                hasMetadata={hasMetadata}
              />
            </StackItem>
            <StackItem>
              {/* TODO: Remove following component after no metadata state is handled */}
              <Checkbox
                id="temporary-has-metadata-checkbox"
                isChecked={hasMetadata}
                onChange={(checked) => setHasMetadata(checked)}
                label="Has metadata"
              />
            </StackItem>
          </Stack>
        </GridItem>
      </Grid>
    </PageHeader>
  );
};

export default CveDetailPageHeader;
