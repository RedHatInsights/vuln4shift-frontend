import React from 'react';
import PropTypes from 'prop-types';
import { SEVERITY_OPTIONS } from '../../Helpers/constants';
import { SecurityIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';
import { Icon, Tooltip } from '@patternfly/react-core';

const ShieldSet = ({ count, linkTo }) => {
  const DISABLED_COLOR =
    'var(--pf-t--global--background--color--disabled--default)';

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
                <Icon>
                  <SecurityIcon style={{ color: DISABLED_COLOR }} />
                </Icon>
                <span>0</span>
              </a>
            ) : (
              <Link
                key={severityOption.value}
                to={`${linkTo}?severity=${severityOption.value}`}
                className="nowrap"
              >
                <Icon>
                  <SecurityIcon style={{ color: severityOption.iconColor }} />
                </Icon>
                <span className="shield-set-severity-value">
                  {count[severityOption.value]}
                </span>
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
