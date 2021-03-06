import { deepFreeze } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

const initialState = deepFreeze({
  cluster: {},
  cves: [],
  isDetailLoading: true,
  isTableLoading: true,
  meta: {
    limit: 20,
    offset: 0,
    total_items: 0,
    sort: '-publish_date',
  },
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
        meta: {
          ...state.meta,
          total_items: action.payload.data.meta.total_items,
        },
        isTableLoading: false,
      };
    }

    case `${ActionTypes.CHANGE_CLUSTER_DETAIL_TABLE_PARAMS}`: {
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
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
        isDetailLoading: false,
      };
    }
  }

  return state;
};

export default ClusterDetailStore;
