'use strict';
const watch = require('watch');

// https://www.npmjs.com/package/watch
const opts = {
  ignoreDotFiles: true,
  ignoreUnreadableDir: true,
};

watch.watchTree('./src', opts, () => {
  process.stdout.write('Rebuilding...');
  runCommand('npm', ['run', 'build'], (err, stderr, stdout) => {
    if (err) {
      console.log(' Error', err.stack);
      return;
    }
    if (stderr) {
      console.log(' Fail');
      console.log(formatMessage(stderr))
      return;
    }
    if (stdout) {
      console.log(' Built');
      console.log(formatMessage(stdout));
    }
  });
});

// cb signature is (err, stderrString, stdoutString)
function runCommand(cmd, args, cb) {
  const spawn = require('child_process').spawn;
  const child = spawn(cmd, args);

  let stderrMessage = '';
  let stdoutMessage = '';

  child.on('error', (err) => cb(err));

  child.stderr.on('data', buf => stderrMessage += buf.toString());
  child.stderr.on('end', () => cb(null, stderrMessage));

  child.stdout.on('data', buf => stdoutMessage += buf.toString());
  child.stdout.on('end', () => cb(null, null, stdoutMessage));
};

// Adds a 2 space gutter before stdout/stderr output so it stands out
function formatMessage(msg) {
  //if (!msg) return;
  return msg.split('\n')
    .map(s => '  ' + s)
    .join('\n');
}
