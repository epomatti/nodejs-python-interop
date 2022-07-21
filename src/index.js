const express = require('express')
const app = express()

const greetPython = "src/greet.py";

app.get('/hello1/', (req, res) => {

  const name = req.query.name;

  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python', [greetPython, name]);

  pythonProcess.stdout.on('data', function (data) {

    console.log(data.toString());
    res.write(data);
    res.end('end');
  });
})

app.get('/hello2/', (req, res) => {

  const name = req.query.name;
  const PythonShell = require('python-shell').PythonShell;

  var options = {
    mode: 'text',
    pythonPath: 'python',
    args: [name]
  };

  PythonShell.run(greetPython, options, function (err, results) {
    if (err)
      throw err;
    console.log('results: %j', results);
  });

  res.end('end');

})

app.get('/hello3/', async (req, res) => {
  
  // TODO: Waiting for issue support to implement this
  const { python } = require('pythonia')
  const test = await python('calc');

  python.exit() //
  res.end('end');
})

app.listen(4000, () => console.log('Application listening on port 4000!'))