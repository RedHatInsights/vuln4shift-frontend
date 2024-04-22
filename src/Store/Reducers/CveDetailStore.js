import { deepFreeze } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

export const initialState = deepFreeze({
  cve: {},
  isDetailLoading: true,
});

const CveDetailStore = (state = initialState, action) => {
  switch (action.type) {
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
