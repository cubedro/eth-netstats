var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

const v8 = require('node:v8');
const fs  = require('node:fs');

// view engine setup
app.set('views', path.join(__dirname, (process.env.LITE === 'true' ? '../src-lite/views' : '../src/views')));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, (process.env.LITE === 'true' ? '../dist-lite' : '../dist'))));


let writingHeapdump = false;
async function writeHeapdump(filepath){
	// Check is anything is being written already
  if(writingHeapdump){
    console.log("already writing a snapshot, trigger once done");
    return
  }

  try{
    writingHeapdump = true
    // Lazily import node modules
    const snapshotStream = v8.getHeapSnapshot();

    const fileStream = fs.createWriteStream(filepath);
    await new Promise((resolve) => {
      snapshotStream.pipe(fileStream);
      snapshotStream.on("end", () => {
        resolve();
      });
    });
    return {data: {filepath}};
  }finally{
    writingHeapdump = false;
  }
}

app.get('/snapshot',function(req,res){
  const filepath = `${new Date().toISOString()}.heapsnapshot`;
  console.log("triggering snapshot",{filepath});
	void writeHeapdump(filepath);
	res.json({filepath})
})

app.get('/', function(req, res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});

// production error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
