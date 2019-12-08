export function read(filename: string, callback: any) {
    setTimeout(function() {
        callback(null, filename)
    }, 3000)
}
export function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('sucessful' + ms)
        }, ms)
    })
}
