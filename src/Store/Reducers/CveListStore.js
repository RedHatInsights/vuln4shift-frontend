import * as ActionTypes from '../ActionTypes';

const initialState = Object.freeze({
  cves: [],
  isLoading: true,
  meta: {
    limit: 20,
    offset: 0,
    total_items: 0,
    sort: '-publish_date',
  },
});

const CveListStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CVE_LIST_TABLE}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case `${ActionTypes.FETCH_CVE_LIST_TABLE}_FULFILLED`: {
      return {
        ...state,
        cves: action.payload.data.data,
        meta: action.payload.data.meta,
        isLoading: false,
      };
    }

    case `${ActionTypes.CHANGE_CVE_LIST_TABLE_PARAMS}`: {
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      };
    }
  }

  return state;
};

export default CveListStore;
