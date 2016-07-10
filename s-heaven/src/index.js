import path from 'path';
import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-better-body';
import koaStatic from 'koa-static';
import koaEjs from 'koa-ejs';
import _router from './router';
import config from '../config.json';

const app = koa();
const router = _router(koaRouter());

 app.use(koaStatic(path.join(__dirname, '../public')));
    koaEjs(app, {
        root: path.join(__dirname, '../', 'public/pages'),
        layout: 'template',
        viewExt: 'ejs',
        cache: true,
        debug: true
    });

app
    .use(koaBody({
        extendTypes: {
            json: ['application/x-javascript'],
            multipart: ['multipart/mixed']
        }
    }))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.http.port);