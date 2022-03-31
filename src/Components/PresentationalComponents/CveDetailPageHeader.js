import React, { useEffect, useState } from 'react';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ShieldSet from '../PresentationalComponents/ShieldSet';
import {
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  Flex,
  FlexItem,
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
import CvssVector from '../PresentationalComponents/CvssVector';
import { useRouteMatch } from 'react-router-dom';
import WithLoader, { LoaderType } from './WithLoader';
import MissingMetadata from '../PresentationalComponents/EmptyStates/MissingMetadata';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';

const CveDetailPageHeader = () => {
  const match = useRouteMatch();

  const [hasMetadata, setHasMetadata] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
      <PageHeaderTitle title={match.params.cveId} className="pf-u-mb-sm" />
      <Grid hasGutter>
        <GridItem md={8} sm={12}>
          <Stack hasGutter>
            {hasMetadata && (
              <StackItem className="pf-u-mt-sm">
                <Flex>
                  <FlexItem>Publish date:</FlexItem>
                  <FlexItem grow={{ default: 'grow' }}>
                    <WithLoader
                      isLoading={isLoading}
                      variant={LoaderType.inlineSkeleton}
                      size="sm"
                    >
                      23 Feb 2022
                    </WithLoader>
                  </FlexItem>
                </Flex>
              </StackItem>
            )}
            <StackItem>
              <WithLoader
                isLoading={isLoading}
                variant={LoaderType.rectangle}
                style={{ height: '132px', width: '100%' }}
              >
                {hasMetadata ? (
                  <TextContent style={{ textAlign: 'justify' }}>
                    <Text component={TextVariants.p}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nulla laoreet congue ante a pellentesque. Aenean tincidunt
                      at ipsum pellentesque facilisis. Morbi tristique in magna
                      vitae venenatis. Maecenas scelerisque purus sed enim
                      mollis, id ultricies dolor malesuada. Etiam nec ligula
                      auctor mauris placerat consequat hendrerit eget lorem.
                      Nunc iaculis nunc erat, vitae rhoncus dui ultricies in.
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Mauris nec volutpat mi.
                    </Text>
                    {/* Delete this shield set example after table is implemented */}
                    Shield set example:
                    <ShieldSet
                      count={{
                        critical: 1,
                        important: 2,
                        moderate: 0,
                        low: 4,
                      }}
                    />
                  </TextContent>
                ) : (
                  <MissingMetadata />
                )}
              </WithLoader>
            </StackItem>
            <StackItem className="pf-u-mt-sm pf-u-mb-md">
              <a>
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
              <b>
                <Shield
                  impact={hasMetadata ? 'Critical' : 'Unknown'}
                  hasLabel
                />
              </b>
            </StackItem>
            <StackItem>
              <CvssVector
                isLoading={false}
                score={hasMetadata ? 7.8 : 0}
                cvss3Vector={'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H'}
                hasMetadata={hasMetadata}
              />
            </StackItem>
            <StackItem>
              {/* Remove following component after no metadata state is handled */}
              <Checkbox
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
