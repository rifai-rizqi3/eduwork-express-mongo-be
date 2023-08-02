const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://rifairizqi3:Ux8Uks8YpCl1O81f@cluster0.aptfhkp.mongodb.net/?retryWrites=true&w=majority"
);

(async () => {
  try {
    await client.connect();
    console.log("connection success.");
  } catch (error) {
    console.log(error);
  }
})();

const db = client.db("eduwork-native");

module.exports = db;
