/* eslint-disable */
const express = require("express");
const app = express();

app.get("/up", (req, res) => {
  res.status(200).json({ message: "yay" });
});

app.listen("3000", () => {});
