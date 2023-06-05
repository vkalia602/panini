const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./ChatApp.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(function() {
    // Create a table
    db.run("CREATE TABLE IF NOT EXISTS Foo (id INTEGER PRIMARY KEY, name TEXT)");
    // Insert data into the table
    db.run("INSERT INTO Foo (name) VALUES ('bar')");
   });

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});