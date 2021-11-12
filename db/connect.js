const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(
        'mongodb://localhost/DBCourses',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('Error connecting to database');
    }) 
}

module.exports = connectDB