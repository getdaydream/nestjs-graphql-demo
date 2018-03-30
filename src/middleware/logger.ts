/**
 * log every request
 */
// tslint:disable-next-line:no-implicit-dependencies
import chalk from 'chalk';

export const logger = async (ctx, next) => {
  console.log(chalk.cyan(new Date().toLocaleString()));
  console.log(`method: ${ctx.request.method}`);
  console.log(`url : ${ctx.request.url}`);
  if (ctx.request.method === 'POST' || ctx.request.method === 'PUT') {
    console.log(`body : ${JSON.stringify(ctx.request.body)}\n`);
  } else {
    console.log(`query: ${JSON.stringify(ctx.query)}\n`);
  }
  await next();
};
