const R = require('../app/service/response')
const whiltList = [
    "/teacher/teaLogin"
]
// 登录检查
const loginCheck =async (ctx,next)=>{
    if(whiltList.includes(ctx.url)){
        await next()
    }else{
        if(!ctx.session.token || !ctx.header.token || (ctx.session.token !== ctx.header.token)){
            R.error(555,ctx.header.token,ctx)
        }else{
            await next()
        }
    }
}

module.exports=loginCheck;