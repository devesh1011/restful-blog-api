const express = require("express");
const blogRoutes = require("./routes/blog.js");

const app = express();

app.use("/api", blogRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("listening to server");
});
