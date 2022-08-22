import {
  CLUSTER_LIST_DEFAULT_FILTERS,
  DEFAULT_LIMIT,
} from '../../Helpers/constants';
import { deepFreeze } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

export const initialState = deepFreeze({
  clusters: [],
  isLoading: true,
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
      };
    }

    case `${ActionTypes.FETCH_CLUSTER_LIST_TABLE}_FULFILLED`: {
      return {
        ...state,
        clusters: action.payload.data.data,
        meta: {
          ...state.meta,
          total_items: action.payload.data.meta.total_items,
        },
        isLoading: false,
      };
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
          ...action.payload,
        },
      };
    }
  }

  return state;
};

export default ClusterListStore;
