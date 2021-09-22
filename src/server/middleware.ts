import Koa from 'koa';
import send from 'koa-send';

const assetsDir = `${__dirname}/../../`;

export const Middleware = (ignorePaths: string[] = []): Koa.Middleware => async (ctx, next) => {
    if (ignorePaths.map((i) => ctx.path.indexOf(i)).find((i) => i === 0) === undefined) {
        const path = '/' === ctx.path || ctx.path.indexOf('/assets/') !== 0 ? `/assets/index.html` : ctx.path;
        await send(ctx, path, { root: assetsDir });
    } else await next();
};
