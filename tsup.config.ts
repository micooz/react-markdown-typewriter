import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/**/index.ts"],
    format: ["cjs", "esm"], // Build for commonJS and ESmodules
    dts: true, // Generate declaration file (.d.ts)
    treeshake: true,
    splitting: false,
    clean: true,
    minify: true,
    bundle: true,
    skipNodeModulesBundle: false, // Skip bundling of node_modules
    entryPoints: ["src/index.ts"],
    noExternal: ["motion"],
    outExtension({ format }) {
        return {
            js: format === "esm" ? ".mjs" : ".cjs",
        };
    },
});
