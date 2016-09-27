var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/solidground';
const fs = require('fs');
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload= multer({ storage: storage });

router.post('/', upload.single('file'), function (req, res, next) {

    var file = req.file;

    console.log('file====', file);

    var search = 'CREATE DATABASE "movedb";';
    //file buffer is a shit load of unreadable code, so use tostring to read sql file
    var body = file.buffer.toString();

    body += ' ALTER TABLE "Head of Household" DROP Column "LastName", DROP Column "MI", DROP Column "FirstName", DROP Column "Address", DROP Column "City", DROP Column "State", DROP Column "ZIPPostal", DROP Column "CellPhone"; ';
    body += ' ALTER TABLE "Head of Household-2" DROP Column "LastName", DROP Column "MI", DROP Column "FirstName", DROP Column "Address", DROP Column "City", DROP Column "State", DROP Column "ZIPPostal", DROP Column "CellPhone"; ';
    body += ' ALTER TABLE "Members of Household"  DROP Column "MI", DROP Column "Last Name", DROP Column "First Name", DROP Column "CellPhone"; ';

    console.log(body);

    remove();

    function remove() {
        var idx = body.indexOf(search);

        if (idx >= 0 ) {
            body = body.substr(0, idx) + body.substr(idx + search.length);
        }
    }

    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            console.log('error: ', err);
            res.sendStatus(500);
        }
        client.query(body, function (err, result) {

            console.log(result);
            done();
            if (err) {
                console.log('error: ', err);
                res.sendStatus(500);
            }
            res.send(result.rows);
        });
    });
});

module.exports = router;
