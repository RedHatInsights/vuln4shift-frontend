import React, { useEffect, Fragment } from 'react';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import {
  Grid,
  GridItem,
  Stack,
  StackItem,
  Content,
  ContentVariants,
} from '@patternfly/react-core';
import { Shield } from '@redhat-cloud-services/frontend-components/Shield';
import CvssVector from '../../PresentationalComponents/CvssVector';
import { useParams } from 'react-router-dom';
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
  const params = useParams();
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

  const hasMetadata = description !== 'unknown';

  useEffect(() => {
    dispatch(fetchCveDetails(params.cveId));
  }, []);

  return (
    <PageHeader style={{ paddingBottom: 0 }}>
      <PageHeaderTitle
        title={
          <Fragment>
            <span className="pf-v6-u-mr-md">{params.cveId}</span>
            {/* TODO: Implement after backend starts providing known exploit param
            hasKnownExploit && <KnownExploitLabel
              labelProps={{ style: { verticalAlign: 4, fontWeight: 300 } }}
            />
            */}
          </Fragment>
        }
        className="pf-v6-u-mb-sm"
      />
      <Grid hasGutter>
        <GridItem md={8} sm={12}>
          <Stack hasGutter>
            {hasMetadata && (
              <StackItem className="pf-v6-u-mt-sm">
                Publish date:&nbsp;
                <WithLoader
                  isLoading={isDetailLoading}
                  variant={LoaderType.inlineSkeleton}
                  width="100px"
                  style={{ verticalAlign: -4 }}
                >
                  <span data-ouia-component-id="cve-detail-publish-date">
                    {processDate(publish_date)}
                  </span>
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
                  <Content
                    style={{ textAlign: 'justify' }}
                    ouiaId="cve-detail-description"
                  >
                    <Content component={ContentVariants.p}>
                      {description}
                    </Content>
                  </Content>
                ) : (
                  <MissingMetadata
                    variant="full"
                    style={{ maxWidth: 800, padding: 16 }}
                  />
                )}
              </WithLoader>
            </StackItem>
            <StackItem className="pf-v6-u-mt-sm pf-v6-u-mb-md">
              <a
                href={`https://access.redhat.com/security/cve/${params.cveId}`}
                target="__blank"
                rel="noopener noreferrer"
              >
                View in Red Hat CVE database <ExternalLinkAltIcon />
              </a>
            </StackItem>
          </Stack>
        </GridItem>

        <GridItem md={4} sm={12} className="pf-v6-u-mt-sm pf-v6-u-ml-sm">
          <Stack hasGutter>
            <StackItem>
              <Content>
                <Content
                  component={ContentVariants.h6}
                  className="pointer pf-v6-u-mb-xs"
                >
                  Severity
                </Content>
              </Content>
              <WithLoader
                isLoading={isDetailLoading}
                variant={LoaderType.inlineSkeleton}
                width="100px"
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
                    data-ouia-component-id="cve-detail-severity"
                  >
                    <Shield
                      size="lg"
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
          </Stack>
        </GridItem>
      </Grid>
    </PageHeader>
  );
};

export default CveDetailPageHeader;
