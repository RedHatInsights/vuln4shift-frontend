import * as ActionTypes from '../ActionTypes';

const initialState = Object.freeze({
  limit: 20,
  offset: 0,
  total_items: 0,
  cves: [],
  cluster: {},
});

const ClusterDetailStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CLUSTER_DETAIL_TABLE: {
      return { ...state, cves: action.payload.data, ...action.payload.meta };
    }
    case ActionTypes.FETCH_CLUSTER_DETAILS: {
      return { ...state, cluster: action.payload.data, ...action.payload.meta };
    }
  }

  return state;
};

export default ClusterDetailStore;
