const express = require("express");
const app = express();
const auth_router = require("./routes/authRoutes");
const expense_router = require("./routes/expenseRoutes");
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.static("C:\\Users\\Dhaksh\\Desktop\\Dhaksh\\Ledgerly\\frontend\\static"));

app.use("/api/auth",auth_router);
app.use("/api",expense_router);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});