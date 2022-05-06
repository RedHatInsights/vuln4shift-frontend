import React from 'react';
import PropTypes from 'prop-types';
import { SEVERITY_OPTIONS } from '../../Helpers/constants';
import { SecurityIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';

// TODO: Setup link to navigate to Cluster detail page with severity filter applied
const ShieldSet = ({ count, linkTo }) => {
  const DISABLED_COLOR = 'var(--pf-global--disabled-color--200)';

  return (
    <div className="shield-set">
      {Object.entries(SEVERITY_OPTIONS).map(
        ([severityValue, severityProps]) =>
          severityProps.isInShieldSet &&
          (count[severityValue] === 0 ? (
            <Link key={severityValue} className="disabled-shield">
              <SecurityIcon style={{ color: DISABLED_COLOR }} />
              <span>0</span>
            </Link>
          ) : (
            <Link key={severityValue} to={linkTo}>
              <SecurityIcon style={{ color: severityProps.iconColor }} />
              <span>{count[severityValue]}</span>
            </Link>
          ))
      )}
    </div>
  );
};

ShieldSet.propTypes = {
  count: PropTypes.shape({
    critical: PropTypes.number,
    important: PropTypes.number,
    moderate: PropTypes.number,
    low: PropTypes.number,
  }).isRequired,
  linkTo: PropTypes.string,
};

export default ShieldSet;
