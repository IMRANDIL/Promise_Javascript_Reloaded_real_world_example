const { pipeline } = require("node:stream/promises");
const fs = require("node:fs");

async function processChunk(chunk, signal) {
  // Check if the operation is aborted
  if (signal.aborted) {
    throw new Error("Pipeline aborted due to timeout.");
  }
  // Example processing: Convert chunk to uppercase
  return chunk.toUpperCase();
}

async function executePipeline(signal) {
  await pipeline(
    fs.createReadStream("lowercase.txt"),
    async function* (source) {
      source.setEncoding("utf8");
      for await (const chunk of source) {
        yield processChunk(chunk, signal);
      }
    },
    fs.createWriteStream("uppercase.txt")
  );
}

async function run() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    await executePipeline(controller.signal);
    console.log("Pipeline succeeded.");
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Pipeline aborted by the user.");
    } else {
      console.error("Pipeline failed:", err);
    }
  } finally {
    clearTimeout(timeout);
  }
}

run().catch(console.error);
