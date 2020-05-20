// 配置类
const DEV = true //配置是否是开发环境
const serverUrl = '.......' //服务器地址

const config={
    port:'8413',
    mysql:{
        database:'admin',//数据库名称
        user:'root',//mysql用户名
        password:'root',//服务端密码
        port:'3306',//mysql端口号
        host:''//服务器ip
    },
    // 跨域地址
    origunUrl: DEV ? 'http://localhost:3000' : serverUrl
}

module.exports=config