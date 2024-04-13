const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');


async function processChunk(chunk) {
  // Example processing: Convert chunk to uppercase
  return chunk.toUpperCase();
}

async function run() {
  // Create an AbortController and set up a timeout for 5 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000); // 5 seconds timeout

  try {
    await pipeline(
      fs.createReadStream('lowercase.txt'),
      async function* (source, { signal }) {
        source.setEncoding('utf8');  // Work with strings rather than `Buffer`s.
        for await (const chunk of source) {
          // Check if the operation is aborted
          if (signal.aborted) {
            console.log('Pipeline aborted due to timeout.');
            return;
          }
          yield processChunk(chunk);  // Process chunk
        }
      },
      fs.createWriteStream('uppercase.txt'),
      { signal: controller.signal } // Pass the signal to the pipeline
    );
    console.log('Pipeline succeeded.');
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Pipeline aborted by the user.');
    } else {
      console.error('Pipeline failed:', err);
    }
  } finally {
    // Clear the timeout
    clearTimeout(timeoutId);
  }
}

run().catch(console.error);
