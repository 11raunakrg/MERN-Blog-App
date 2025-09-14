const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@mycluster.v7zkqnc.mongodb.net/`
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Error:", err));
