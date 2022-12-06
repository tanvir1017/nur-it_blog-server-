const mongoose = require("mongoose");

// info DOTENV FILE ACCESS
const DB = process.env.DB;

mongoose.set("strictQuery", false);

// TODO : CONNECTION WITH MONGODB ATLAS
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => {
    console.log(err);
  });
