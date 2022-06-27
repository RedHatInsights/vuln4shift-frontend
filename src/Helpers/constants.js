import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { processDate } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import parseCvssScore from '@redhat-cloud-services/frontend-components-utilities/parseCvssScore';
import { Shield } from '@redhat-cloud-services/frontend-components/Shield';
import ShieldSet from '../Components/PresentationalComponents/ShieldSet';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';

export const HEADER_ALERT_DISMISSED_KEY = 'vuln4shift:header-alert-dismissed';

export const SEVERITY_OPTIONS = {
  critical: {
    label: 'Critical',
    iconColor: 'var(--pf-global--danger-color--100)',
    textColor: 'var(--pf-global--danger-color--100)',
    isInShieldSet: true,
  },
  important: {
    label: 'Important',
    iconColor: 'var(--pf-global--palette--orange-300)',
    textColor: 'var(--pf-global--palette--orange-400)',
    isInShieldSet: true,
  },
  moderate: {
    label: 'Moderate',
    iconColor: 'var(--pf-global--warning-color--100)',
    textColor: 'var(--pf-global--warning-color--200)',
    isInShieldSet: true,
  },
  low: {
    label: 'Low',
    iconColor: 'var(--pf-global--Color--200)',
    textColor: 'var(--pf-global--default-color--300)',
    isInShieldSet: true,
  },
  unknown: {
    label: 'Unknown',
  },
};

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
    /* TODO: Readd after BE implementation: sortParam: 'clusters_exposed', */
  },
  {
    title: 'Images exposed',
    /* TODO: Readd after BE implementation: sortParam: 'images_exposed', */
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
];

export const CLUSTER_DETAIL_TABLE_COLUMNS = [
  {
    title: 'CVE ID',
    /* TODO: Readd after endpoint integration: sortParam: 'synopsis', */
  },
  {
    title: 'Publish date',
    /* TODO: Readd after endpoint integration: sortParam: 'publish_date', */
  },
  {
    title: 'Severity',
    /* TODO: Readd after endpoint integration: sortParam: 'severity', */
  },
  {
    title: 'CVSS base score',
    /* TODO: Readd after endpoint integration: sortParam: 'cvss_score', */
  },
  {
    title: 'Images exposed',
    /* TODO: Readd after endpoint integration: sortParam: 'images_exposed', */
  },
];

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

export const CVE_LIST_ALLOWED_PARAMS = ['limit', 'offset', 'sort'];
export const CLUSTER_LIST_ALLOWED_PARAMS = ['limit', 'offset', 'sort'];
export const CVE_DETAIL_ALLOWED_PARAMS = ['limit', 'offset', 'sort'];
export const CLUSTER_DETAIL_ALLOWED_PARAMS = ['limit', 'offset', 'sort'];
