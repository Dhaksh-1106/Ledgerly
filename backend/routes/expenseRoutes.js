const express = require("express");
router = express.Router();

auth_middleware = require("../middleware/auth_middleware.js");
expenseController = require("../controllers/expenseController.js");

router.get("/expenses",auth_middleware,expenseController.getExpenses);
router.post("/expenses",auth_middleware,expenseController.addExpense);
router.delete("/expenses/:id",auth_middleware,expenseController.deleteExpense);
router.get("/analytics/summary",auth_middleware,expenseController.getSummary);

module.exports = router;