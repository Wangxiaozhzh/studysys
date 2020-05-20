// 面试相关路由

const Interview = require('../app/controller/interview.js');

const InterviewRouter =  {
	name: '/inter', // 命名空间
	routes: [
        {methods: 'post', path: '/addInterview', realize: Interview.addInterview}, // 新增面试
        {methods: 'post', path: '/findInterviewsByMonth', realize: Interview.findInterviewsByMonth}, // 通过月份查询面试列表
		{methods: 'get', path: '/deleteInterview', realize: Interview.deleteInterview}, // 根据id删除面试记录
		{methods: 'get', path: '/findNextInterview', realize: Interview.findNextInterview}, // 查询最近的面试
		
	]
};

module.exports = InterviewRouter; 
