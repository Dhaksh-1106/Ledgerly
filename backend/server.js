const express = require("express");
const path = require("path");
const auth_router = require("./routes/authRoutes");
const expense_router = require("./routes/expenseRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname,"..","frontend","static")));

app.use("/api/auth",auth_router);
app.use("/api",expense_router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});