var express = require('express'),
		path = require('path'),
		favicon = require('serve-favicon'),
		logger = require('morgan'),
		cookieParser = require('cookie-parser'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		SQLiteStore = require('connect-sqlite3')(session),
		fs = require("fs-extra"),

		index = require('./routes/index'),
		tests = require('./routes/testing'),
		api = require('./routes/api/index'),

		Database = require("./local_modules/database"),
		configCheck = require("./local_modules/configcheck"),

		dbconf, db;

		app = express();

configCheck(path.join(__dirname, "source", "config"));

dbconf = require("./source/config/db.conf.json");
db = new Database({
	conn: dbconf.connection,
	pathToSql: path.join(__dirname, "source", "sql")
});

fs.mkdirp(".session");
db.init(() => {
	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'hjs');
	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser('ThirteenWildDonkeysRunningAroundTheStables'));
	app.use(session({
		store: new SQLiteStore({table: 'sessions', db:'session-db', dir:'.session'}),
		secret: 'ThirteenWildDonkeysRunningAroundTheStables',
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
		},
		resave: false,
		saveUninitialized: false
	}));
	app.use(require('less-middleware')(path.join(__dirname, 'source', 'less'), {
		dest: path.join(__dirname, 'public'),
		preprocess: {
			path: (pathname) => {
				return pathname.replace(path.sep + 'css' + path.sep, path.sep);
			}
		}
	}));
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(db.hook)
	app.use('/', index);
	app.use('/test', tests);
	app.use('/api', api);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});
});


module.exports = app;
