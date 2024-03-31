/**
 * Name: Raul Contreras
 * ID: RAC326
 */
// Put your name and ID here 

const express = require("express");
const path = require("path");
const logger = require("morgan");//logger node extension


const app = express();
app.use(logger("dev")); //setting up the logger with morgan

//opening the top40.db using statement from better-sqlite3 github page
const db = require('better-sqlite3')('top40.db');
db.pragma('journal_mode = WAL');

app.use(express.static(
  path.resolve(__dirname, "public")
));

//router to retrieve a list of unique names and send them to the client
app.get("/artistList", (req, res) => {
  const artists = db.prepare('SELECT DISTINCT artist FROM songlist');
  const artistList = artists.all(); // Execute the prepared statement and fetch all rows

  console.log(artistList); // Log the result to the console
  res.json(artistList); // Send the result back to the client as JSON
});

app.listen(3000, () => console.log("Starting up Top 40 Search"));


