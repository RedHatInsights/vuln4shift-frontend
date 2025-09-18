import React, { ReactNode } from 'react';
import { InvalidObject } from '@redhat-cloud-services/frontend-components/InvalidObject';
import { Unavailable } from '@redhat-cloud-services/frontend-components/Unavailable';
import { ErrorState } from '@redhat-cloud-services/frontend-components/ErrorState';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';

interface ErrorHandlerProps {
  errorStatus?: number | string,
  children: ReactNode
}

const ErrorHandler = ({ errorStatus, children }: ErrorHandlerProps) => {
  if (!errorStatus) {
    return children;
  }

  const parsedCode = Number(errorStatus);

  switch (parsedCode) {
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

export default ErrorHandler;
