# Invoice Management System

## Overview

This project is a web-based Invoice Management System that allows users to create, view, and manage invoices. The application is built using React for the front end, Node.js for the backend, and Sequelize for database interactions. It includes features like adding products to invoices, tracking revenue over time.

## Features

- **Create Invoices**: Add customer details, salesperson name, products, and quantities to generate invoices.
- **View All Invoices**: List all invoices with pagination support.
- **Revenue Time Frame**: View revenue data over time (Monthly, Weekly, Daily) in a graphical format using a line chart.
- **Autocomplete Product Selection**: Quickly add products to invoices using a dropdown with search functionality.

## Technologies Used

### Frontend:

- React
- Material UI for UI components
- Chart.js for revenue graphs

### Backend:

- Node.js with Express.js
- Sequelize ORM with PostgreSQL

### Dependencies:

- axios for making HTTP requests
- chart.js for visualizing revenue data

## Installation

To get started, follow these steps:

### Clone the Repository:

git clone https://github.com/istihsan/widatechtechnical.git

**Install Backend Dependencies**:  
`cd server && npm install`

**Configure the Database**:  
Create a `.env` file in the `server` directory and set the following environment variables:

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_DIALECT=postgres
PORT=5000
```

**Start Backend**:  
`npm start`
The backend server will run at http://localhost:5000.

**Install Frontend Dependencies**:
`cd client && npm install`

**Run Frontend**:  
`npm start`
The backend server will run at http://localhost:3000.

## API Endpoints

### Invoices

- **GET /api/invoices**

  - Description: Retrieve a list of invoices with pagination.
  - Query Parameters:
    - `page` (optional): Page number (default is 1).
    - `limit` (optional): Number of items per page (default is 10).
  - Response: Returns an array of invoices with pagination details.

- **POST /api/invoices**
  - Description: Create a new invoice.
  - Request Body:
    - `customerName` (string, required): Name of the customer.
    - `salespersonName` (string, required): Name of the salesperson.
    - `date` (string, required): Date of the invoice.
    - `notes` (string, optional): Additional notes.
    - `products` (array, required): List of products, each with `id` and `quantity`.
  - Response: Returns the created invoice.

### Revenue

- **GET /api/revenue**
  - Description: Retrieve revenue data for chart visualization.
  - Response: Returns an array of revenue data, each with `date` and `revenue`.

### Products

- **GET /api/products**
  - Description: Retrieve the list of available products for invoice creation.
  - Response: Returns an array of available products, each with details like `name`, `price`, `stock`, and `pictureUrl`.
