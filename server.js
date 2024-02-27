const express = require("express");

const app = express();

app.listen(process.env.PORT, (req, res) => {
    console.log("listening to server")
});
