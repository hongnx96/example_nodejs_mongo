const express = require('express')

const logger = require('morgan')

const mainRoutes = require('./server/routes/main')
const connectDB = require('./db/connect');

const app = express()
const port = 3000

app.use(express.json())
app.use(logger('dev'))


connectDB()

app.use('/api', mainRoutes)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Project Support',
    })
})

app.listen(port, (req, res) => {
    console.log(`Our server is live on ${port}. Yay!`);
})

