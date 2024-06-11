let dbConnect = (cb) => {
  const mongoose = require('mongoose');

  mongoose.set("strictQuery", false)

  mongoose.connect(`mongodb+srv://Admin:marti08139110216@cryptoclone.lyxoe8e.mongodb.net/retryWrites=true&w=majority`).then(() => {
    console.log("connection successful");
    cb()
  }).catch((error) => {
    console.log(error);
  });

}

module.exports = dbConnect


