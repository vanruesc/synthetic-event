import pkg from "./package.json" with { type: "json" };
import esbuild from "esbuild";

const date = new Date();
const banner = `/**
 * ${pkg.name} v${pkg.version} build ${date.toDateString()}
 * ${pkg.homepage}
 * Copyright 2026 ${pkg.author.name}
 * @license ${pkg.license}
 */`;

const lib = {
	entryPoints: ["./src/index.ts"],
	outfile: "./dist/index.js",
	banner: { js: banner },
	logLevel: "info",
	format: "esm",
	bundle: true
};

await esbuild.build(lib);
