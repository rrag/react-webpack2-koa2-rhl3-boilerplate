const watchScripts = `
	<script type="text/javascript" src="/react/dist/react.js"></script>
	<script type="text/javascript" src="/react-dom/dist/react-dom.js"></script>
	<script type="text/javascript" src="/d3/d3.js"></script>`

function getScriptsTag(mode) {
	switch (mode) {
	case "dev":
	case "watch":
		return watchScripts;
	default:
		return "";
	}
}

module.exports = function(params) {
	const { title, mode } = params.htmlWebpackPlugin.options
	return `
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>${title}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	${getScriptsTag(mode)}
</head>
<body>
	<h2>Partial</h2>
	<div id="root"></div>
</body>
</html>`
}
