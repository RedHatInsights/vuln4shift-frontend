import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import promiseMiddleware from 'redux-promise-middleware';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import CveListStore from './CveListStore';

let registry;

export function init(...middleware) {
  registry = getRegistry({}, [
    promiseMiddleware,
    notificationsMiddleware({ errorDescriptionKey: ['detail', 'stack'] }),
    ...middleware,
  ]);

  registry.register({ notifications: notificationsReducer });

  registry.register({ CveListStore });

  return registry;
}
