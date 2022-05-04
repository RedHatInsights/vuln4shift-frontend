import React from 'react';
import { Link } from 'react-router-dom';
import { processDate } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import parseCvssScore from '@redhat-cloud-services/frontend-components-utilities/parseCvssScore';
import { Shield } from '@redhat-cloud-services/frontend-components/Shield';

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
    sortParam: 'clusters_exposed',
  },
  {
    title: 'Images exposed',
    sortParam: 'images_exposed',
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
  expandableContent: row.description,
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
  expandableContent: row.description,
});
