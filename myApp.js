let express = require('express');
let bodyParser = require('body-parser');
let app = express();


app.use('/', (req, res, next) => {
  let string = req.method + " " + req.path + " - " + req.ip
  console.log(string);
  next();
})

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.use('/public', express.static(__dirname + '/public'))
app.get('/json', (req, res) => {
  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
    res.send({"message":"HELLO JSON"});
  } else {
    res.send({"message":"Hello json"});
  }
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({'time': req.time});
});

app.get('/:word/echo', (req, res) => res.send({"echo":req.params.word}));

// app.route('/name')
//   .get((req, res) => res.send({'name': req.query.first + ' ' + req.query.last}));

app.use(bodyParser.urlencoded({extended: false}))

app.route('/name')
  .post((req, res) => {
    let first1 = req.body.first
    let last1 = req.body.last
    res.send({"name": first1 + ' ' + last1})
  })

 module.exports = app;
