//dependency
var bodyParser = require('body-parser')
var cheerio    = require("cheerio");
var exphbs     = require('express-handlebars');
var express    = require("express");
var mongoose   = require("mongoose");
var request    = require("request");
var PORT       = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraper";

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Routes
app.get("/", function(req, res) {
    db.Article
    .find({saved: false})
    .then(function(dbArticle) {
      res.render('index', { articles: dbArticle } );
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });

//get data from db
app.get("/all", function(req,res){
    db.Article
    .find({})
    .then(function(dbArticle){
        //when succesfully find the article, send to indec
        res.json(dbArticle);
    }).catch(function(err){
        //if failed, send to index
        res.json(err);

    });

    
});

