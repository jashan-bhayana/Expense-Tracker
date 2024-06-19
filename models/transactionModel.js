
const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema(
  {
    userid:{
   type:String,
   required: true, 
    },
    amount: {
      type: Number,
      required: [true, "amount is req"],
    },
    category: {
      type: String,
      required: [true, "category is req"],
    },
    type: {
      type: String,
      required: [true, "type is req"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "description is req"],
    },
    date: {
      type: Date,
      required: [true, "date is req"],
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model('transactions',transactionSchema)

module.exports = transactionModel;