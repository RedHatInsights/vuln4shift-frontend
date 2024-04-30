import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { processDate } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import parseCvssScore from '@redhat-cloud-services/frontend-components-utilities/parseCvssScore';
import { Shield } from '@redhat-cloud-services/frontend-components/Shield';
import ShieldSet from '../Components/PresentationalComponents/ShieldSet';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { subtractDays, subtractYears } from './miscHelper';
import MissingMetadata from '../Components/PresentationalComponents/EmptyStates/MissingMetadata';

export const EXPOSED_IMAGES_FEATURE_FLAG = 'vuln4shift.exposed_images';

export const HEADER_ALERT_DISMISSED_KEY = 'vuln4shift:header-alert-dismissed';

export const DEFAULT_LIMIT = 20;

export const CVE_DETAIL_TABS = {
  clusters: 'clusters',
  images: 'images',
};

export const CLUSTER_DETAIL_TABS = {
  cves: 'cves',
  images: 'images',
};

/* FILTER OPTIONS */

export const PUBLISHED_OPTIONS = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'last7days',
    label: 'Last 7 days',
    from: subtractDays(new Date(), 7),
  },
  {
    value: 'last30days',
    label: 'Last 30 days',
    from: subtractDays(new Date(), 30),
  },
  {
    value: 'last90days',
    label: 'Last 90 days',
    from: subtractDays(new Date(), 90),
  },
  {
    value: 'lastYear',
    label: 'Last year',
    from: subtractYears(new Date(), 1),
  },
  {
    value: 'moreThanYear',
    label: 'More than 1 year ago',
    to: subtractYears(new Date(), 1),
  },
];

export const SEVERITY_OPTIONS = [
  {
    value: 'critical',
    label: 'Critical',
    iconColor: 'var(--pf-global--danger-color--100)',
    textColor: 'var(--pf-global--danger-color--100)',
    hasIcon: true,
  },
  {
    value: 'important',
    label: 'Important',
    iconColor: 'var(--pf-global--palette--orange-300)',
    textColor: 'var(--pf-global--palette--orange-400)',
    hasIcon: true,
  },
  {
    value: 'moderate',
    label: 'Moderate',
    iconColor: 'var(--pf-global--warning-color--100)',
    textColor: 'var(--pf-global--warning-color--200)',
    hasIcon: true,
  },
  {
    value: 'low',
    label: 'Low',
    iconColor: 'var(--pf-global--Color--200)',
    textColor: 'var(--pf-global--default-color--300)',
    hasIcon: true,
  },
  {
    value: 'none',
    label: 'Unknown',
  },
];

export const CLUSTER_SEVERITY_OPTIONS = [
  {
    value: 'any',
    label: 'All clusters',
  },
  {
    value: 'critical',
    label: 'Critical',
  },
  {
    value: 'important',
    label: 'Important',
  },
  {
    value: 'moderate',
    label: 'Moderate',
  },
  {
    value: 'low',
    label: 'Low',
  },
];

export const EXPOSED_CLUSTERS_OPTIONS = [
  {
    value: 'oneOrMore',
    label: '1 or more',
  },
  {
    value: 'none',
    label: 'None',
  },
];

export const CLUSTER_STATUS_OPTIONS = [
  {
    value: 'Connected',
    label: 'Connected',
  },
  {
    value: 'Disconnected',
    label: 'Disconnected',
  },
  {
    value: 'Stale',
    label: 'Stale',
  },
  {
    value: 'N/A',
    label: 'Unknown',
  },
];

export const CLUSTER_VERSION_OPTIONS = [
  {
    value: 'N/A',
    label: 'Unknown',
  },
];

export const CLUSTER_PROVIDER_OPTIONS = [
  {
    value: 'N/A',
    label: 'Unknown',
  },
];

export const IMAGE_REGISTRY_OPTIONS = [];

/* TABLE COLUMNS */

