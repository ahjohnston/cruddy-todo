const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  var id = counter.getNextUniqueId();
  items[id] = text;
  callback(null, { id, text });
};
//callback "null" parameter indicates that there is no error


//instead of saving new to-do items in the items object, we're going to:
//using path.join(datadir, id), create a file path in the "./data" directory (which is created in "initialize" at the bottom)
//to create a new file: fs.writeFile(file, data[, options], callback)
//file: the file path we just created, which points to a file with the 'id' as file name
//data: the "text" parameter
//callback: what should we use?? Does this come from the ajax request in "todo.js"
//from nodejs.org: It is unsafe to use fs.writeFile() multiple times on the same file without waiting for the callback. For this scenario, fs.createWriteStream() is recommended.



exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
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
