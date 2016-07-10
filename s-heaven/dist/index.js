'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBetterBody = require('koa-better-body');

var _koaBetterBody2 = _interopRequireDefault(_koaBetterBody);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaEjs = require('koa-ejs');

var _koaEjs2 = _interopRequireDefault(_koaEjs);

var _router2 = require('./router');

var _router3 = _interopRequireDefault(_router2);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _koa2.default)();
const router = (0, _router3.default)((0, _koaRouter2.default)());

app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../public')));
(0, _koaEjs2.default)(app, {
    root: _path2.default.join(__dirname, '../', 'public/pages'),
    layout: 'template',
    viewExt: 'ejs',
    cache: true,
    debug: true
});

app.use((0, _koaBetterBody2.default)({
    extendTypes: {
        json: ['application/x-javascript'],
        multipart: ['multipart/mixed']
    }
})).use(router.routes()).use(router.allowedMethods());

app.listen(_config2.default.http.port);