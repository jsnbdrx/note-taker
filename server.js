const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

//set up routes files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server on port ${PORT}`);
});