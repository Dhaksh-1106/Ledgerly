const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Rent', 'Utilities', 'Entertainment', 'Transport', 'Shopping', 'Health', 'Other'],
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 250,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
