//See https://www.npmjs.com/package/nodemailer-mailgun-transport
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const auth = {
    auth: {
        api_key: process.env.MAILAPIKEY,
        domain: process.env.MAILDOMAIN
    },
}
const transport = nodemailer.createTransport(mg(auth))

module.exports = async (toEamil, subject, constent, callback) => {
    const mailOption = {
        from:'"stationeryhub.net"<s922983361@gamil.com>',
        to:toEamil,
        subject: subject,
        html: constent,
    }
    transport.sendMail(mailOption, (err, info) => {
        if(err) {
            callback(err, null)
        } else {
            callback(null, info)
        }
    })
}