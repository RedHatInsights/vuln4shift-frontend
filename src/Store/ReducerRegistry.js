import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import promiseMiddleware from 'redux-promise-middleware';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import CveListStore from './Reducers/CveListStore';
import ClusterListStore from './Reducers/ClusterListStore';
import CveDetailStore from './Reducers/CveDetailStore';
import ClusterDetailStore from './Reducers/ClusterDetailStore';

let registry;

const notificationsFilterMiddleware = () => (next) => (action) => {
  const matchRejected = (type) => type.match(new RegExp(`_REJECTED$`));

  if (matchRejected(action.type) && action.meta?.noNotificationOnError) {
    action.meta = { ...action.meta, noError: true };
  }

  next(action);
};

export function init(...middleware) {
  registry = getRegistry({}, [
    promiseMiddleware,
    notificationsFilterMiddleware,
    notificationsMiddleware({
      errorDescriptionKey: 'detail',
      // TODO: for some reason this does not work
      autoDismiss: false,
    }),
    ...middleware,
  ]);

  registry.register({ notifications: notificationsReducer });

  registry.register({ CveListStore });
  registry.register({ ClusterListStore });
  registry.register({ CveDetailStore });
  registry.register({ ClusterDetailStore });

  return registry;
}
