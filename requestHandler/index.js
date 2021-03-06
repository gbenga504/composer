import httpRequestStatusHandler from "./statusHandler";

export default (method, config, progressCallback = null) => {
  return new Promise((resolve, reject) => {
    let httpRequest = null,
      configuration = config || {};

    if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      httpRequest = new window.ActiveXObject("Microsoft.XMLHTTP");
    }

    httpRequest.onreadystatechange = function() {
      try {
        if (httpRequest.readyState === 4) {
          let { type } = httpRequestStatusHandler(httpRequest.status),
            result = JSON.parse(httpRequest.responseText);
          if (type === "ok") {
            resolve(result);
          } else {
            reject(result);
          }
        }
      } catch (err) {
        reject({ code: 0, message: "Error occured while parsing the data" });
      }
    };

    httpRequest.onprogress = function(oEvent) {
      if (oEvent.lengthComputable) {
        let computed = oEvent.loaded / oEvent.total;
        progressCallback && progressCallback(computed);
      }
    };

    httpRequest.onerror = function(err) {
      reject({
        code: 0,
        message: "An unknown error mostly network based occurred "
      });
    };

    httpRequest.timeout = configuration.timeout || 100000;

    let GET_URL =
      configuration.url +
      (/\?/.test(configuration.url) ? "&" : "?") +
      Date.now();

    httpRequest.open(
      method.toUpperCase(),
      method.toUpperCase() !== "GET" ? configuration.url : GET_URL,
      true
    );

    let formData = null;

    if (method.toUpperCase() !== "GET") {
      formData = new FormData(configuration.formRef || null);
    }

    httpRequest.send(method.toUpperCase() !== "GET" ? formData : null);
  });
};
