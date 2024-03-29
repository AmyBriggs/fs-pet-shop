'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');
// var router = express.Router();

app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        var pets = JSON.parse(petsJSON);

        res.send(pets);
    })
})

app.get('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        var id = Number.parseInt(req.params.id);
        var pets = JSON.parse(petsJSON);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        // res.set('Content-Type', 'text/plain');
        res.send(pets[id]);
    });
});

app.post('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }



        var pets = JSON.parse(petsJSON);

        var pet = {
            age: parseInt(req.body.age),
            kind: req.body.kind,
            name: req.body.name,
        }

        if (!pet) {
            return res.sendStatus(400);
        } else if (pet.kind === "" || pet.name === "") {
            return res.sendStatus(400);
        } else if (isNaN(pet.age)) {
            return res.sendStatus(400);
        }

        pets.push(pet)
        console.log("new pet added!");

        var newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
            if (writeErr) {
                console.error(writeErr.stack);
                return res.sendStatus(500);
            }

            res.set('Content-Type', 'text/plain');
            res.send(pet);
        });
    });
});

app.put('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
        if (readErr) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        var id = Number.parseInt(req.params.id);
        var pets = JSON.parse(petsJSON);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        var pet = {
            age: parseInt(req.body.age),
            kind: req.body.kind,
            name: req.body.name,
        }

        if (!pet) {
            return res.sendStatus(400);
        } else if (pet.kind === "" || pet.name === "") {
            return res.sendStatus(400);
        } else if (isNaN(pet.age)) {
            return res.sendStatus(400);
        }

        pets[id] = pet;

        var newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, function(err) {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }

            res.set('Content-Type', 'text/plain');
            res.send(pet);
        });
    });
});

app.delete('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        var id = Number.parseInt(req.params.id);
        var pets = JSON.parse(petsJSON);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }


        var pet = pets.splice(id, 1)[0];
        var newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
            if (writeErr) {
                console.error(writeErr.stack);
                return res.sendStatus(500);
            }

            res.set('Content-Type', 'text/plain');
            res.send(pet);
        });
    });
});

// app.use(function(req, res) {
//   res.sendStatus(404);
// });

app.listen(port, function() {
    console.log('Listening on port', port);
});
