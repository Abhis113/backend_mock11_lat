
const mongoose = require("mongoose");

const connectionTodatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((data) => {
        console.log(`mongodb connected to srevr:${data.connection.host}`);
      })
}

module.exports = connectionTodatabase;
