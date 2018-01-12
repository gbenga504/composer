import { version } from "./version";
import createComposerThunk from "./middlewares/composerThunk";

export default function ComposerClient({ endpoint } = { endpoint: undefined }) {
  this.version = version;
  this.endpoint = endpoint;
}

ComposerClient.prototype.getVersion = function() {};

ComposerClient.prototype.reducer = function() {};

ComposerClient.prototype.middleware = function({
  useBeforeRequest,
  useAfterResponse
}) {
  return createComposerThunk({ useBeforeRequest, useAfterResponse });
};
