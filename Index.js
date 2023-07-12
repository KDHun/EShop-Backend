require('dotenv').config();
const CustomerRoutes = require('./routes/CustomerRoute');
const EmployeeRoute = require('./routes/EmployeeRoute');
const ItemRoute = require('./routes/ItemRoute');
const BillRoute = require('./routes/BillRoute');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL || 'mongodb+srv://hunkarabhai:Karabhai007@cluster0.08t8mfi.mongodb.net/Database';
const cors = require('cors');
const LoginRoute = require('./routes/LoginRoute'); 


mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
app.use(cors());
app.use('/', CustomerRoutes);
app.use('/', EmployeeRoute);
app.use('/', BillRoute);
app.use('/', ItemRoute);
app.use('/', LoginRoute);
