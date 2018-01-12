import * as types from "../types";

export const dataLoadProgress = (state = { progress: 0 }, action) => {
  switch (action.type) {
    case types.SET_PAGE_LOAD_PROGRESS:
      return { ...state, progress: action.progress };
      break;
    default:
      return state;
  }
};

export const routeDatas = (state = {}, action) => {
  switch (action.type) {
    case types.SET_ROUTE_DATAS:
      let previousRouteData = state[action.routeName] || {};
      return {
        ...state,
        [`${action.routeName}`]: action.routeDatas
      };
      break;
    default:
      return state;
  }
};

export const queryDatas = (state = {}, action) => {
  switch (action.type) {
    case types.SET_QUERY_DATAS:
      return { ...state, [`${action.queryName}`]: action.queryDatas };
      break;
    default:
      return state;
  }
};