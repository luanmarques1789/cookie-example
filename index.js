const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
//app.use(bodyParser.urlencoded({ extended: true }));

console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	let accounts = [];
	if ('accounts' in req.cookies) {
		accounts = req.cookies.accounts;
	}
	res.render('index', { accounts });
});
app.post('/calc', (req, res) => {
	let { num1, num2, operation } = req.body;
	num1 = parseInt(num1);
	num2 = parseInt(num2);

	let result = 0;
	switch (operation) {
		case '+':
			result = num1 + num2;
			break;

		case '-':
			result = num1 - num2;
			break;

		case '*':
			result = num1 * num2;
			break;

		case '/':
			result = num1 / num2;
			break;

		default:
			break;
	}

	let accounts = [];
	if ('accounts' in req.cookies) {
		accounts = req.cookies.accounts;
	}
	accounts.push({ num1, num2, operation, result });

	// O cookie durará até o seu tempo definido expirar
	const maxAge = 600000; //  600.000 ms = 10 minutes

	res.cookie('accounts', accounts, { maxAge });
	res.redirect('/');
});

const port = process.env.PORT || 3010;
app.listen(port, () => console.log('Listening at port', port));
