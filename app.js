const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const globalError = require('./controllers/errorController');
const globalVal = require('./utlis/localVal');
const viewRoute = require('./routes/viewRoute');
const usersRoute = require('./routes/userRoute');
const catesRoute = require('./routes/cateRoute');
const productRoute = require('./routes/productRoute');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

// app.use((req, res, next) => {
//     res.locals.user = req.user | null;
//     next();
// })
app.use(globalVal);

app.use('/api/v1/user', usersRoute)
app.use('/', viewRoute)
app.use('/api/v1/category', catesRoute)
app.use('/api/v1/products', productRoute)

app.use(globalError);

module.exports = app;