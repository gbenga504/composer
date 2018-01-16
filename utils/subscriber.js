import * as actions from "../actions";
import requestHandler from "../requestHandler";
import invariant from "invariant";

function Subscriber(store, client) {
  this._store = store;
  this._client = client;
  this._requestId = this._store.getState().requestHeader.id;
}

Subscriber.prototype.makeNetworkRequest = function(
  method,
  config,
  _progressCallback,
  _reqObj
) {
  let _promise = new Promise((resolve, reject) => {
    return requestHandler(method, config, _progressCallback, _reqObj)
      .then(data => {
        if (this._client.isUseAfterCallbackSupplied)
          this._store.dispatch(actions.sendResponseForMiddleware(data));
        resolve(data);
      })
      .catch(error => {
        if (this._client.isUseAfterCallbackSupplied)
          this._store.dispatch(actions.sendResponseForMiddleware(error));
        reject(error);
      });
  });
  return _promise;
};

Subscriber.prototype.makeAsyncCall = function(
  method,
  config,
  requestProgressCallback
) {
  let _promise = new Promise((resolve, reject) => {
    let unsubscribe = this._store.subscribe(() => {
      let { getState } = this._store,
        { requestHeader: { options, id } } = getState();
      if (id !== this._requestId) {
        this._requestId = id;
        unsubscribe();
        let _cb = this.getProgressCallback(config, requestProgressCallback);
        this.makeNetworkRequest("GET", config, _cb, options)
          .then(data => resolve(data))
          .catch(error => reject(error));
      }
    });
  });

  if (this._client.isUseBeforeCallbackSupplied) {
    this._store.dispatch(actions.sendRequestHeaderCommand());
    return _promise;
  } else return this.makeNetworkRequest("GET", config);
};

Subscriber.prototype.getProgressCallback = function(
  config,
  requestProgressCallback
) {
  let _cb = undefined;

  if (!config.skipProgress && requestProgressCallback) {
    _cb = requestProgressCallback;
  } else if (!config.skipProgress && !requestProgressCallback) {
    invariant(
      requestProgressCallback,
      "A progress callback must be implemented if skipProgress of config is false"
    );
  }

  return _cb;
};

Subscriber.prototype.query = function(config, requestProgressCallback) {
  return this.makeAsyncCall("GET", config, requestProgressCallback);
};

Subscriber.prototype.mutate = function(
  method,
  config,
  requestProgressCallback
) {
  return this.makeAsyncCall(method, config, requestProgressCallback);
};

export default Subscriber;
