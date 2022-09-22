// vite.config.lib.js
import { join } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
var name = process.env.npm_package_name;
var formats = ["es"];
var external = [
  "@cosmicverse/foundation"
];
var globals = {};
var dirname = process.cwd();
var dirPath = (path = "") => join(dirname, path);
var srcDir = (path = "") => join(dirPath("src"), path);
var rootDir = srcDir();
var assetsDir = false;
var publicDir = false;
var outDir = dirPath("dist");
var entry = "index.ts";
var fileName = (format) => `lib.${format}.js`;
var isWatch = (mode) => "watch" === mode;
var isDev = (mode) => "development" === mode || isWatch(mode);
var vite_config_lib_default = ({ mode }) => {
  const manifest = false;
  const emptyOutDir = true;
  const cssCodeSplit = true;
  const sourcemap = false;
  const minify = !isDev(mode);
  const watch = isWatch(mode);
  return defineConfig({
    root: rootDir,
    assetsDir,
    publicDir,
    plugins: [
      tsconfigPaths({
        root: dirPath()
      }),
      dts({
        root: dirPath()
      })
    ],
    build: {
      manifest,
      outDir,
      emptyOutDir,
      cssCodeSplit,
      sourcemap,
      lib: {
        name,
        entry,
        formats,
        fileName
      },
      rollupOptions: {
        external,
        output: {
          globals
        }
      },
      minify,
      watch
    }
  });
};
export {
  vite_config_lib_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubGliLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2RhbmllbC9SZXBvcy9jb3NtaWNtaW5kL3dvcmtzcGFjZS9saWJzL3BhdHRlcm5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZGFuaWVsL1JlcG9zL2Nvc21pY21pbmQvd29ya3NwYWNlL2xpYnMvcGF0dGVybnMvdml0ZS5jb25maWcubGliLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9kYW5pZWwvUmVwb3MvY29zbWljbWluZC93b3Jrc3BhY2UvbGlicy9wYXR0ZXJucy92aXRlLmNvbmZpZy5saWIuanNcIjsvLyBDb3B5cmlnaHQgKEMpIDIwMjIsIENvc21pY01pbmQsIEluYy4gPGh0dHA6Ly9jb3NtaWNtaW5kLmNvbT4uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuXG5jb25zdCBuYW1lID0gcHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfbmFtZVxuY29uc3QgZm9ybWF0cyA9IFsgJ2VzJyBdXG5jb25zdCBleHRlcm5hbCA9IFtcbiAgJ0Bjb3NtaWN2ZXJzZS9mb3VuZGF0aW9uJ1xuXVxuY29uc3QgZ2xvYmFscyA9IHt9XG5cbmNvbnN0IGRpcm5hbWUgPSBwcm9jZXNzLmN3ZCgpXG5jb25zdCBkaXJQYXRoID0gKHBhdGggPSAnJykgPT4gam9pbihkaXJuYW1lLCBwYXRoKVxuY29uc3Qgc3JjRGlyID0gKHBhdGggPSAnJykgPT4gam9pbihkaXJQYXRoKCdzcmMnKSwgcGF0aClcbmNvbnN0IHJvb3REaXIgPSBzcmNEaXIoKVxuY29uc3QgYXNzZXRzRGlyID0gZmFsc2VcbmNvbnN0IHB1YmxpY0RpciA9IGZhbHNlXG5jb25zdCBvdXREaXIgPSBkaXJQYXRoKCdkaXN0JylcbmNvbnN0IGVudHJ5ID0gJ2luZGV4LnRzJ1xuY29uc3QgZmlsZU5hbWUgPSBmb3JtYXQgPT4gYGxpYi4ke2Zvcm1hdH0uanNgXG5cbmNvbnN0IGlzV2F0Y2ggPSBtb2RlID0+ICd3YXRjaCcgPT09IG1vZGVcbmNvbnN0IGlzRGV2ID0gbW9kZSA9PiAnZGV2ZWxvcG1lbnQnID09PSBtb2RlIHx8IGlzV2F0Y2gobW9kZSlcblxuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IG1hbmlmZXN0ID0gZmFsc2VcbiAgY29uc3QgZW1wdHlPdXREaXIgPSB0cnVlXG4gIGNvbnN0IGNzc0NvZGVTcGxpdCA9IHRydWVcbiAgY29uc3Qgc291cmNlbWFwID0gZmFsc2VcblxuICBjb25zdCBtaW5pZnkgPSAhaXNEZXYobW9kZSlcbiAgY29uc3Qgd2F0Y2ggPSBpc1dhdGNoKG1vZGUpXG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgcm9vdDogcm9vdERpcixcbiAgICBhc3NldHNEaXIsXG4gICAgcHVibGljRGlyLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHRzY29uZmlnUGF0aHMoe1xuICAgICAgICByb290OiBkaXJQYXRoKCksXG4gICAgICB9KSxcbiAgICAgIGR0cyh7XG4gICAgICAgIHJvb3Q6IGRpclBhdGgoKSxcbiAgICAgIH0pXG4gICAgXSxcbiAgICBidWlsZDoge1xuICAgICAgbWFuaWZlc3QsXG4gICAgICBvdXREaXIsXG4gICAgICBlbXB0eU91dERpcixcbiAgICAgIGNzc0NvZGVTcGxpdCxcbiAgICAgIHNvdXJjZW1hcCxcbiAgICAgIGxpYjoge1xuICAgICAgICBuYW1lLFxuICAgICAgICBlbnRyeSxcbiAgICAgICAgZm9ybWF0cyxcbiAgICAgICAgZmlsZU5hbWUsXG4gICAgICB9LFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBleHRlcm5hbCxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZ2xvYmFscyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBtaW5pZnksXG4gICAgICB3YXRjaCxcbiAgICB9LFxuICB9KVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLFlBQVk7QUFFckIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxTQUFTO0FBRWhCLElBQU0sT0FBTyxRQUFRLElBQUk7QUFDekIsSUFBTSxVQUFVLENBQUUsSUFBSztBQUN2QixJQUFNLFdBQVc7QUFBQSxFQUNmO0FBQ0Y7QUFDQSxJQUFNLFVBQVUsQ0FBQztBQUVqQixJQUFNLFVBQVUsUUFBUSxJQUFJO0FBQzVCLElBQU0sVUFBVSxDQUFDLE9BQU8sT0FBTyxLQUFLLFNBQVMsSUFBSTtBQUNqRCxJQUFNLFNBQVMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLEtBQUssR0FBRyxJQUFJO0FBQ3ZELElBQU0sVUFBVSxPQUFPO0FBQ3ZCLElBQU0sWUFBWTtBQUNsQixJQUFNLFlBQVk7QUFDbEIsSUFBTSxTQUFTLFFBQVEsTUFBTTtBQUM3QixJQUFNLFFBQVE7QUFDZCxJQUFNLFdBQVcsWUFBVSxPQUFPO0FBRWxDLElBQU0sVUFBVSxVQUFRLFlBQVk7QUFDcEMsSUFBTSxRQUFRLFVBQVEsa0JBQWtCLFFBQVEsUUFBUSxJQUFJO0FBRTVELElBQU8sMEJBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUMzQixRQUFNLFdBQVc7QUFDakIsUUFBTSxjQUFjO0FBQ3BCLFFBQU0sZUFBZTtBQUNyQixRQUFNLFlBQVk7QUFFbEIsUUFBTSxTQUFTLENBQUMsTUFBTSxJQUFJO0FBQzFCLFFBQU0sUUFBUSxRQUFRLElBQUk7QUFFMUIsU0FBTyxhQUFhO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ047QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxjQUFjO0FBQUEsUUFDWixNQUFNLFFBQVE7QUFBQSxNQUNoQixDQUFDO0FBQUEsTUFDRCxJQUFJO0FBQUEsUUFDRixNQUFNLFFBQVE7QUFBQSxNQUNoQixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxLQUFLO0FBQUEsUUFDSDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
