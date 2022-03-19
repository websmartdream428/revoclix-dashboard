const { createProxyMiddleware } = require("http-proxy-middleware");

export default function (app: any) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
}
