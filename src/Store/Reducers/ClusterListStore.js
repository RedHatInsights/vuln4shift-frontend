import { deepFreeze } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

const initialState = deepFreeze({
  limit: 20,
  offset: 0,
  total_items: 0,
  clusters: [],
  isLoading: true,
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
        ...action.payload.data.meta,
        isLoading: false,
      };
    }
  }

  return state;
};

export default ClusterListStore;
