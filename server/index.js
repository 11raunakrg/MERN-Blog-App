const express = require("express");
const cors = require("cors");
require("./db/index.js");
require("dotenv").config();
const blogRouter = require("./route/blog-route.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

const port_num = process.env.PORT_NUMBER || 5000;

app.get("/", (req, res) => {
  res.send("This is backend");
});

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.listen(port_num, () => {
  console.log(`app is running at port ${port_num}`);
});
