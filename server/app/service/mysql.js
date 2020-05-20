//数据库服务
const mysql = require('mysql');
const Config = require('../../config/index');

// 数据库配置
const con = Config.mysql;


const pool = mysql.createPool(con);

// 直接使用连接池
const query = (_sql, sqlParams, params) => {
	sql = mysql.format(_sql, sqlParams)
	return new Promise((resolve, reject) => {
		pool.query(sql, params, (err, result) => {
			if (err) reject(err)
			resolve(result)
		})
	})
}


module.exports = query;
