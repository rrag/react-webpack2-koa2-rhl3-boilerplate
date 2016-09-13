var webpack = require("webpack");
var path = require("path");
var { getIfUtils, removeEmpty } = require("webpack-config-utils")

var HtmlWebpackPlugin = require("html-webpack-plugin");

var ProgressBarPlugin = require("progress-bar-webpack-plugin");

const appSources = [
	path.resolve(__dirname, "../node_modules/react-stockcharts/"),
	path.resolve(__dirname, "../src"),
]

function buildConfig(mode) {
	const { ifProd, ifNotProd, ifNotDev, ifWatch, ifNotWatch } = getIfUtils(mode, ["prod", "dev", "test", "watch"])

	return {
		context: path.join(__dirname, ".."),
		entry: removeEmpty([
			ifWatch("react-hot-loader/patch"),
			ifWatch("webpack-hot-middleware/client?path=/yipiee&timeout=20000"),
			// WATCH === mode ? "webpack-dev-server/client?http://localhost:3000" : null,
			// WATCH === mode ? "webpack/hot/only-dev-server" : null,
			"./src/index",
		]),
		output: {
			path: path.join(__dirname, "..", "build"),
			publicPath: "/",
			filename: `dist/main${ifProd(".min", "")}${ifWatch("", ".[hash]")}.js`,
			pathinfo: ifWatch(true, false), // since we have eval as devtool for watch, pathinfo gives line numbers which are close enough
		},
		debug: true,
		devtool: ifWatch("eval", "sourcemap"),
		module: {
			loaders: [
				// { test: /\.json$/, loader: "json" },
				// { test: /\.html$/, loader: "html" },
				{ test: /\.(js|jsx)$/, loaders: ["babel"],/* exclude: /node_modules/ */ include: appSources},
				// { test: /\.(js|jsx)$/, loaders: ["babel"], exclude: /node_modules\/(?!react-stockcharts$)/, },
				// { test: /\.jpg$/, loader: "file-loader" },
				// { test: /\.(png|svg)$/, loader: "url-loader?mimetype=image/png" },
				// { test: /\.scss$/, loaders: ["style", "css", "autoprefixer", "sass?outputStyle=expanded"] },
			]
		},
		plugins: removeEmpty([
			new ProgressBarPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(),
			ifWatch(new webpack.HotModuleReplacementPlugin()),
			ifProd(new webpack.optimize.DedupePlugin()),
			ifNotWatch(new webpack.DefinePlugin({
				"process.env": {
					// This has effect on the react lib size
					NODE_ENV: JSON.stringify("production"),
				},
			})),
			ifProd(new webpack.optimize.UglifyJsPlugin({
				compress: {
					screw_ie8: true,
					warnings: false,
					drop_console: true,
				},
				sourceMap: true,
			})),
			new HtmlWebpackPlugin({
				template: "./src/indexTemplate.js",
				title: "foobar",
				mode,
				filename: `index${ifNotDev("", ".dev")}.html`
			}),
			/*
			ifProd(new OfflinePlugin()),*/
		]),
		externals: ifNotProd({
			"react": "React",
			"react-dom": "ReactDOM",
			"d3": "d3",
		}, {}),
		resolve: {
			extensions: ["", ".js", ".jsx", ".scss"]
		}
	};
}

module.exports = buildConfig;
