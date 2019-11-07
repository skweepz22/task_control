const express = require("express");
const app = express()
const router = express().router

// Set express json parser
app.use(expres.json({ extended: false }));

// Set API Routes
app.use('/api/tasks', require('./server/api/tasks'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));