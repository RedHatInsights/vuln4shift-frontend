import {
  CLUSTER_LIST_DEFAULT_FILTERS,
  CLUSTER_LIST_TABLE_COLUMNS,
  DEFAULT_LIMIT,
} from '../../Helpers/constants';
import { deepFreeze, isTimestampValid } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

export const initialState = deepFreeze({
  clusters: [],
  isLoading: true,
  timestamp: new Date(),
  columns: CLUSTER_LIST_TABLE_COLUMNS,
  meta: {
    limit: DEFAULT_LIMIT,
    offset: 0,
    total_items: 0,
    sort: '-last_seen',
    ...CLUSTER_LIST_DEFAULT_FILTERS,
  },
});

const ClusterListStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CLUSTER_LIST_TABLE}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        timestamp: action.meta.timestamp,
      };
    }

    case `${ActionTypes.FETCH_CLUSTER_LIST_TABLE}_FULFILLED`: {
      const { data, meta } = action.payload.data;

      if (isTimestampValid(state.timestamp, action.meta.timestamp)) {
        return {
          ...state,
          clusters: data,
          meta: {
            ...state.meta,
            total_items: meta.total_items,
            dynamic_provider_options: meta.cluster_providers_all,
            dynamic_status_options: meta.cluster_statuses_all,
            dynamic_version_options: meta.cluster_versions_all,
          },
          isLoading: false,
        };
      } else {
        return state;
      }
    }

    case `${ActionTypes.FETCH_CLUSTER_LIST_TABLE}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        error: {
          ...action.payload,
        },
      };
    }

    case `${ActionTypes.CHANGE_CLUSTER_LIST_TABLE_PARAMS}`: {
      return {
        ...state,
        meta: {
          total_items: state.meta.total_items,
          sort: state.meta.sort,
          limit: state.meta.limit,
          dynamic_provider_options: state.meta.dynamic_provider_options,
          dynamic_status_options: state.meta.dynamic_status_options,
          dynamic_version_options: state.meta.dynamic_version_options,
          ...action.payload,
        },
      };
    }

    case `${ActionTypes.CHANGE_CLUSTER_LIST_TABLE_COLUMNS}`: {
      return {
        ...state,
        columns: action.payload,
      };
    }
  }

  return state;
};

export default ClusterListStore;
