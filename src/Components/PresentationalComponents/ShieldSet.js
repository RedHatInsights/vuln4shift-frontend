import React from 'react';
import PropTypes from 'prop-types';
import { SEVERITY_OPTIONS } from '../../Helpers/constants';
import { SecurityIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';
import { Tooltip } from '@patternfly/react-core';

const ShieldSet = ({ count, linkTo }) => {
  const DISABLED_COLOR = 'var(--pf-v5-global--disabled-color--200)';

  return (
    <div className="shield-set">
      {SEVERITY_OPTIONS.map((severityOption) => (
        <Tooltip
          key={severityOption.value}
          content={`${severityOption.label} severity`}
        >
          {severityOption.hasIcon &&
            (count[severityOption.value] === 0 ? (
              <a className="disabled-shield nowrap">
                <SecurityIcon style={{ color: DISABLED_COLOR }} />
                <span>0</span>
              </a>
            ) : (
              <Link
                key={severityOption.value}
                to={`${linkTo}?severity=${severityOption.value}`}
                className="nowrap"
              >
                <SecurityIcon style={{ color: severityOption.iconColor }} />
                <span>{count[severityOption.value]}</span>
              </Link>
            ))}
        </Tooltip>
      ))}
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
