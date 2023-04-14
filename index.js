const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { router, verifyToken } = require('./routes/Authentication');
app.use('/auth', router);

const productRoutes = require('./routes/Products');
app.use('/products', verifyToken, productRoutes);

app.get('/panel.html', verifyToken, (req, res) => {
  res.sendFile(__dirname + '/public/panel.html');
});

app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})