const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const userRoutes = require("./routes/user.routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {
  checkUserConnected,
  requireAuth,
} = require("./middleware/auth.middleware");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("*", checkUserConnected);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);

// serveur
app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
