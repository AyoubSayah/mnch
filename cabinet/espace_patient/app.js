const express = require('express')
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const logger = require('morgan')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Handlebars = require('handlebars');
const passport = require('passport')
const flash = require('connect-flash');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
var geoip = require('geoip-lite');
const publicIp = require('public-ip');
const multer =require('multer');

const app = express()


// data base connection with mongoose
mongoose.connect('mongodb://localhost:27017/medical', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
// db connection verification (open)
db.once('open', () => {
    console.log('connected to mongodb')
});
// db connection verification (err)
db.on('error', (err) => {
    console.log('error')
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//load view engine
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir : path.join(__dirname,'views/partials'),
    hbs: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); //form-urlencoded
// for parsing multipart/form-data
app.use(express.static('public'));


//session
app.use(session({
    name: 'sessionId',
    secret: 'mysecret',
    saveUninitialized: false, // don't create sessions for not logged in users
    resave: false, //don't save session if unmodified

    //session storage in mongo
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 1 * 24 * 60 * 60 // = 14 days. ttl means "time to live" (expiration in seconds)
    }),
    // cookies settings
    cookie: {
        secure: false,
        SameSite: 'None',
        httpOnly: false, // if true, will disallow JavaScript from reading cookie data
        expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour;
    }
}))

//passport config 
require('./config/passport')(passport)
    // Passport init (must be after establishing the session above)
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());






// Pass 'req.user' as 'user' to hbs templates
// Just a custom middleware
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    // res.locals is an object available to hbs templates. for example: {{user}}
    next();
})





// Routes ----------------------------------------------
app.use('/auth', require('./routes/auth'))
app.use('/', require('./routes/pages'))
    // -----------------------------------------------------

//main route 
//get models schema
const doctor = require('./models/doctor');
const user = require('./models/user');

app.get('/', function(req, res) {

  res.render('landing');
})
app.get('/acceuil', function(req, res) {
    (async() => {
        let ipadd = await publicIp.v4();
        const geo = geoip.lookup(ipadd);
        const errors = req.flash() || [];
        doctor.find({accepted: true,id_secrt: {$ne : null}}, (err, docs) => {
            if (err) { console.log(err) } 
            else {
                res.render('home', { succes : errors.succes ,geo, docs, errors : errors.error, user: req.user });
            }
        }).populate('id_user')
    })();
});


app.post('/acceuil', (req, res) => {
    (async() => {
        let ipadd = await publicIp.v4();
        const geo = geoip.lookup(ipadd);
        const errors = req.flash()|| [];
        if (req.body.speciality == '0') {
            var colName = req.body.doctorname;
            doctor.find({ nom: { $regex: '.*' + colName + '.*' },accepted: true,id_secrt: {$ne : null} }, (err, docs) => {
                if (err) {} else { 
                    res.render('home', {succes : errors.succes, geo, docs, errors : errors.error, user: req.user });
                }
            })
        } else {
            colName = req.body.speciality;
            doctor.find({ spec: { $regex: '.*' + colName + '.*' } }, (err, docs) => {
                if (err) {} else {    
                 res.render('home', { succes : errors.succes, geo, docs, errors : errors.error, user: req.user });    
                }
            })

        }
    })();
})




app.listen(4000, function() {
    console.log('Example app listening on port 4000!')
})