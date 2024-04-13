const { pipeline } = require("node:stream/promises");
const fs = require("node:fs");

async function processChunk(chunk, signal) {
  // Check if the operation is aborted
  if (signal && signal.aborted) {
    throw new Error("Pipeline aborted due to timeout.");
  }
  // Example processing: Convert chunk to uppercase
  return chunk.toUpperCase();
}

async function executePipeline(signal) {
  // Simulate a delay of 10 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));

  // Check if the operation is aborted
  if (signal && signal.aborted) {
    throw new Error("Pipeline aborted due to timeout.");
  }

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

async function createAbortController(timeoutDuration) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutDuration);
  return { controller, timeout };
}

async function run() {
  const { controller, timeout } = await createAbortController(5000);
  try {
    await executePipeline(controller.signal);
    console.log("Pipeline succeeded.");
  } catch (err) {
    if (err.message === "Pipeline aborted due to timeout.") {
      console.log("Pipeline aborted due to timeout.");
    } else if (err.name === "AbortError") {
      console.log("Pipeline aborted by the user.");
    } else {
      console.error("Pipeline failed:", err);
    }
  } finally {
    clearTimeout(timeout);
  }
}

run().catch(console.error);
