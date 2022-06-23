import * as ActionTypes from '../ActionTypes';

const initialState = Object.freeze({
  limit: 20,
  offset: 0,
  total_items: 0,
  cves: [],
  isLoading: true,
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
        ...action.payload.data.meta,
        isLoading: false,
      };
    }
  }

  return state;
};

export default CveListStore;
