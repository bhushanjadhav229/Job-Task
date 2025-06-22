const axios = require("axios");
const xml2js = require("xml2js");
const Job = require("../models/Job"); 
const ImportLog = require("../models/ImportLog"); 

const importJobsFromUrl = async (url) => {
  const result = {
    fileName: url,
    totalFetched: 0,
    totalImported: 0,
    newJobs: 0,
    updatedJobs: 0,
    failedJobs: [],
    timestamp: new Date(),
  };

  try {
    const response = await axios.get(url);
    const json = await xml2js.parseStringPromise(response.data, { mergeAttrs: true });
    const jobs = json.rss?.channel?.[0]?.item || [];

    result.totalFetched = jobs.length;

    for (const job of jobs) {
      try {
        const jobId = job.guid?.[0]; 
        const existing = await Job.findOne({ jobId });

        if (existing) {
          await Job.updateOne({ jobId }, { $set: job });
          result.updatedJobs += 1;
        } else {
          await Job.create({ jobId, ...job });
          result.newJobs += 1;
        }

        result.totalImported += 1;
      } catch (err) {
        result.failedJobs.push({ error: err.message, job });
      }
    }

    await ImportLog.create(result);
    return result;

  } catch (error) {
    throw new Error("Job import failed: " + error.message);
  }
};

module.exports = { importJobsFromUrl };
