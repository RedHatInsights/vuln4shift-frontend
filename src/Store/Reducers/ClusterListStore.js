import * as ActionTypes from '../ActionTypes';

const initialState = {
  limit: 20,
  offset: 0,
  total_items: 0,
  clusters: [],
};

const ClusterListStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CLUSTER_LIST_TABLE: {
      return {
        ...state,
        clusters: action.payload.data,
        ...action.payload.meta,
      };
    }
  }

  return state;
};

export default ClusterListStore;
