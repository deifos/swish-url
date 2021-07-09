const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json({ extend: false }));

app.use('/api/url', require('./routes/url.routes'));
app.use('/', require('./routes/redirect'));
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => console.log(`server running on port ${PORT}`));