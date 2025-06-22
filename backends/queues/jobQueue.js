const { Queue } = require("bullmq");
const Redis = require("ioredis");

const redisConnection = new Redis();

const jobQueue = new Queue("job-import-queue", {
  connection: redisConnection,
});

module.exports = jobQueue;
