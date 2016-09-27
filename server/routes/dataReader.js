var express = require("express");
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/solidground';
const fs = require('fs');
// var sql = fs.readFileSync('./solidgrounddatadump.sql').toString();

// fs.readFile('./solidgrounddatadump.sql', (err, data) => {
//   if (err) throw err;
//   console.log("data from data dump: ", data);
// });

// var sql = fs.readFileSync('./solidgrounddatadump.sql').toString();

var search = 'CREATE DATABASE "movedb";';
var newFile;

// function append (line) {
//   line = line || 0;
//
//   var body = fs.readFileSync('example.js').toString();
//
//   if (body.indexOf(search) < 0 ) {
//
//     body = body.split('\n');
//     body.splice(line + 1,0,search);
//     body = body.filter(function(str){ return str; }); // remove empty lines
//     var output = body.join('\n');
//     fs.writeFileSync('example.js', output);
//   }
// }

var body = fs.readFileSync('./solidgrounddatadump.sql').toString();

remove();

function remove() {

  // var body = fs.readFileSync('./solidgrounddatadump.sql').toString();
  var idx = body.indexOf(search);

  if (idx >= 0 ) {
    var output = body.substr(0, idx) + body.substr(idx + search.length);
    newFile = fs.writeFileSync('./solidgrounddatadump.sql', output);
    body = fs.readFileSync(newFile).toString();

    console.log("output?: ", output);
  }

}


pg.connect(connectionString, function(err, client, done){
    if(err){
        console.log('error: ', err);
        process.exit(1);
    }
    client.query(body, function(err, result){
        console.log("body shit: ", body);
        done();
        if(err){
            console.log('error: ', err);
            process.exit(1);
        }
        console.log("result: ", result);
        process.exit(0);
    });
});

module.exports = router;
