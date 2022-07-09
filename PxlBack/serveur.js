const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const userRoutes = require("./routes/user.routes");
const userPostRoutes = require("./routes/userPost.routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {
  checkUserConnected,
  requireAuth,
} = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: process.env.FRONT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(express.static("profile"));
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
app.use("/api/post", userPostRoutes);

// serveur
app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
