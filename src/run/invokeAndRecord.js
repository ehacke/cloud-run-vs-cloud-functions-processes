const fs = require('fs-extra');
const got = require('got');

console.log('Starting');

const MAX_COUNT = 1000;

/**
 * This will:
 *  - invoke the provided URL
 *  - record results to file
 *  - exit once done
 *
 *
 * @param {string} url
 * @param {string} type
 * @param {string} outputPath
 * @param {number} timeoutMs
 * @returns {void}
 */
const start = async (url, type, outputPath, timeoutMs) => {
  let counter = 0;
  outputPath += `-${type}.out`;

  if (fs.existsSync(outputPath)) {
    fs.removeSync(outputPath);
  }

  fs.ensureFile(outputPath);

  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      if (counter >= MAX_COUNT) {
        clearInterval(interval);
        console.log('Done');
        resolve();
      }

      const requestId = counter++;

      const { duration } = await got(`${url}?type=${type}`).json();
      console.log(`Request: ${requestId} duration: ${duration}`);
      await fs.appendFile(outputPath, `${duration}\n`, 'utf8');
    }, timeoutMs);
  });
};

module.exports = { start };
