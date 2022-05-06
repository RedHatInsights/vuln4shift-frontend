import * as ActionTypes from '../ActionTypes';

const initialState = {
  limit: 20,
  offset: 0,
  total_items: 0,
  cves: [],
};

const CveListStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CVE_LIST_TABLE: {
      return { ...state, cves: action.payload.data, ...action.payload.meta };
    }
  }

  return state;
};

export default CveListStore;
