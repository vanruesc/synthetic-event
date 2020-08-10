import resolve from "@rollup/plugin-node-resolve";
import typescript  from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");
const date = (new Date()).toDateString();

const banner = `/**
 * ${pkg.name} v${pkg.version} build ${date}
 * ${pkg.homepage}
 * Copyright ${date.slice(-4)} ${pkg.author.name}
 * @license ${pkg.license}
 */`;

const production = (process.env.NODE_ENV === "production");

const lib = {
	module: {
		input: "src/index.ts",
		plugins: [resolve(), typescript({ target: "ESNext" })],
		output: {
			dir: "build",
			entryFileNames: pkg.name + ".esm.js",
			format: "esm",
			banner
		}
	},
	main: {
		input: "src/index.ts",
		plugins: [resolve(), typescript()],
		output: [{
			dir: "build",
			entryFileNames: pkg.name + ".js",
			format: "umd",
			name: pkg.name.replace(/-/g, "").toUpperCase(),
			banner
		}, {
			dir: "build",
			entryFileNames: pkg.name + ".min.js",
			format: "umd",
			name: pkg.name.replace(/-/g, "").toUpperCase(),
			plugins: [terser()],
			banner
		}]
	}
};

export default [lib.module, lib.main];
