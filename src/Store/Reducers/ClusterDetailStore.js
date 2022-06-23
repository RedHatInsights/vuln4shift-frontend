import * as ActionTypes from '../ActionTypes';

const initialState = Object.freeze({
  limit: 20,
  offset: 0,
  total_items: 0,
  cves: [],
  cluster: {},
  isTableLoading: true,
  isDetailLoading: true,
});

const ClusterDetailStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CLUSTER_DETAIL_TABLE}_PENDING`: {
      return {
        ...state,
        isTableLoading: true,
      };
    }

    case `${ActionTypes.FETCH_CLUSTER_DETAIL_TABLE}_FULFILLED`: {
      return {
        ...state,
        cves: action.payload.data.data,
        ...action.payload.data.meta,
        isTableLoading: false,
      };
    }

    case `${ActionTypes.FETCH_CLUSTER_DETAILS}_PENDING`: {
      return {
        ...state,
        isDetailLoading: true,
      };
    }

    case `${ActionTypes.FETCH_CLUSTER_DETAILS}_FULFILLED`: {
      return {
        ...state,
        cluster: action.payload.data.data,
        ...action.payload.data.meta,
        isDetailLoading: false,
      };
    }
  }

  return state;
};

export default ClusterDetailStore;
