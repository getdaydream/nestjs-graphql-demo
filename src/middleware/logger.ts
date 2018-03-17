/**
 * log every request
 */
// tslint:disable-next-line:no-implicit-dependencies
import chalk from 'chalk';

export const logger = async (ctx, next) => {
    console.log(chalk.cyan(new Date().toLocaleString()));
    console.log(`
    method: ${ctx.request.method}
    url: ${ctx.request.url},
    body: ${JSON.stringify(ctx.request.body)}
    `);
    await next();
};
