const app = require("./app");
const connectDB = require("./config/dataBase");

connectDB();

app.listen("4000", () => {
  console.log(`Server is working on http://localhost:4000`);
});
