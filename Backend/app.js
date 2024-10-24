const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const RuleRoutes=require('./routes/RuleRoutes');

const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
const dotenv=require('dotenv');
dotenv.config();

const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(
    ()=>{
        console.log("Connected to db");
    }
);

app.use('/api',RuleRoutes);

app.listen(port, () => {
  console.log(`Rule Engine API listening at http://localhost:${port}`);
});