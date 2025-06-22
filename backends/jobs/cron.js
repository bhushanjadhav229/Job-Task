const cron = require("node-cron");
const jobQueue = require("../queues/jobQueue");

cron.schedule("0 * * * *", async () => {
  console.log("Queueing job fetch");
  await jobQueue.add("import-jobs", {});
});
