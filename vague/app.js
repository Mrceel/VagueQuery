const express = require('express');
// const bodyparser = require('body-parser');
const mysql = require('mysql');
const app = express();
const router = express.Router();

app.use(express.urlencoded({}));

let pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'root',
	database:'query',
	port:3306
})

// 设置为可跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/login',(req,res)=>{
	var value = req.query.val;
	console.log(req.query)
	pool.query(`SELECT * FROM students where name like '%${value}%'`, (qerr,vals,fields)=>{
		console.log(vals)
		let rows = JSON.stringify(vals);
		res.send(rows)
	})	
})

app.use(express.static('./'))

app.listen(8001,() => {
	console.log('ok');
})