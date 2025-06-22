const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true },
  title: String,
  description: String,
  pubDate: String,
  link: String,
});

module.exports = mongoose.model("Job", jobSchema);
