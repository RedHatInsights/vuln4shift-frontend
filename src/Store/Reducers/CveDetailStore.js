import {
  CVE_DETAIL_DEFAULT_FILTERS,
  DEFAULT_LIMIT,
} from '../../Helpers/constants';
import { deepFreeze, isTimestampValid } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

export const initialState = deepFreeze({
  cve: {},
  clusters: [],
  isDetailLoading: true,
  isTableLoading: true,
  timestamp: new Date(),
  meta: {
    limit: DEFAULT_LIMIT,
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
        error: undefined,
        timestamp: action.meta.timestamp,
      };
    }

    case `${ActionTypes.FETCH_CVE_DETAIL_TABLE}_FULFILLED`: {
      if (isTimestampValid(state.timestamp, action.meta.timestamp)) {
        return {
          ...state,
          clusters: action.payload.data.data,
          meta: {
            ...state.meta,
            total_items: action.payload.data.meta.total_items,
          },
          isTableLoading: false,
        };
      } else {
        return state;
      }
    }

    case `${ActionTypes.FETCH_CVE_DETAIL_TABLE}_REJECTED`: {
      return {
        ...state,
        isTableLoading: false,
        error: {
          ...action.payload,
        },
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
        error: undefined,
      };
    }

    case `${ActionTypes.FETCH_CVE_DETAILS}_FULFILLED`: {
      return {
        ...state,
        cve: action.payload.data.data,
        isDetailLoading: false,
      };
    }

    case `${ActionTypes.FETCH_CVE_DETAILS}_REJECTED`: {
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

export default CveDetailStore;
