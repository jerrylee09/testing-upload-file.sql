var express = require("express");
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/solidground';
const fs = require('fs');

router.post('/', function (req, res) {
    var file = req.body;
    file.toString();

    console.dir('file dir server line 13', file);

var search = 'CREATE DATABASE "movedb";';
var newFile;

var body = fs.readFileSync('./solidgrounddatadump.sql').toString();

remove();

function remove() {

    var body = fs.readFileSync('./solidgrounddatadump.sql').toString();
    var idx = body.indexOf(search);

    if (idx >= 0 ) {
        var output = body.substr(0, idx) + body.substr(idx + search.length);
        newFile = fs.writeFileSync('./solidgrounddatadump.sql', output);
        body = fs.readFileSync(newFile).toString();

        console.log("output?: ", output);
    }

}




         var body = fs.readFileSync('./solidgrounddatadump.sql').toString();
        pg.connect(connectionString, function (err, client, done) {
            if (err) {
                console.log('error: ', err);
                process.exit(1);
            }
            client.query(body, function (err, result) {
                // console.log("body shit: ", body);
                console.log('file new  server line 46', file);
                done();
                if (err) {
                    console.log('error: ', err);
                    process.exit(1);
                }
                console.log("result: ", result);
                process.exit(0);
            });
        });
    });



module.exports = router;
