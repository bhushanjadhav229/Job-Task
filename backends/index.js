const express = require("express");
const cors = require("cors");
const jobRoutes = require("../backends/routes/jobRoutes")
const env=require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes); 

app.listen(4000, () => {
  console.log("Server running on port 4000");
  mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connected to MongoDB"))
.catch((err) => console.error(" MongoDB connection error:", err));
});
