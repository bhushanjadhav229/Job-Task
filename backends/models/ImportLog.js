const mongoose = require("mongoose");

const importLogSchema = new mongoose.Schema({
  fileName: String,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Array,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ImportLog", importLogSchema);
