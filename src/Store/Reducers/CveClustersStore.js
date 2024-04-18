import {
  CVE_CLUSTERS_DEFAULT_FILTERS,
  DEFAULT_LIMIT,
} from '../../Helpers/constants';
import { deepFreeze, isTimestampValid } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

export const initialState = deepFreeze({
  clusters: [],
  isTableLoading: true,
  timestamp: new Date(),
  meta: {
    limit: DEFAULT_LIMIT,
    offset: 0,
    total_items: 0,
    sort: '-last_seen',
    ...CVE_CLUSTERS_DEFAULT_FILTERS,
  },
});

const CveClustersStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CVE_CLUSTERS_TABLE}_PENDING`: {
      return {
        ...state,
        isTableLoading: true,
        error: undefined,
        timestamp: action.meta.timestamp,
      };
    }

    case `${ActionTypes.FETCH_CVE_CLUSTERS_TABLE}_FULFILLED`: {
      if (isTimestampValid(state.timestamp, action.meta.timestamp)) {
        const { data, meta } = action.payload.data;

        return {
          ...state,
          clusters: data,
          meta: {
            ...state.meta,
            total_items: meta.total_items,
            dynamic_provider_options: meta.cluster_providers_all,
            dynamic_status_options: meta.cluster_statuses_all,
            dynamic_version_options: meta.cluster_versions_all,
          },
          isTableLoading: false,
        };
      } else {
        return state;
      }
    }

    case `${ActionTypes.FETCH_CVE_CLUSTERS_TABLE}_REJECTED`: {
      return {
        ...state,
        isTableLoading: false,
        error: {
          ...action.payload,
        },
      };
    }

    case `${ActionTypes.CHANGE_CVE_CLUSTERS_TABLE_PARAMS}`: {
      return {
        ...state,
        meta: {
          total_items: state.meta.total_items,
          sort: state.meta.sort,
          limit: state.meta.limit,
          dynamic_provider_options: state.meta.dynamic_provider_options,
          dynamic_status_options: state.meta.dynamic_status_options,
          dynamic_version_options: state.meta.dynamic_version_options,
          ...action.payload,
        },
      };
    }
  }

  return state;
};

export default CveClustersStore;
