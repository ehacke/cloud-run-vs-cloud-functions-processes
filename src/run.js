const http = require('http');
const { execSync } = require('child_process');

// eslint-disable-next-line no-process-env
const PORT = process.env.PORT || 3000;

const app = http.createServer((req, res) => {
  const start = Date.now();

  console.log('Before loading');
  // eslint-disable-next-line no-process-env
  execSync('echo "foo"; node src/generateLibs.js', { stdio: 'inherit', env: { PATH: process.env.PATH } });

  const duration = Date.now() - start;
  console.log(`Execution: ${duration} ms`);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ duration }));
});
app.listen(PORT);
