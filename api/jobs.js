const axios = require("axios");
const moment = require("moment");

module.exports = async (req, res) => {
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
    res.status(500).json({ message: "Internal Server Error", error: JSON.stringify(error) });
  }
};
