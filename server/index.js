require("dotenv").config();
const express = require("express");
const routes = require("./routes/route");
const connectDB = require("./connectDB/ConnectDb");
const cors = require("cors");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", routes); 


app.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});

module.exports = app;





const testRoutes = require("./routes/TestRoute");
app.use("/api/test", testRoutes);
