const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // //original
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text }); //callback "null" parameter indicates that there is no error

  //REFACTORED
  //write a new file using fs.writeFile
  //file name = use path.join(datadir, id), which will create a file path in the "./data" directory (which is created in "initialize" at the bottom)
  //file contents = text parameter

  //from nodejs.org: It is unsafe to use fs.writeFile() multiple times on the same file without waiting for the callback. For this scenario, fs.createWriteStream() is recommended.

  counter.getNextUniqueId((err, id) => {
    if (err) {
      throw new Error();
    } else {
      fs.writeFile("./data/" + id, text, (err, id) => {
        console.log(path.join(exports.dataDir, id));
        if (err) {
          throw new Error();
        } else {
          callback(null, { id, text });
        }
      });
    }
  });

};






exports.readAll = (callback) => {
  // //ORIGINAL
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);

  //REFACTORED
  //declare an empty array, which will hold the todos (as objects)
  //iterate through all todo files using a for loop (min = 0, max = counter.txt value)
  //pass the i as "id" into .readOne (this will return an object)
  //push the object to the array
};

exports.readOne = (id, callback) => {
  // //ORIGINAL
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }

  //REFACTORED
  //read file at dataDir/[id]
  //USE THE CHECKFILE HELPER FUNTION HERE:  //check to see if a file exists at .data/[id] //if no, invoke callback(new Error)
  //if there is no error:
  //return an object {id: filename, text: contents of file}
};

exports.update = (id, text, callback) => {
  // //ORIGINAL
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }

  //REFACTORED
  //USE THE CHECKFILE HELPER FUNTION HERE:  //check to see if a file exists at .data/[id] //if no, invoke callback(new Error)
  //if yes, overwrite it with the new text, and invoke callback(null, {magic object})
};

exports.delete = (id, callback) => {
  // //ORIGINAL
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }

  //REFACTORED
  //USE THE CHECKFILE HELPER FUNTION HERE:  //check to see if a file exists at .data/[id] //if no, invoke callback(new Error)
  //if yes, delete the file. Probably use "fs.rm"

};

//HELPER FUNCTIONS

exports.checkFile = (id, callback) => {
  let filepath = path.join(exports.dataDir, id);
  if (fs.existsSync(filepath)) {
    return true;
  } else {
    return callback(new Error(`No item with id: ${id}`));
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data'); //creates a file path
//for my index.js file, __dirname is: /Users/anniejohnston/Documents/GitHub/hr-sfo138-cruddy-todo/datastore
//so now, exports.dataDir = /Users/anniejohnston/Documents/GitHub/hr-sfo138-cruddy-todo/datastore/data

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) { //if the "./data" directory/folder doesn't already exist
    fs.mkdirSync(exports.dataDir);        //then, create it
  }
};