export const CVE_LIST_TABLE_COLUMNS = (areExposedImagesEnabled) => [
  {
    title: 'CVE ID',
    sortParam: 'synopsis',
    isShown: true,
    isShownByDefault: true,
    isUntoggleable: true,
  },
  {
    title: 'Publish date',
    sortParam: 'publish_date',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Severity',
    sortParam: 'severity',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'CVSS base score',
    sortParam: 'cvss_score',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Exposed clusters',
    sortParam: 'clusters_exposed',
    isShown: true,
    isShownByDefault: true,
  },
  ...(areExposedImagesEnabled
    ? [
        {
          title: 'Exposed images',
          sortParam: 'images_exposed',
          isShown: true,
          isShownByDefault: true,
        },
      ]
    : []),
];

export const CLUSTER_LIST_TABLE_COLUMNS = [
  {
    title: 'Name',
    sortParam: 'display_name',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
    isUntoggleable: true,
  },
  {
    title: 'Status',
    sortParam: 'status',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Type',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Version',
    sortParam: 'version',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'CVEs severity',
    sortParam: 'cluster_severity',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Provider',
    sortParam: 'provider',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Last seen',
    sortParam: 'last_seen',
    isShown: true,
    isShownByDefault: true,
  },
];

export const CVE_CLUSTERS_TABLE_COLUMNS = [
  {
    title: 'Name',
    sortParam: 'display_name',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
    isUntoggleable: true,
  },
  {
    title: 'Status',
    sortParam: 'status',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Type',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Version',
    sortParam: 'version',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Provider',
    sortParam: 'provider',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Last seen',
    sortParam: 'last_seen',
    isShown: true,
    isShownByDefault: true,
  },
];

export const CVE_IMAGES_TABLE_COLUMNS = [
  {
    title: 'Name',
    sortParam: 'name',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
    isUntoggleable: true,
  },
  {
    title: 'Registry name',
    sortParam: 'registry',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Version',
    sortParam: 'version',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Exposed clusters',
    sortParam: 'clusters_exposed',
    isShown: true,
    isShownByDefault: true,
    width: 15,
  },
];

export const CLUSTER_CVES_TABLE_COLUMNS = [
  {
    title: 'CVE ID',
    sortParam: 'synopsis',
    isShown: true,
    isShownByDefault: true,
    isUntoggleable: true,
  },
  {
    title: 'Publish date',
    sortParam: 'publish_date',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Severity',
    sortParam: 'severity',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'CVSS base score',
    sortParam: 'cvss_score',
    isShown: true,
    isShownByDefault: true,
  },
];

export const CLUSTER_IMAGES_TABLE_COLUMNS = [
  {
    title: 'Name',
    sortParam: 'name',
    sortDefaultDirection: 'asc',
    isShown: true,
    isShownByDefault: true,
    isUntoggleable: true,
  },
  {
    title: 'Registry name',
    sortParam: 'registry',
    isShown: true,
    isShownByDefault: true,
  },
  {
    title: 'Version',
    sortParam: 'version',
    isShown: true,
    isShownByDefault: true,
  },
];

/* TABLE ROW MAPPERS */

const createCveDescription = (row) => (
  <Fragment>
    {row.description === 'unknown' ? (
      <MissingMetadata variant="large" style={{ padding: 0 }} />
    ) : (
      <TextContent>
        <Text component={TextVariants.h6} style={{ fontSize: 14 }}>
          CVE description
        </Text>
        {row.description}
      </TextContent>
    )}
    <Link
      to={'../cves/' + row.synopsis}
      className="pf-u-mt-md pf-u-display-block"
    >
      View more information about this CVE
    </Link>
  </Fragment>
);

export const CVE_LIST_TABLE_MAPPER = (row, areExposedImagesEnabled) => ({
  key: row.synopsis,
  cells: [
    <Link to={`../cves/${row.synopsis}/clusters`} key={row.synopsis}>
      {row.synopsis}
    </Link>,
    processDate(row.publish_date),
    <Shield hasLabel impact={row.severity} key={row.synopsis} />,
    parseCvssScore(row.cvss2_score, row.cvss3_score, true),
    <Link to={`../cves/${row.synopsis}/clusters`} key={row.synopsis}>
      {row.clusters_exposed}
    </Link>,
    ...(areExposedImagesEnabled
      ? [
          <Link to={`../cves/${row.synopsis}/images`} key={row.synopsis}>
            {row.images_exposed}
          </Link>,
        ]
      : []),
  ],
  expandableContent: createCveDescription(row),
});

