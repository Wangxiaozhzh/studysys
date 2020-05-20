// 路由类
const Router = require('koa-router');

const Student = require('./student');
const Course =  require('./course');
const Interview = require('./interview');
const Teacher = require('./teacher');
const Config = require('../config/index')

const Routes = new Router({
	prefix: Config.prefix
});


//创建接口

Student.routes.forEach(e => {
	Routes[e.methods](Student.name + e.path, e.realize);
});

Course.routes.forEach(e => {
	Routes[e.methods](Course.name + e.path, e.realize);
});
Interview.routes.forEach(e => {
	Routes[e.methods](Interview.name + e.path, e.realize);
});
Teacher.routes.forEach(e=>{
	Routes[e.methods](Teacher.name+e.path,e.realize);
})

module.exports = Routes;