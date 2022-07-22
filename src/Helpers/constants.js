import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { processDate } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import parseCvssScore from '@redhat-cloud-services/frontend-components-utilities/parseCvssScore';
import { Shield } from '@redhat-cloud-services/frontend-components/Shield';
import ShieldSet from '../Components/PresentationalComponents/ShieldSet';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { subtractDays, subtractYears } from './miscHelper';

export const HEADER_ALERT_DISMISSED_KEY = 'vuln4shift:header-alert-dismissed';

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

export const EXPOSED_CLUSTERS_OPTIONS = [
  {
    value: 'true',
    label: '1 or more',
  },
  {
    value: 'false',
    label: 'None',
  },
];

/* TABLE COLUMNS */

export const CVE_LIST_TABLE_COLUMNS = [
  {
    title: 'CVE ID',
    sortParam: 'synopsis',
  },
  {
    title: 'Publish date',
    sortParam: 'publish_date',
  },
  {
    title: 'Severity',
    sortParam: 'severity',
  },
  {
    title: 'CVSS base score',
    sortParam: 'cvss_score',
  },
  {
    title: 'Clusters exposed',
    sortParam: 'clusters_exposed',
  },
  {
    title: 'Images exposed',
    sortParam: 'images_exposed',
  },
];

export const CLUSTER_LIST_TABLE_COLUMNS = [
  {
    title: 'Name',
    /* TODO: Readd after endpoint integration: sortParam: 'display_name', */
  },
  {
    title: 'Status',
  },
  {
    title: 'Type',
  },
  {
    title: 'Version',
  },
  {
    title: 'CVEs severity',
  },
  {
    title: 'Provider',
    /* TODO: Readd after endpoint integration: sortParam: 'provider', */
  },
  {
    title: 'Last seen',
    sortParam: 'last_seen',
  },
];

export const CVE_DETAIL_TABLE_COLUMNS = [
  {
    title: 'Name',
    /* TODO: Readd after endpoint integration: sortParam: 'display_name', */
  },
  {
    title: 'Status',
  },
  {
    title: 'Type',
  },
  {
    title: 'Version',
  },
  {
    title: 'Provider',
    /* TODO: Readd after endpoint integration: sortParam: 'provider', */
  },
  {
    title: 'Last seen',
    sortParam: 'last_seen',
  },
];

export const CLUSTER_DETAIL_TABLE_COLUMNS = [
  {
    title: 'CVE ID',
    sortParam: 'synopsis',
  },
  {
    title: 'Publish date',
    sortParam: 'publish_date',
  },
  {
    title: 'Severity',
    sortParam: 'severity',
  },
  {
    title: 'CVSS base score',
    sortParam: 'cvss_score',
  },
  {
    title: 'Images exposed',
    sortParam: 'images_exposed',
  },
];

/* TABLE ROW MAPPERS */

const createCveDescription = (row) => (
  <Fragment>
    <TextContent>
      <Text component={TextVariants.h6} style={{ fontSize: 14 }}>
        CVE description
      </Text>
    </TextContent>
    {row.description}
    <Link
      to={'/cves/' + row.synopsis}
      className="pf-u-mt-md pf-u-display-block"
    >
      View more information about this CVE
    </Link>
  </Fragment>
);

export const CVE_LIST_TABLE_MAPPER = (row) => ({
  key: row.synopsis,
  cells: [
    <Link to={'/cves/' + row.synopsis} key={row.synopsis}>
      {row.synopsis}
    </Link>,
    processDate(row.publish_date),
    <Shield hasLabel impact={row.severity} key={row.synopsis} />,
    parseCvssScore(row.cvss2_score, row.cvss3_score, true),
    <Link to={'/cves/' + row.synopsis} key={row.synopsis}>
      {row.clusters_exposed}
    </Link>,
    row.images_exposed,
  ],
  expandableContent: createCveDescription(row),
});

export const CLUSTER_LIST_TABLE_MAPPER = (row) => ({
  key: row.id,
  cells: [
    <Link to={'/clusters/' + row.id} key={row.id}>
      {row.display_name}
    </Link>,
    row.status_text,
    row.type,
    row.version,
    <ShieldSet
      key={row.id}
      count={{ ...row.cves_severity }}
      linkTo={`/clusters/${row.id}`}
    />,
    row.provider,
    <DateFormat key={row.id} date={row.last_seen} type="relative" />,
  ],
});

export const CVE_DETAIL_TABLE_MAPPER = (row) => ({
  key: row.id,
  cells: [
    <Link to={'/clusters/' + row.id} key={row.id}>
      {row.display_name}
    </Link>,
    row.status_text,
    row.type,
    row.version,
    row.provider,
    <DateFormat key={row.id} date={row.last_seen} type="relative" />,
  ],
});

export const CLUSTER_DETAIL_TABLE_MAPPER = (row) => ({
  key: row.synopsis,
  cells: [
    <Link to={'/cves/' + row.synopsis} key={row.synopsis}>
      {row.synopsis}
    </Link>,
    processDate(row.publish_date),
    <Shield hasLabel impact={row.severity} key={row.synopsis} />,
    parseCvssScore(row.cvss2_score, row.cvss3_score, true),
    row.images_exposed,
  ],
  expandableContent: createCveDescription(row),
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
  'cve_severity',
];

export const CVE_DETAIL_ALLOWED_PARAMS = [...GENERIC_ALLOWED_PARAMS, 'search'];

export const CLUSTER_DETAIL_ALLOWED_PARAMS = [
  ...GENERIC_ALLOWED_PARAMS,
  'search',
  'published',
  'severity',
  'cvss_score',
  'images_exposed',
];
