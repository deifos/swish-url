const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json({ extend: false }));

// app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url.routes'));
app.use('/', require('./routes/redirect'));
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));