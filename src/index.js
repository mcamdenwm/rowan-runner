const rowan = require('@workmarket/rowan').default;
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const chalk = require('chalk');

const app = new Koa();
const router = new Router();

router
  .all('/e', koaBody(),
  (ctx) => {
    // console.log(ctx.request.body);
    const program = ctx.request.body.prog;
    const response_envelope = ctx.request.body.response_envelope;

		if (!program) return ctx.throw('No program, no eval', 400);
		try {
			console.log(chalk.blue(`Attempting to parse ${program}`));
			const parsedprogram = JSON.parse(program);
			const parsedResponseEnvelope = JSON.parse(response_envelope);
			const result = rowan(JSON.parse(program));

			if (typeof result === 'function') {
				console.log(chalk.blue(`Program has returned a function, applying response_envelope ${response_envelope}`));
				const final = result(parsedResponseEnvelope);
				console.log(chalk.green(`Program result... ${final}`));
				ctx.body = final;
			} else {
				console.log(chalk.green(`Result of program: ${result}`));
				ctx.body = result;				
			}
		} catch (e) {
			ctx.throw(`Failed to parse program ${e.message}`);
		}
  });

app
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(5555);
console.log('listening on port 5555');