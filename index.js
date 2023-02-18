const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const connectDB = require('./backend/config/mongoDB');
const dotenv = require("dotenv");
const userRoutes = require('./backend/routes/userRoutes');
const transactionRoutes = require('./backend/routes/transactionRoutes');

// config dot env file
dotenv.config();

//database call
connectDB();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});