/*
 * @Author: kongds
 * @Date: 2019-08-17 15:25:40
 */
let request = {
    get url(){
        // 需要操作原生的req属性
        return this.req.url
    }
}
module.exports = request;