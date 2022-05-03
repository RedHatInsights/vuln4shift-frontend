import * as ActionTypes from '../Store/ActionTypes';
import { fetchCves } from '../Temp/mockAPI';

export const fetchCveListTable = (params) => ({
  type: ActionTypes.FETCH_CVE_LIST_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => fetchCves(params),
});
