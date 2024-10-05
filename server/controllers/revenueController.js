const Invoice = require('../models/invoice');

exports.getRevenue = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    const revenueData = invoices.map(invoice => ({
      date: invoice.date,
      revenue: invoice.totalAmount,
    }));
    res.status(200).json(revenueData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
};
