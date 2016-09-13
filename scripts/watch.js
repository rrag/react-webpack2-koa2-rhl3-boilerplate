
// polyfill needed since async, await is not implemented in node
// require("babel-core/register");
require("babel-polyfill");

const path = require("path")
const webpack = require("webpack")

const {
	devMiddleware,
	hotMiddleware
} = require("koa-webpack-middleware")

const buildConfig = require("../config/webpack.base.config");

const config = buildConfig("watch")
const compiler = webpack(config)

const koa = require("koa");
const app = new koa();
const serve = require("koa-static");

app.use(serve(path.join(__dirname, "../node_modules")));

app.use(devMiddleware(compiler, {
	// display no info to console (only warnings and errors), default: false
	noInfo: true,

	// display nothing to the console, default: false
	// quiet: false,

	// switch into lazy mode
	// that means no watching, but recompilation on every request, default: false
	// lazy: false,

	// watch options (applicable when lazy: false)
	watchOptions: {
		aggregateTimeout: 300,
		poll: true
	},
	// enable hot reloading, default: true
	// hot: true,

	// public path to bind the middleware to
	// use the same as in webpack
	publicPath: config.output.publicPath,

	// custom headers
	headers: {
		"X-Custom-Header": "yes"
	},
	// options for formating the statistics
	stats: {
		colors: true
	}
}))
app.use(hotMiddleware(compiler, {
	// log: console.warn,
	path: "/yipiee",
	// heartbeat: 10 * 1000
}))

app.listen(3000);
