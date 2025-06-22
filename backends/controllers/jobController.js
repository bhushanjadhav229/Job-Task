const ImportLog = require("../models/ImportLog");

const queueJobImport = async (req, res) => {
  const { sourceUrl } = req.body;

  return res.status(200).json({
    message: `Simulated import from ${sourceUrl}`
  });
};

const getImportHistory = async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(10);
    return res.status(200).json(logs);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch history.",
      error: err.message
    });
  }
};

module.exports = {
  queueJobImport,
  getImportHistory
};
