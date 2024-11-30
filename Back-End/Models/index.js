const mongoose = require("mongoose");
const dbConfig = require("../Config/config");

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("Database connection error:", err);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error("Error in Mongoose connection: ", err);
});

module.exports = {
  mongoose,
  User: require("./user.model")(mongoose),
  Profile: require("./profile.model")(mongoose),
  Resonator: require("./resonator.model")(mongoose),
};
