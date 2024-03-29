'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
// console.log(process.argv[0]);
// console.log(process.argv[1]);



if (!cmd) {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
} else if (cmd === 'read') {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        var index = process.argv[3];
        if (err) {
            throw err;
        }
        var pets = JSON.parse(data);
        if (index) {
            console.log(pets[index]);
        } else {
            console.log(pets);
        }

    });
} else if (cmd === 'create') {
    fs.readFile(petsPath, 'utf8', function(readErr, data) {
        if (readErr) {
            throw readErr;
        }

        var pets = JSON.parse(data);
        var age = process.argv[3];
        var kind = process.argv[4];
        var name = process.argv[5];
        age = parseInt(age)

        var pet = {
            age: age,
            kind: kind,
            name: name
        }

        pets.push(pet)

        if (!pet) {
            console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
            process.exit(1);
        }




        var petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
            if (writeErr) {
                throw writeErr;
            }
            console.log(pet);
        });
    });
} else {
    console.error(`Usage: ${node} ${file} [read | create]`);
    process.exit(1);
}
