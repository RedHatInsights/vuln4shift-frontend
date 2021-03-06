import React from 'react';
import propTypes from 'prop-types';
import { InvalidObject } from '@redhat-cloud-services/frontend-components/InvalidObject';
import { Unavailable } from '@redhat-cloud-services/frontend-components/Unavailable';
import { ErrorState } from '@redhat-cloud-services/frontend-components/ErrorState';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';

const ErrorHandler = ({ code }) => {
  switch (parseInt(code)) {
    case 403:
      return <NotAuthorized />;

    case 404:
      return <InvalidObject />;

    case 500:
    case 502:
    case 503:
      return <Unavailable />;

    default:
      return <ErrorState />;
  }
};

ErrorHandler.propTypes = {
  code: propTypes.oneOf([propTypes.number, propTypes.string]),
};

export default ErrorHandler;
