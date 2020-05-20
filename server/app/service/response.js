// 返回处理服务


const ResponseService = {
    /**
     * 
     *  成功
     * 
     */
    success: function (data, ctx) {
        ctx.response.body = {
            code: 0,
            datas: data,
            message: ''
        }
    },
	/*
	*  错误
	* */
	error: function (errType, errMsg, ctx) {
        switch (errType) {
            case 1:
                errMsg = '缺少参数：' + errMsg
                break;
            case 2:
                errMsg = '用户名已经存在：' + errMsg
                break;
            case 3:
                errMsg = '找不到课程: ' + errMsg
                break; 
            case 4:
                errMsg = '找不到学生: ' + errMsg
                break; 
            case 5:
                errMsg = '账号或密码错误！' + errMsg
                break; 
            case 6:
                errMsg = '原始密码错误！' + errMsg
                break; 
            case 555:
                errMsg = '登录失效：' + errMsg
                break;
            default:
                errMsg = '出错啦！'
        }
		ctx.response.body = {
            code: errType,
            error: true,
            message: errMsg
        }
    },
};

module.exports = ResponseService;


