import * as ActionTypes from '../ActionTypes';

const inititalState = {
  limit: 20,
  offset: 0,
  data: [],
};

const ClusterDetailStore = (state = inititalState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CLUSTER_DETAIL_TABLE: {
      return { ...state, cves: action.payload.data, ...action.payload.meta };
    }
  }

  return state;
};

export default ClusterDetailStore;
