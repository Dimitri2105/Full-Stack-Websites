const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const sequelize = require('./database/database')

const rootDir = require('./util/path')

var cors = require('cors')

const userRoute = require('./routes/routes')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use(userRoute)

// app.get('/',(req,res) => {
//     res.sendFile(path.join(rootDir, 'views', 'Booking Appoinment.html'));
// })

sequelize
.sync()
.then(result => {
    app.listen(3000,() => {
        console.log('Server is listening on port 3000');
    })
})
