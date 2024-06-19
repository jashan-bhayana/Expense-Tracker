const { request } = require("http");
const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transactions = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });

    if (!transactions) {
      return res.status(404).json({ error: "No transactions found" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error in getAllTransaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await transactionModel.findOneAndDelete({ _id: req.body.transactionId });

    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTransaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Edit Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);

    // Validate input before saving
    const validationError = newTransaction.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.errors });
    }

    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
  } catch (error) {
    console.error("Error in addTransaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getAllTransaction, addTransaction, editTransaction , deleteTransaction};
