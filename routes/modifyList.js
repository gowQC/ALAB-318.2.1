const express = require("express");
const router = express.Router();

// data variables
const todoList = require("../data/todo-list-array");

// http://localhost:3000/modifyList
router.route("/").get((req, res) => {
  res.render("Modify", { todoList });
});

module.exports = router;
