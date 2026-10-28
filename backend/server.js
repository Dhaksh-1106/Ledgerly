const express = require("express");
const app = express();
const auth_router = require("./routes/authRoutes");
const expense_router = require("./routes/expenseRouter")

app.use(express.json());

app.use("/api/auth",auth_router);
app.use("/api",expense_router);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});