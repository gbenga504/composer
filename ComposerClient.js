import { version } from "./version";=

export default function ComposerClient({ endpoint } = { endpoint: undefined }) {
  this.version = version;
  this.endpoint = endpoint;
}

ComposerClient.prototype.getVersion = function() {};

ComposerClient.prototype.reducer = function() {};

ComposerClient.prototype.middleware = function() {};
