export default {
    login(username: string, password: string) {
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve({ username, password })
                } else {
                    reject('登录失败')
                }
            }, 1000)
        })
    },
    storeItem(key: string, value: string) {
        localStorage.setItem(key, value)
    },
    clearItem() {
        localStorage.removeItem('token')
    }
}
