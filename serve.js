const koa = require('koa')
const router = require('koa-router')
const app = new koa()
const Router = new router()
 
app.use(Router.routes())
 
Router.get('/getData', async (ctx, next) => {
  await responseData(3000)
  ctx.body = {
    code: 0,
    message: 'success'
  }
})
 
Router.get('/getRandomData', async (ctx, next) => {
  await responseData(Math.random()*1000)
  ctx.body = {
    code: 0,
    message: 'random success'
  }
})
async function responseData (mytime) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve()
    }, mytime)
  })
}
 
app.listen(3000, () => {
  console.log('server is running at 3000')
})

