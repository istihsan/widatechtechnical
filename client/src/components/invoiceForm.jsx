import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Autocomplete,
  Grid,
  Box,
  Snackbar,
} from '@mui/material'
import axios from 'axios'
import currencyFormatter from '../hooks/useCurrencyFormatter'

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    salespersonName: '',
    date: '',
    notes: '',
    products: [],
  })

  const [productSuggestions, setProductSuggestions] = useState([])

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products')
        setProductSuggestions(response.data)
        console.log('Product Suggestions : ', response.data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setSnackbar({ open: true, message: 'Failed to load products.' })
      }
    }
    fetchProducts()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductChange = (event, newValue) => {
    console.log('New Value:', newValue)
    const updatedProducts = newValue.map((product) => ({
      ...product,
      quantity: 1,
    }))

    console.log('Selected Products:', updatedProducts)
    setFormData((prev) => ({ ...prev, products: updatedProducts }))
  }

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...formData.products]
    updatedProducts[index].quantity = quantity
    setFormData((prev) => ({ ...prev, products: updatedProducts }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (
        !formData.customerName ||
        !formData.salespersonName ||
        !formData.date ||
        formData.products.length === 0
      ) {
        setSnackbar({
          open: true,
          message: 'Please fill out all mandatory fields.',
        })
        return
      }

      await axios.post('http://localhost:5000/api/invoices', formData)
      setSnackbar({ open: true, message: 'Invoice created successfully!' })
      setFormData({
        customerName: '',
        salespersonName: '',
        date: '',
        notes: '',
        products: [],
      })
      console.log(formData)
    } catch (error) {
      console.error('Failed to create invoice:', error)
      setSnackbar({ open: true, message: 'Failed to create invoice.' })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Box sx={{ padding: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Name"
              name="customerName"
              fullWidth
              required
              value={formData.customerName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Salesperson Name"
              name="salespersonName"
              fullWidth
              required
              value={formData.salespersonName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              fullWidth
              required
              value={formData.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              fullWidth
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={productSuggestions}
              getOptionLabel={(option) =>
                `${option.name} - ${currencyFormatter(option.price)}`
              }
              value={formData.products}
              onChange={handleProductChange}
              renderInput={(params) => (
                <TextField {...params} label="Products" />
              )}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
            />
          </Grid>
          {formData.products.map((product, index) => (
            <Grid item xs={12} sm={6} key={product.id}>
              <TextField
                label={`Quantity of ${product.name}`}
                type="number"
                value={product.quantity || 1}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                inputProps={{ min: 1 }}
                fullWidth
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Create Invoice
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Box>
  )
}

export default InvoiceForm
