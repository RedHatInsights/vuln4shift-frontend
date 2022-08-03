import { CVE_DETAIL_DEFAULT_FILTERS } from '../../Helpers/constants';
import { deepFreeze } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

const initialState = deepFreeze({
  cve: {},
  clusters: [],
  isDetailLoading: true,
  isTableLoading: true,
  meta: {
    limit: 20,
    offset: 0,
    total_items: 0,
    sort: '-last_seen',
    ...CVE_DETAIL_DEFAULT_FILTERS,
  },
});

const CveDetailStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CVE_DETAIL_TABLE}_PENDING`: {
      return {
        ...state,
        isTableLoading: true,
      };
    }

    case `${ActionTypes.FETCH_CVE_DETAIL_TABLE}_FULFILLED`: {
      return {
        ...state,
        clusters: action.payload.data.data,
        meta: {
          ...state.meta,
          total_items: action.payload.data.meta.total_items,
        },
        isTableLoading: false,
      };
    }

    case `${ActionTypes.CHANGE_CVE_DETAIL_TABLE_PARAMS}`: {
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

    case `${ActionTypes.FETCH_CVE_DETAILS}_PENDING`: {
      return {
        ...state,
        isDetailLoading: true,
      };
    }

    case `${ActionTypes.FETCH_CVE_DETAILS}_FULFILLED`: {
      return {
        ...state,
        cve: action.payload.data.data,
        isDetailLoading: false,
      };
    }
  }

  return state;
};

export default CveDetailStore;
