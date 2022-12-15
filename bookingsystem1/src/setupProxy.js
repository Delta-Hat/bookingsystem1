const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/Appointments",
    "/api/Guests",
    "/api/Services",
    "/api/Staffs"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7270',
        secure: false
    });

    app.use(appProxy);
};
