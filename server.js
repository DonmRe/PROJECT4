var express        = require('express'),
    app            = express(),
    session        = require('express-session'),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    cookieParser   = require('cookie-parser'),
    logger         = require('morgan'),
    passport       = require('passport'),
    localStrategy  = require('passport-local'),
    flash          = require('connect-flash'),
    port           = process.env.PORT || 3000,
    userRoutes     = require('./config/user_routes'),
    venueRoutes    = require('./config/venue_routes'),
    favicon        = require('serve-favicon'),
    path           = require('path'),
    passportConfig = require('./config/passport');
    
var dbUri = process.env.MONGODB_URI || 'mongodb://localhost/WSWD'
mongoose.connect(dbUri)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({ secret: 'secret!' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passportConfig(passport)


app.use(function (req, res, next){
  global.user = req.user
  next()
})

app.use('/users', userRoutes)
app.use('/venues', venueRoutes)


app.listen(port, function(req, res){
  console.log('available on port ', port)
})
