import * as ActionTypes from '../ActionTypes';

const initialState = {
  limit: 20,
  offset: 0,
  total_items: 0,
  clusters: [],
  cve: {},
};

const CveDetailStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CVE_DETAIL_TABLE: {
      return {
        ...state,
        clusters: action.payload.data,
        ...action.payload.meta,
      };
    }
    case ActionTypes.FETCH_CVE_DETAILS: {
      return { ...state, cve: action.payload.data, ...action.payload.meta };
    }
  }

  return state;
};

export default CveDetailStore;
