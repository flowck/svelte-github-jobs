import axios from "axios";

/**
 * getJobs
 * @param {Number} page
 * @param {String} description
 * @param {String} location
 * @returns {Promise}
*/
export function getJobs(page = 1, description, location, fullTime) {
  return new Promise(async (resolve, reject) => {
    try {
      let BASE_URL = "https://svelte-github-jobs.now.sh/api/jobs";

      if (window.location.hostname === "localhost") {
        BASE_URL = "http://localhost:5001/jobs";
      }

      const query = description || location || fullTime
        ? `?page=${page}&description=${description}&location=${location}&full_time=${fullTime}`
        : `?page=${page}`;

      const response = await axios.get(`${BASE_URL}${query}`);
    
      resolve(response.data.jobs);
    } catch(error) {
      reject(error);
    }
  });
}
