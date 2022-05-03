import { register } from './index';
import * as ActionTypes from '../Store/ActionTypes';
import CveListStore from './CveListStore';
import { fetchCves } from '../Temp/mockAPI';

register({ CveListStore });

export const fetchCveListTable = (params) => ({
  type: ActionTypes.FETCH_CVE_LIST_TABLE,
  meta: {
    timestamp: new Date(),
  },
  payload: () => fetchCves(params),
});
