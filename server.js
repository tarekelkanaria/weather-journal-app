// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
// dependencies
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`server is working on localhost:${port}`);
});

// get route return the JS object
app.get("/all", (req, res) => {
  res.send(projectData);
});

//post route to receive new entry and save it to js object
app.post("/add", (req, res) => {
  newEntry = {
    temp: req.body.temp,
    feel: req.body.feel,
    date: req.body.date,
  };
  res.send(newEntry);
  projectData = req.body;
  console.log(projectData);
});
