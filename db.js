const mongoose = require("mongoose");

// Use environment variables to set your MongoDB URI
const mongoDBURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/recipes/recipes";

async function createDbConnection() {
  try {
    await mongoose.connect(mongoDBURI); // No options needed for MongoDB driver v4+
    console.log("Connection established");

    // Event listeners for connection events
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

module.exports = {
  createDbConnection,
};

// const mongoose = require("mongoose");

// const mongoDBURI = "mongodb://localhost:27017/recipes";

// async function createDbConnection() {
//     try {
//         await mongoose.connect(mongoDBURI);
//         console.log("connection established");
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// module.exports = {
//     createDbConnection,
// };
