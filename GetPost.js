var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set the port to the desired port
var uniquePort = 56665;
app.set('port', uniquePort);
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());


app.get('/',function(req,res){
	//create an array to be inserted
  	var arrayP [];
	var indexA {};
	for(var param in req.query)
	{
		//push the value into the array
		arrayP.push({'index': param, 'input': req.query[param]});
	}
  	indexA.dataList = arrayP;
	res.render('get', indexA;
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});


function genContext(){
  var stuffToDisplay = {};
  stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString('en-US');
  return stuffToDisplay;
}

app.get('/time',function(req,res){
  res.render('time', genContext());
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
