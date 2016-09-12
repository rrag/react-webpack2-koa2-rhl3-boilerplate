// polyfill needed since async, await is not implemented in node
// require("babel-core/register");
require("babel-polyfill");

const path = require("path")

const koa = require("koa");
const app = new koa();
const serve = require("koa-static");

app.use(serve(path.join(__dirname, "../node_modules")));
app.use(serve(path.join(__dirname, "../build")));

app.listen(3000);
