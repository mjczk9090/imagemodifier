import { Command } from "commander";
import watchDirectory from "./lib/watch.js";
const program = new Command();

program
  .name("modimage")
  .description(
    "CLI to automatically process images according to user-defined specifications."
  )
  .version("0.1.0", "-v, --version", "output the current version");

program
  .command("watch")
  .description(
    "Watch a specified directory for new images and process images to defined output directory."
  )
  .argument("<sourceDirectory>", "The source directory to watch")
  .argument(
    "<outputDirectory>",
    "The directory where modified images will be saved"
  )
    .requiredOption("-w, --width <width>", "Width for the output image")
  .requiredOption(
    "-t, --type <fileType>",
    "File type for output file without dot"
  )
  .option("-p, --prefix [prefix]", "Prefix to prepend to the output file name")
  .option("-h, --height [height]", "Height for the output image")
  .option("-sx, --suffix [suffix]", "String to append to the end of file name")
  .option("--fit [objectFit]", "Object fit.")
  .option("--clip", "Copy new filename to clipboard automatically")
  .option("--dpi [dpi]", "Set dpi of output images; defaults to 72.")
  .option("--color-space [colorSpace]", "Set color space for output; defaults to sRGB")
  .action((sourceDirectory, outputDirectory, options) => {
    console.log("Initializing watch function.");
    watchDirectory(sourceDirectory, outputDirectory, options);
  });

program.parse(process.argv);
