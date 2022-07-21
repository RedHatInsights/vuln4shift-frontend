import { deepFreeze } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

const initialState = deepFreeze({
  clusters: [],
  isLoading: true,
  meta: {
    limit: 20,
    offset: 0,
    total_items: 0,
    sort: '-last_seen',
  },
});

const ClusterListStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CLUSTER_LIST_TABLE}_PENDING`: {
      return {
        ...state,
        isLoading: true,
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

    case `${ActionTypes.CHANGE_CLUSTER_LIST_TABLE_PARAMS}`: {
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      };
    }
  }

  return state;
};

export default ClusterListStore;
