var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

// Routes
// var dataReader = require("./routes/dataReader");
var upload = require('./routes/uploadfile');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// app.use("/dataReader", dataReader);
app.use('/fileUpload', upload);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

// App Set //
app.set("port", (process.env.PORT || 4000));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
