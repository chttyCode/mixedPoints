function deepProxy(obj) {
    return new Proxy(obj, {
        set(target, property, value, receiver) {
            console.log('change')
            console.log('set', property,'=', value);
            if(typeof value === 'object') {
                for(let k of Object.keys(value)) {
                    if(typeof value[k] === 'object') {
                        value[k] = deepProxy(value[k]);
                    }
                }
                value = deepProxy(value);
            }
            target[property] = value;
            return true;
        },
        deleteProperty(target, property) {
            if(Reflect.has(target, property)) {
                let deleted = Reflect.deleteProperty(target, property);
                if(deleted) {
                    console.log('delete', property);
                }
                return deleted;
            }
            return false;
        }
    });
}
let obj=[
    { name: 'Firefox', type: 'browser' },
    { name: 'SeaMonkey', type: 'browser' },
    { name: 'Thunderbird', type: 'mailer' }
  ]
let obj2=deepProxy(obj)