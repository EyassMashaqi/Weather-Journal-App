
const express = require("express");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); 

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

let projectData = {};
app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/add", (req, res) => {
  const { temp, date, feel } = req.body;
  const tempInCelsius = temp - 273.15; 
  projectData = { temp: tempInCelsius, date, feel }; 
  res.send({ message: "Data saved successfully!" });
});
