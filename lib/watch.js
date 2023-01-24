import chokidar from "chokidar";
import imageTransform from "./imgtransformer.js";

export default function watchDirectory(sourceDir, outputDir, options) {
  const watcher = chokidar.watch(sourceDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  //   sanitize options
  const widthNum = parseInt(options.width, 10);
  let heightNum;
  let dpiNum;

  if (options.height) {
    heightNum = parseInt(options.height, 10);
  } else {
    heightNum = undefined;
  }

  if (options.dpi) {
    dpiNum = parseInt(options.dpi);
  } else {
    dpiNum = 72;
  }

  if (!options.prefix) {
    options.prefix = "";
  }

  if (!options.suffix) {
    options.suffix = "";
  }

  if (!options.colorSpace) {
    options.colorSpace = "srgb";
  }

  watcher.on("ready", () => {
    console.log(sourceDir + " scanned, waiting for new images...");

    watcher.on("add", (path) => {
      console.log("New image, " + path + ", detected.");
      imageTransform(
        sourceDir,
        outputDir,
        options,
        path,
        widthNum,
        heightNum,
        dpiNum
      );
    });
  });
}
