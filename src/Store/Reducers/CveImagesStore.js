import {
  CVE_IMAGES_DEFAULT_FILTERS,
  CVE_IMAGES_TABLE_COLUMNS,
  DEFAULT_LIMIT,
} from '../../Helpers/constants';
import { deepFreeze, isTimestampValid } from '../../Helpers/miscHelper';
import * as ActionTypes from '../ActionTypes';

export const initialState = deepFreeze({
  images: [],
  isTableLoading: true,
  timestamp: new Date(),
  columns: CVE_IMAGES_TABLE_COLUMNS,
  meta: {
    limit: DEFAULT_LIMIT,
    offset: 0,
    total_items: 0,
    sort: '-name',
    ...CVE_IMAGES_DEFAULT_FILTERS,
  },
});

const CveImagesStore = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_CVE_IMAGES_TABLE}_PENDING`: {
      return {
        ...state,
        isTableLoading: true,
        error: undefined,
        timestamp: action.meta.timestamp,
      };
    }

    case `${ActionTypes.FETCH_CVE_IMAGES_TABLE}_FULFILLED`: {
      if (isTimestampValid(state.timestamp, action.meta.timestamp)) {
        const { data, meta } = action.payload.data;

        return {
          ...state,
          images: data,
          meta: {
            ...state.meta,
            total_items: meta.total_items,
            dynamic_registry_options: meta.image_registries_all,
          },
          isTableLoading: false,
        };
      } else {
        return state;
      }
    }

    case `${ActionTypes.FETCH_CVE_IMAGES_TABLE}_REJECTED`: {
      return {
        ...state,
        isTableLoading: false,
        error: {
          ...action.payload,
        },
      };
    }

    case `${ActionTypes.CHANGE_CVE_IMAGES_TABLE_PARAMS}`: {
      return {
        ...state,
        meta: {
          total_items: state.meta.total_items,
          sort: state.meta.sort,
          limit: state.meta.limit,
          dynamic_registry_options: state.meta.dynamic_registry_options,
          ...action.payload,
        },
      };
    }

    case `${ActionTypes.CHANGE_CVE_IMAGES_TABLE_COLUMNS}`: {
      return {
        ...state,
        columns: action.payload,
      };
    }
  }

  return state;
};

export default CveImagesStore;
