import * as types from "../types";

export const setProgressState = progress => ({
  type: types.SET_PAGE_LOAD_PROGRESS,
  progress
});

export const computeProgressState = (
  startProgress,
  endProgress
) => dispatch => {
  let start = window.performance.now(),
    duration = 1000;
  let animation = requestAnimationFrame(function animate(time) {
    if (!animation) {
      return;
    }
    let movement = (time - start) / duration;
    if (movement >= endProgress / 100) {
      movement = endProgress / 100;
      dispatch(setProgressState(movement * 100));
      animation = null;
    } else {
      dispatch(
        setProgressState(
          movement < startProgress / 100 ? startProgress : movement * 100
        )
      );
      requestAnimationFrame(animate);
    }
  });
};

export const setRouteDatas = (routeName, routeDatas) => ({
  type: types.SET_ROUTE_DATAS,
  routeName,
  routeDatas
});

export const setQueryDatas = (queryName, queryDatas) => ({
  type: types.SET_QUERY_DATAS,
  queryName,
  queryDatas
});

export const sendRequestHeaderCommand = () => ({
  type: types.COMPOSER_SEND_REQUEST_HEADER_CMD,
  _reqObj: { options: {} }
});

export const sendResponseForMiddleware = response => ({
  type: types.COMPOSER_SEND_RESPONSE_TO_MIDDLEWARE,
  response
});
