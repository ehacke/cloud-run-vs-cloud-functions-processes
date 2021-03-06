const path = require('path');
const getenv = require('getenv');
const { start } = require('./invokeAndRecord');
require('dotenv').config();

(async () => {
  const OUTPUT_PATH = path.join(__dirname, '../results/function');

  await start(getenv('CLOUD_FUNCTION_URL'), 'load', OUTPUT_PATH, 4000);
  await start(getenv('CLOUD_FUNCTION_URL'), 'hog', OUTPUT_PATH, 2000);
  await start(getenv('CLOUD_FUNCTION_URL'), 'regenerate', OUTPUT_PATH, 6000);
  console.log('Done all for function');
})();
