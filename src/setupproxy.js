const proxy = require("http-proxy-middleware");

// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://15.164.5.72:8081",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/v1", {
      target: "http://192.168.0.179:8099",
      changeOrigin: true,
    })
  );
};
