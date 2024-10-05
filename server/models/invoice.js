const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salespersonName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Invoice;
