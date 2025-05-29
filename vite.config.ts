import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import { Plugin } from "vite";
import glob from "fast-glob";

function AutoImportImplPlugin(options: { dir: string }): Plugin {
  const virtualModuleId = "virtual:auto-import-impl";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "vite:auto-import-impl",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const files = glob.sync("**/*Impl.ts", {
          cwd: options.dir,
          absolute: true,
        });

        const imports = files.map((file, index) => {
          const relativePath = path
            .relative(process.cwd(), file)
            .replace(/\\/g, "/");
          return `import * as Impl${index} from '/${relativePath}';`;
        });

        return imports.join("\n");
      }
    },
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "zvos-map-kit",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  plugins: [
    dts(),
    AutoImportImplPlugin({
      dir: path.resolve("src/mapProvider"), // 指定你的目标目录
    }),
  ],
  server: {
    open: '/demo/1_map_init.html',
    // open: "/demo/2_setCenter_setZoom.html",
    // open: "/demo/3_add_remove_marker.html",
    // open: "/demo/4_add_remove_line.html",
    // open: "/demo/5_add_remove_polygon.html",
    // open: "/demo/6_add_remove_circle.html",
    // open: "/demo/7_add_remove_rectangle.html",
    hmr: false, // 禁用热模块替换
  },
});
