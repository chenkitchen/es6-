module.exports = {
    devServer: {
      overlay: {
        warnings: true,
        errors: true
      },
      proxy:{
        '/api':{
            target:'http://192.168.1.105:3000/',
            changOrigin:true,
            pathRewrite:{
                '^/api': ''
            }
        }
      }
    }
  }