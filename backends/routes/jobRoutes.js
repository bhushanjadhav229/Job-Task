const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.post("/import", jobController.queueJobImport);
router.get("/history", jobController.getImportHistory); 

module.exports = router;
