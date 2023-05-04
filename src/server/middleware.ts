import Koa from 'koa';
import send from 'koa-send';
import { promises, constants } from 'fs';
import { join, posix } from 'path';
import { tmpdir } from 'os';
import { renderFile } from 'ejs';

const assetsDir = join(__dirname, '..', '..');
let tmpDir: string | null = null;

async function serveIndex(ctx: Koa.ParameterizedContext, basePath: string): Promise<void> {
    if (!tmpDir) {
        tmpDir = await promises.mkdtemp(join(tmpdir(), 'redis-smq-monitor-'));
    }
    const indexHTML = join(tmpDir, 'index.html');
    try {
        await promises.access(indexHTML, constants.F_OK);
    } catch {
        const html = await renderFile(join(assetsDir, 'assets', 'index.html'), { basePath });
        await promises.writeFile(indexHTML, html);
    }
    await send(ctx, 'index.html', { root: tmpDir });
}

export const Middleware = (ignorePaths: string[] = [], basePath = '/'): Koa.Middleware => async (ctx, next) => {
    // remove trailing "/" and transform relative paths to absolute paths
    const normalizedBasePath = basePath === '/' ? basePath : posix.resolve('/', basePath);
    if (
        !ignorePaths.length ||
        ignorePaths.find((i) => {
            const item = posix.resolve('/', i);
            return ctx.path.indexOf(item) === 0;
        }) === undefined
    ) {
        await ('/' === ctx.path || ctx.path.indexOf('/assets/') !== 0
            ? serveIndex(ctx, normalizedBasePath)
            : send(ctx, ctx.path, { root: assetsDir }));
    } else await next();
};
