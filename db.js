const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');

db = low(adapter);

db.defaults({
   books: [],
   sessions: [],
   transfers: []
 })
  .write();

module.exports = db;