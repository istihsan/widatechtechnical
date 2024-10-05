import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InvoiceForm from './components/invoiceForm';
import InvoiceList from './components/invoiceList';
import RevenueChart from './components/revenueChart';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Invoice Management System
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Create Invoice
          </Button>
          <Button color="inherit" component={Link} to="/invoices">
            View Invoices
          </Button>
          <Button color="inherit" component={Link} to="/revenue">
            View Revenue
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<InvoiceForm />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/revenue" element={<RevenueChart />} />
      </Routes>
    </Router>
  );
};

export default App;
