const express = require('express')
const router = express.Router()
const invoiceController = require('../controllers/invoiceController')
const revenueController = require('../controllers/revenueController')

router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`)
  next()
})

router.post('/invoices', invoiceController.createInvoice)
router.get('/invoices', invoiceController.getAllInvoices)
router.get('/products', invoiceController.getAllProducts)
router.get('/revenue', revenueController.getRevenue)

module.exports = router
