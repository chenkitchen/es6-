const koa = require('koa')
const router = require('koa-router')
const app = new koa()
const Router = new router()
 
app.use(Router.routes())
 
Router.get('/getData', async (ctx, next) => {
  await responseData()
  ctx.body = {
    code: 0,
    message: 'success'
  }
})
 
async function responseData () {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve()
    }, 3000)
  })
}
 
app.listen(3000, () => {
  console.log('server is running at 3000')
})