export const CLUSTER_LIST_TABLE_MAPPER = (row) => ({
  key: row.id,
  cells: [
    <Link to={`../clusters/${row.id}/cves`} key={row.id}>
      {row.display_name}
    </Link>,
    row.status,
    row.type,
    row.version,
    <ShieldSet
      key={row.id}
      count={{ ...row.cves_severity }}
      linkTo={`./${row.id}`}
    />,
    row.provider,
    <DateFormat key={row.id} date={row.last_seen} type="relative" />,
  ],
});

export const CVE_CLUSTERS_TABLE_MAPPER = (row) => ({
  key: row.id,
  cells: [
    <Link to={`../clusters/${row.id}/cves`} key={row.id}>
      {row.display_name}
    </Link>,
    row.status,
    row.type,
    row.version,
    row.provider,
    <DateFormat key={row.id} date={row.last_seen} type="relative" />,
  ],
});

export const CVE_IMAGES_TABLE_MAPPER = (row) => ({
  key: row.id,
  cells: [row.name, row.registry, row.version, row.clusters_exposed],
});

export const CLUSTER_CVES_TABLE_MAPPER = (row) => ({
  key: row.synopsis,
  cells: [
    <Link to={`../cves/${row.synopsis}/clusters`} key={row.synopsis}>
      {row.synopsis}
    </Link>,
    processDate(row.publish_date),
    <Shield hasLabel impact={row.severity} key={row.synopsis} />,
    parseCvssScore(row.cvss2_score, row.cvss3_score, true),
  ],
  expandableContent: createCveDescription(row),
});

export const CLUSTER_IMAGES_TABLE_MAPPER = (row) => ({
  key: row.name,
  cells: [row.name, row.registry, row.version],
});

/* ALLOWED PARAMETERS */

export const GENERIC_ALLOWED_PARAMS = ['limit', 'offset', 'sort'];

export const CVE_LIST_ALLOWED_PARAMS = [
  ...GENERIC_ALLOWED_PARAMS,
  'search',
  'published',
  'severity',
  'cvss_score',
  'affected_clusters',
];

export const CLUSTER_LIST_ALLOWED_PARAMS = [
  ...GENERIC_ALLOWED_PARAMS,
  'search',
  'status',
  'version',
  'cluster_severity',
  'provider',
];

export const CVE_CLUSTERS_ALLOWED_PARAMS = [
  ...GENERIC_ALLOWED_PARAMS,
  'search',
  'status',
  'version',
  'provider',
];

export const CVE_IMAGES_ALLOWED_PARAMS = [
  ...GENERIC_ALLOWED_PARAMS,
  'search',
  'registry',
];

export const CLUSTER_CVES_ALLOWED_PARAMS = [
  ...GENERIC_ALLOWED_PARAMS,
  'search',
  'published',
  'severity',
  'cvss_score',
];

export const CLUSTER_IMAGES_ALLOWED_PARAMS = [
  ...GENERIC_ALLOWED_PARAMS,
  'search',
  'registry',
];

/* DEFAULT FILTERS */

export const CVE_LIST_DEFAULT_FILTERS = {
  affected_clusters: 'oneOrMore',
};

export const CLUSTER_LIST_DEFAULT_FILTERS = {
  cluster_severity: 'any',
};

export const CVE_CLUSTERS_DEFAULT_FILTERS = {};

export const CVE_IMAGES_DEFAULT_FILTERS = {};

export const CLUSTER_CVES_DEFAULT_FILTERS = {};

export const CLUSTER_IMAGES_DEFAULT_FILTERS = {};

/* EXPORTS */
export const CVE_LIST_EXPORT_PREFIX = 'ocp-vulnerability_cves--';
export const CLUSTER_LIST_EXPORT_PREFIX = 'ocp-vulnerability_clusters--';
export const CVE_CLUSTERS_EXPORT_PREFIX =
  'ocp-vulnerability_exposed-clusters--';
export const CVE_IMAGES_EXPORT_PREFIX = 'ocp-vulnerability_exposed-images--';
export const CLUSTER_CVES_EXPORT_PREFIX = 'ocp-vulnerability_cluster-cves--';
export const CLUSTER_IMAGES_EXPORT_PREFIX =
  'ocp-vulnerability_cluster-images--';
