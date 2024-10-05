import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvoices } from '../redux/slices/invoiceSlice'
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material'
import currencyFormatter from '../hooks/useCurrencyFormatter'

const InvoiceList = () => {
  const dispatch = useDispatch()
  const { invoices, status, error } = useSelector((state) => state.invoices)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    dispatch(fetchInvoices())
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>{error}</p>

  const totalPages = Math.ceil(invoices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInvoices = invoices.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {paginatedInvoices.map((invoice) => (
          <Grid item xs={12} sm={6} md={4} key={invoice.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Customer: {invoice.customerName}
                </Typography>
                <Typography>Salesperson: {invoice.salespersonName}</Typography>
                <Typography>
                  Total Amount: {currencyFormatter(invoice.totalAmount)}
                </Typography>
                <Typography>Notes: {invoice.notes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography sx={{ margin: '0 16px' }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default InvoiceList
