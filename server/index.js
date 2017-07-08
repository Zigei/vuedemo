const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connet -mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
const winston = require('winston');
const expressWinston = require('express-winston');
const tools = require('./lib/tools');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	name: config.session.key,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: config.session.maxAge
	},
	store: new MongoStore({
		url: copnfig.mongodb
	})
}))


app.use(flash());

app.locals.times = {
	title: pkg.name,
	description: pkg.description
}

app.use((req, res, next) => {
	res.locals.user = req.session.user;
	res.locals.success = req.flash('success').toString();
	res.locals.error = req.flash('error').toString();
	next();
});

router(app);

app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.Console({
			json: true,
			colorize: true
		}),
		new winston.transports.File({
			filename: `logs/${tools.nowTime()}.log`
		})
	]
}))

app.use((err, req, res, next) => {
	res.render('error', {
		error: err
	})
})

app.listen(config.port, () => {
	console.log(`${pkg.name} listening on port ${config.port}`);
});
