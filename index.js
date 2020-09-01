const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());

app.use('/', require('./routes/page'));
app.use('/user', require('./routes/user'));

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
