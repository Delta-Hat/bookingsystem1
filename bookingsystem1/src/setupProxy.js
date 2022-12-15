const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/appointments",
    "/api/guests",
    "/api/services",
    "/api/staffs"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7270',
        secure: false
    });

    app.use(appProxy);
};
