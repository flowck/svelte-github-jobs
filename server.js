const express = require("express");
const moment = require("moment");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public")));

// Proxy route to the Github's Job API

// This is a temporary condition while in development :) 
if (process.env.NODE_ENV == "development") {
  app.get("/jobs", async (req, res) => {
    try {
      const BASE_URL = "https://jobs.github.com/positions.json";
      if (fs.existsSync(__dirname + "/jobs.json")) {
        const data = fs.readFileSync(__dirname + "/jobs.json", { encoding: "utf8" });
        res.json(JSON.parse(data));
      } else {
        const { query } = req;
        const searchParams = query.description || query.location
          ? `?page=${query.page}&description=${query.description}&location=${query.location}`
          : `?page=${query.page}`;
        const response = await axios.get(`${BASE_URL}${searchParams}`);
        const jobs = response.data.map(job => {
          job.created_at = moment(new Date(job.created_at)).fromNow();
          return job;
        });
        fs.writeFileSync(__dirname + "/jobs.json", JSON.stringify({ jobs: jobs }), { encoding: "utf8" });

        res.json({ jobs });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

} else {
  app.get("/jobs", async (req, res) => {
    try {
      const BASE_URL = "https://jobs.github.com/positions.json";
      const { query } = req;
      const searchParams = query.description || query.location
        ? `?page=${query.page}&description=${query.description}&location=${query.location}`
        : `?page=${query.page}`;
      const response = await axios.get(`${BASE_URL}${searchParams}`);
      const jobs = response.data.map(job => {
        job.created_at = moment(new Date(job.created_at)).fromNow();
        return job;
      });
  
      res.json({ jobs });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}

// Serve the application static content
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "/public/index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("JOBS API is being listened to the port: ", PORT)
});