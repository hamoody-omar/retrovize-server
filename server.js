const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");

const user = require("./routes/api/user");
const profile = require("./routes/api/profile");
const host = require("./routes/api/host");
const listings = require("./routes/api/listings");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MangoDB
mongoose
  .connect(db, { useFindAndModify: false })
  .then(() => console.log("MangoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/host", host);
app.use("/api/listings", listings);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
