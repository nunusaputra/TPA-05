const express = require('express');
const main = express();
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

main.use(cookieParser());
main.use(express.json());
main.use(express.urlencoded({ 
    extended: true 
}));

const db = require('./connect');

db.then(() => {
	console.log('Database Terhubung');
}).catch((err) => {
	console.log(err);
});

main.get('/', (req, res) => {
	res.status(200).send('Hallo Selamat Datang, Namaku Wisnu')
});

main.use('/skilvul', require('./routes'));

main.listen(process.env.PORT, () => {
	console.log('server running on Port : ' + process.env.PORT);

})