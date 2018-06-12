var express  = require("express");
var app      = express();
var port     = process.env.PORT || 8080;
var morgan   = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data
var router = express.Router();
var path = require('path');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
var appRoutes = require('./app/routes/api')(router);
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/tutorial', function(err) {
	if(err) {
		console.log('Not connect to database: ' + err);
	} else {
		console.log('Successfully connceted to Mongodb.')
	}
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
	console.log('running the server' + port);
});
