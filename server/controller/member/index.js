const Router = require('koa-router')
const router = new Router()
const curl = require('superagent')
const sendMail = require('../../utils/sendMail')
const tools = require('../../utils/tools')
/**
 * @desc 發送用戶註冊驗證碼接口
 * @point 
 */
router.post('/validCode', async (ctx) => {
    const email = ctx.request.body.email
    const code = Math.random().toString().substring(3, 9)//取3-9共6位
    const subject = `✔ 驗證碼 ${code}`
    const content = `您的註冊驗證碼 ${code}`
    ctx.session.validCode = code
    let msg = '驗證碼已寄送到您輸入的信箱'
    await sendMail(email, subject, content, (err, info) => {
        if(err) {
            msg = '寄送郵件發生錯誤,請聯繫系統管理員'
            throw err
        }        
    })
    ctx.status = 200
    ctx.body = msg
})

/**
 * @desc 驗證用戶註冊驗證碼接口
 * 
 */
router.post('/checkValidCodeAndtaxId', async (ctx) => {
    tools.isEmpty(ctx.request.body.validCode) && ctx.throw(400, 'CheckValidCode Without-- ValidCode')
    tools.isEmpty(ctx.request.body.company) && ctx.throw(400, 'ValidCode Without-- CompanyName')
    tools.isEmpty(ctx.request.body.taxid) && ctx.throw(400, 'ValidCode Without-- CompanTaxId')

    const code = ctx.request.body.validCode
    const company = ctx.request.body.company
    const taxid = ctx.request.body.taxid
    
    if(ctx.session.validCode !== code) return ctx.body = { resCode:800400 }
    const validUrl = `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq ${taxid}&$skip=0&$top=50`
    
    const { body } = await curl.get(validUrl)
    if(tools.isEmpty(body)) return ctx.body = { resCode:801400 }    
    if(!tools.isEmpty(body) && body[0].Company_Name != company) return ctx.body = { resCode:802400 }
    
    try { 
        const dbUrl = `${process.env.EGG_API_URL}/shop/member/register`
        const { body } = await curl.post(dbUrl).send(ctx.request.body)
        ctx.body = body
    }
    catch(err) {
        ctx.app.emit('error', err, ctx);
        ctx.body = { resCode: 90500 }
    }
})



module.exports = router.routes();