const Expense = require('../models/Expense');
const User = require('../models/User');

const getUserId = (req) => req.userId || req.user?.userId || req.user?.id;

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: getUserId(req) }).sort({ date: -1 });
    return res.json(expenses);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, userId: getUserId(req) });
    return res.status(201).json({ success: true, data: expense });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: getUserId(req) });
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found.' });
    return res.json({ success: true, message: 'Resource successfully removed from persistent indexes.' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const now = new Date();
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
    const userId = getUserId(req);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const totals = await Expense.aggregate([
      { $match: { userId: user._id, date: { $gte: start, $lt: end } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
    ]);

    const categories = ['Food', 'Rent', 'Utilities', 'Entertainment', 'Transport', 'Other'];
    const categoricalBreakdown = Object.fromEntries(categories.map((category) => [category, 0]));
    for (const item of totals) categoricalBreakdown[item._id] = item.total;

    const totalSpent = Object.values(categoricalBreakdown).reduce((sum, amount) => sum + amount, 0);
    return res.json({
      totalSpent,
      monthlyBudget: user.monthlyBudget,
      remainingAllowance: user.monthlyBudget - totalSpent,
      budgetExceeded: totalSpent > user.monthlyBudget,
      categoricalBreakdown,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getExpenses, addExpense, deleteExpense, getSummary };
