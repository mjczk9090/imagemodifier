import readline from "node:readline";
import sharp from "sharp";
import clipboard from "clipboardy";
// const clipboard = require("clipboardy");
// const clipboard = import("clipboardy");

export default function imageTransform(
  sourceDir,
  outputDir,
  options,
  path,
  widthNum,
  heightNum,
  dpiNum
) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(clipboard.writeSync);
  // logic on what to do when new file is added
  rl.question("Input filename for processed image: ", (response) => {
    let filename = response;
    const fullOutputPath = String.prototype.concat(
      outputDir,
      "/",
      options.prefix,
      filename,
      options.suffix,
      ".",
      options.type
    );

    const newFileName = String.prototype.concat(
      options.prefix,
      filename,
      options.suffix,
      ".",
      options.type
    );

    if (options.clip) {
      clipboard.writeSync(newFileName);
      console.log(`'${newFileName} copied to clipboard.`);
    }

    sharp(path)
      .resize({
        width: widthNum,
        height: heightNum,
        fit: options.objectFit,
      })
      .toColorspace(options.colorSpace)
      .toFormat(options.type)
      .withMetadata({ density: dpiNum })
      .toFile(fullOutputPath)
      .then(() => {
        console.log("Image modified and saved to: " + fullOutputPath);
        console.log(
          "Waiting for new image to be saved to " + sourceDir + " ..."
        );
        return;
      });

    rl.close();
  });
}
