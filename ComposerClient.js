import { version } from "./version";
import createComposerThunk from "./middlewares/composerThunk";
import * as composerReducers from "./reducers";

export default function ComposerClient({ endpoint } = { endpoint: undefined }) {
  this.version = version;
  this.endpoint = endpoint;
}

ComposerClient.prototype.getVersion = function() {
  return this.version;
};

ComposerClient.prototype.reducer = function() {
  return Object.assign({}, composerReducers);
};

ComposerClient.prototype.middleware = function({
  useBeforeRequest,
  useAfterResponse
}) {
  return createComposerThunk({ useBeforeRequest, useAfterResponse });
};
