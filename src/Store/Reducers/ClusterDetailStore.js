import { deepFreeze } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

export const initialState = deepFreeze({
  cluster: {},
  isDetailLoading: true,
});

const ClusterDetailStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CLUSTER_DETAILS}_PENDING`: {
      return {
        ...state,
        isDetailLoading: true,
        error: undefined,
      };
    }

    case `${ActionTypes.FETCH_CLUSTER_DETAILS}_FULFILLED`: {
      return {
        ...state,
        cluster: action.payload.data.data,
        isDetailLoading: false,
      };
    }

    case `${ActionTypes.FETCH_CLUSTER_DETAILS}_REJECTED`: {
      return {
        ...state,
        isDetailLoading: false,
        error: {
          ...action.payload,
        },
      };
    }
  }

  return state;
};

export default ClusterDetailStore;
