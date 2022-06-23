import * as ActionTypes from '../ActionTypes';

const initialState = Object.freeze({
  limit: 20,
  offset: 0,
  total_items: 0,
  clusters: [],
  cve: {},
  isTableLoading: true,
  isDetailLoading: true,
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
        ...action.payload.data.meta,
        isTableLoading: false,
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
        ...action.payload.data.meta,
        isDetailLoading: false,
      };
    }
  }

  return state;
};

export default CveDetailStore;
