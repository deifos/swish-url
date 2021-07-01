const express = require('express');
const db = require('./config/dbconfig');
const app = express();

app.use(express.json({ extend: false }));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url.routes'));

const PORT = 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));