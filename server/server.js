const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize, connectDB } = require('./config/database')
const invoiceRoutes = require('./routes/invoiceRoute')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`)
  next()
})

app.use('/api/', invoiceRoutes)

const startServer = async () => {
  await connectDB()
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('Database connected and synchronized')
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
      })
    })
    .catch((err) => console.error('Unable to connect to the database:', err))
}

startServer()
