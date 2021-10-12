const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// Unique Identifier
// All todo entries are identified by an auto-incrementing id. Currently, that id is a counter stored in memory.
//Your first goal is to save the current state of the counter to the hard drive, so it's persisted between server restarts.
//Do this by rewriting getNextUniqueId to make use of the provided readCounter and writeCounter functions.

// Commit your progress: "Complete getNextUniqueId"

exports.getNextUniqueId = (callback) => { //callback will take two params: err & id
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);

  //refactored
  //read the current counter
  readCounter((err, num) => {
    //if it fails, write zero into the counter.txt file
    //if the file already exists, take the number returned from the file, increment by 1
    //skipping unique id 00000


    if (err) {
      throw new Error();
    } else {
      counter = num + 1;
      writeCounter(counter, (err, id) => {
        if (err) {
          throw new Error();
        } else {
          callback(null, id);
        }
      });
    }
  });

  //increment by 1
  //write the file with the incremented counter

  // var nextUniqueId;
  //read from counter.txt to get current id

  //write the new number to counter.txt
  // writeCounter(counter, (err, counterString) => {
  //   nextUniqueId = counterString;
  // });

  // return nextUniqueId;

};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt'); //
