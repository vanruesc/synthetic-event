import babel from "rollup-plugin-babel";
import minify from "rollup-plugin-babel-minify";
import resolve from "rollup-plugin-node-resolve";

const pkg = require("./package.json");
const date = (new Date()).toDateString();
const production = (process.env.NODE_ENV === "production");

const banner = `/**
 * ${pkg.name} v${pkg.version} build ${date}
 * ${pkg.homepage}
 * Copyright ${date.slice(-4)} ${pkg.author.name}, ${pkg.license}
 */`;

const lib = {

	module: {
		input: "src/index.js",
		plugins: [resolve()],
		output: {
			file: pkg.module,
			format: "esm",
			banner: banner
		}
	},

	main: {
		input: "src/index.js",
		plugins: production ? [resolve(), babel()] : [resolve()],
		output: {
			file: pkg.main,
			format: "umd",
			name: pkg.name.replace(/-/g, "").toUpperCase(),
			banner: banner
		}
	},

	min: {
		input: "src/index.js",
		plugins: [resolve(), minify({
			bannerNewLine: true,
			comments: false
		}), babel()],
		output: {
			file: pkg.main.replace(".js", ".min.js"),
			format: "umd",
			name: pkg.name.replace(/-/g, "").toUpperCase(),
			banner: banner
		}
	}

};

export default [lib.module, lib.main].concat(production ? [lib.min] : []);
