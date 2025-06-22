const { Worker } = require("bullmq");
const jobService = require("../services/jobService");
const Redis = require("ioredis");

const redisConnection = new Redis();

const jobWorker = new Worker(
  "job-import-queue",
  async (job) => {
    const { url } = job.data;
    await jobService.importJobsFromUrl(url);
  },
  { connection: redisConnection }
);

jobWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

jobWorker.on("failed", (job, err) => {
  console.error(` Job ${job.id} failed: ${err.message}`);
});
