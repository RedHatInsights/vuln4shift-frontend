import * as ActionTypes from '../ActionTypes';

const inititalState = {
  limit: 20,
  offset: 0,
  data: [],
};

const CveListStore = (state = inititalState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CVE_LIST_TABLE: {
      return { ...state, cves: action.payload.data, ...action.payload.meta };
    }
  }

  return state;
};

export default CveListStore;
