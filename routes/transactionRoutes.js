const express = require("express");
const { addTransaction, getAllTransaction,editTransaction ,deleteTransaction} = require("../controllers/transactionController");


//router object
const router = express.Router();

//routes
//add transaction POST
router.post('/add-transaction',addTransaction)
//Edit transaction POST
router.post('/edit-transaction',editTransaction)
//Delete transaction POST
router.post('/delete-transaction',deleteTransaction)

//get Transactions
router.post('/get-transaction',getAllTransaction)

module.exports = router;
