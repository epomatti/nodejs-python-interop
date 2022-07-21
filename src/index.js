const express = require('express')
const app = express()

app.get('/hello/', (req, res) => {

  const name = req.query.name;

  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python', ["src/greet.py", name]);

  pythonProcess.stdout.on('data', function (data) {

    console.log(data.toString());
    res.write(data);
    res.end('end');
  });
})

app.listen(4000, () => console.log('Application listening on port 4000!'))