export default{
    install(Vue){
        Vue.prototype.clickEnter = function(e,method){
            let key = e.keyCode;
            if(key === 13){
                method();
            }
        }
    }
}