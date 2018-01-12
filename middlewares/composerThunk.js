import * as types from "../types";
import invariant from "invariant";

export default function createComposerThunk({
  useBeforeRequest,
  useAfterResponse
}) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") return action(dispatch, getState);

    switch (action.type) {
      case types.COMPOSER_MAKE_QUERY_REQUEST:
      case types.COMPOSER_MAKE_MUTATION_REQUEST:
        invariant(
          useBeforeRequest && typeof useBeforeRequest !== "function",
          "The useBeforeRequest helper must be a function which returns a new request object"
        );
        if (useBeforeRequest && typeof useBeforeRequest === "function") {
          let _reqObj = useBeforeRequest(action._reqObj);
          //return a thunk that uses the _reqObj to make an Async action and makes the appropriate request
          invariant(
            !_reqObj || typeof _reqObj !== "object" || _reqObj instanceof Array,
            "A request Object of type [Object] must be returned from the useBeforeRequest helper"
          );
        } else {
          //return a thunk that still uses the old _reqObj to make an Async action and makes the appropriate request
        }
        break;
      case types.COMPOSER_GET_QUERY_RESPONSE:
      case types.COMPOSER_GET_MUTATION_RESPONSE:
        invariant(
          useAfterResponse && typeof useAfterResponse !== "function",
          "The useAfterResponse helper must be a custom function which performs a task on the response"
        );
        //return a thunk that calls an appropriate using the dispatch
        break;
      default:
        return next(action);
    }
  };
}
