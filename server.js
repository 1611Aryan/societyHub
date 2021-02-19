const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

const url = process.env.ATLAS_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => console.log("Database is Connected"));
app.use(express.json());

const postRouter = require("./routes/post");
const societyRouter = require("./routes/society");
app.use("/post", postRouter);
app.use("/society", societyRouter);

app.use(express.static(path.join(__dirname, "client/build")));
app.use("/societies", express.static(path.join(__dirname, "client/build")));
app.use("/create-post", express.static(path.join(__dirname, "client/build")));
app.use("/add-society", express.static(path.join(__dirname, "client/build")));

app.listen(port, () => console.log(`Server Running on port ${port}`));
