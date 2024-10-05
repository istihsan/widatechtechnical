const Invoice = require('../models/invoice')

const products = [
  {
    id: 1,
    name: 'Product A',
    price: 100000,
    stock: 100,
    pictureUrl: 'http://example.com/product-a.jpg',
  },
  {
    id: 2,
    name: 'Product B',
    price: 150000,
    stock: 200,
    pictureUrl: 'http://example.com/product-b.jpg',
  },
  {
    id: 3,
    name: 'Product C',
    price: 200000,
    stock: 150,
    pictureUrl: 'http://example.com/product-c.jpg',
  },
  {
    id: 4,
    name: 'Product D',
    price: 250000,
    stock: 100,
    pictureUrl: 'http://example.com/product-c.jpg',
  },
]

exports.createInvoice = async (req, res) => {
  try {
    const {
      customerName,
      salespersonName,
      date,
      notes,
      products: invoiceProducts,
    } = req.body

    if (!customerName || !date || invoiceProducts.length === 0) {
      console.log(invoiceProducts.length)
      return res
        .status(400)
        .json({ error: 'Customer name, date, and products are required.' })
    }

    let totalAmount = 0

    invoiceProducts.forEach((product) => {
      const foundProduct = products.find((p) => p.id === product.id)
      if (!foundProduct || !product.quantity) {
        throw new Error(
          'Each product must exist in the catalog and have a quantity.'
        )
      }
      totalAmount += foundProduct.price * product.quantity
    })

    const invoice = await Invoice.create({
      customerName,
      salespersonName,
      date,
      notes,
      totalAmount,
    })
    res.status(201).json(invoice)
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: 'Failed to create invoice', details: err.message })
  }
}

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll()
    res.status(200).json(invoices)
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: 'Failed to fetch invoices', details: err.message })
  }
}

exports.getAllProducts = (req, res) => {
  res.status(200).json(products)
}
