#!/usr/bin/env node
let fs = require('fs');

// command line argument
// 0 : environment variables
// 1 : cat.js file path
// 2 : if passed any data using cmd will be ... 
// process.argv return an array...
// console.log(process.argv)

// console.log(process.argv.slice(2))
let options = []
let files = []

// get the command line arguments from 2nd position of array
let cmd = process.argv.slice(2);

// Separate the elements on - in options[] and files.txt in files[]
for (let i = 0; i < cmd.length; i++) {
    if (cmd[i].startsWith("-")) {
        options.push(cmd[i]);
    } else {
        files.push(cmd[i]);
    }
}

// Code for reading file data and converting to string
// -s : checks whether the file contains more than one \n newline characters
// If \n is present than remove those spaces.
// and again join the data on \n so that only one space is added.
// if the user inputs invalid file name then print invalid file name and exit the program.
let str=``
for (let i = 0; i < files.length; i++) {
    if (fs.existsSync(files[i])) {// file exists checks {
        str += fs.readFileSync(files[i]).toString();// read the file and append to str
        
        str = str.split("\n");
        if (options.includes("-s")) {
            str = removeSpace(str);
        }
        
        // -b: Number only for non-empty spaces.
        // -n: Number all the lines.

        // check
        if (options.includes("-b") && options.includes("-n")) {
            if (options.indexOf("-b") < options.indexOf("-n")) {
                // -b mode;
                str = addIndexesForNonEmpty(str);
            } else {
                // -n mode;
                str = addAllIndexes(str);
            }
        } else {
            if (options.includes("-b")) {
                // -b mode;
                str = addIndexesForNonEmpty(str);
            }
            if (options.includes("-n")) {
                // -n mode
                str = addAllIndexes(str);
            }
        }
        str = str.join("\n");

        // Writing to file.
        if (str !== null) {
            fs.writeFile("abc/f", str, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        console.log(str);
        
    } else {
        console.log("Invalid File");
        return;
    }
}

// remove space function..
function removeSpace(x) {
    let y=[]
    let flag=false
    for (let i = 0; i < x.length; i++){
        if (x[i] === '' || x[i] === '\r') {
            if(flag===true){
                continue;
            }else{
                y.push(x[i])
                flag=true
            }
        }else{
            y.push(x[i])
            flag=false
        }
    }
    x = y;
    return x;
}

// -n mode;
function addAllIndexes(arr) {
    let lineNumber=1;
    for (let i = 0; i < arr.length; i++) {
        arr[i] = lineNumber + " " + arr[i];
        lineNumber++;
    }
    return arr;
}

// -b mode;
function addIndexesForNonEmpty(arr) {
    let lineNumber = 1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== "" && arr[i] !== "\r") {
            arr[i] = lineNumber + " " + arr[i];
            lineNumber++;
        }
    }
    return arr;
}

// Run code
/*
    node cat.js -s abc.f
*/