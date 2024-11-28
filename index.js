const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const jsxViewEngine = require("jsx-view-engine"); // using jsx view engine for views, terminal installation command: npm i jsx-view-engine

// routes variables
const todoList = require("./routes/todoList");
const modifyList = require("./routes/modifyList");
const downloadButton = require("./routes/downloadButton");

// third party middleware variables
const methodOverride = require("method-override"); // npm install method-override
const bodyParser = require("body-parser"); // npm install body-parser

// import routes and middleware variables we just created
app.use("/todoList", todoList);
app.use("/modifyList", modifyList);
app.use("/downloadButton", downloadButton);
app.use(bodyParser.urlencoded({ extended: true })); // handles form submissions
app.use(bodyParser.json({ extended: true }));
app.use(methodOverride("_method"));

// views
app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

app.use((req, res, next) => {
  console.log("I run from all middleware.");
  next();
});

app.get("/", (req, res) => {
  res.send(
    "The root. Basically our starting point. Try adding '/help' to the end of this URL..."
  );
});

app.get("/help", (req, res) => {
  res.render("Help");
});

app.use((req, res) => {
  console.log(
    "Error: This error only displays if all other routes were unable to respond."
  );
  res.status(404).json({ error: "Resource not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
