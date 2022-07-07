const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@pxl.dw5jtnj.mongodb.net/PxlProject",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Fail to connect to MongoDB " + err);
  });
