import {
  CVE_LIST_DEFAULT_FILTERS,
  DEFAULT_LIMIT,
} from '../../Helpers/constants';
import { deepFreeze, isTimestampValid } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

export const initialState = deepFreeze({
  cves: [],
  isLoading: true,
  timestamp: new Date(),
  meta: {
    limit: DEFAULT_LIMIT,
    offset: 0,
    total_items: 0,
    sort: '-publish_date',
    ...CVE_LIST_DEFAULT_FILTERS,
  },
});

const CveListStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CVE_LIST_TABLE}_PENDING`: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        timestamp: action.meta.timestamp,
      };
    }

    case `${ActionTypes.FETCH_CVE_LIST_TABLE}_FULFILLED`: {
      if (isTimestampValid(state.timestamp, action.meta.timestamp)) {
        return {
          ...state,
          cves: action.payload.data.data,
          meta: {
            ...state.meta,
            total_items: action.payload.data.meta.total_items,
          },
          isLoading: false,
        };
      } else {
        return state;
      }
    }

    case `${ActionTypes.FETCH_CVE_LIST_TABLE}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        error: {
          ...action.payload,
        },
      };
    }

    case `${ActionTypes.CHANGE_CVE_LIST_TABLE_PARAMS}`: {
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
  }

  return state;
};

export default CveListStore;
