var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extend: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//set the port to the desired port
app.set('port', 56665);


app.get('/get-loopback',function(req,res){
	//create an array to be inserted
  	var arrayP = [];
	var indexA = {};
	for(var param in req.query)
	{
		//push the value into the array
		arrayP.push({'name': param, 'value': req.query[param]});
	}
  	indexA.dataList = arrayP;
	res.render('get-loopback', indexA);
});

app.post('/post-loopback', function(req,res){
	var qParams = [];
	for(var p in req.body){
		qParams.push({'name':p, 'value':req.body[p]})
	}

	var context = {};
	context.dataList = qParams;
	res.render('post-loopback', context);
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
