import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/**/*@(ts|tsx)"],
    format: ["cjs", "esm"], // Build for commonJS and ESmodules
    dts: true, // Generate declaration file (.d.ts)
    treeshake: true,
    splitting: false,
    sourcemap: false, // Generate sourcemap
    clean: true,
    minify: true,
    bundle: true,
    skipNodeModulesBundle: false, // Skip bundling of node_modules
    entryPoints: ["src/index.ts"],
    noExternal: ["motion"],
});
