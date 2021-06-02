
// /*/ // ⚡

setup =  function (params) {

} 

const t = (f) => tests.push(f)

t(async () => {
    const https = require('https');
    const API = 'https://kovan.infura.io/v3/8c132b7fedab4f0db53133d04460add4'
    async function  retrieveData(requestDataString) {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
        }
        return new Promise((resolve,reject) => {
            const req = https.request(API, options, (resp) => {
                let data = ''
            
                resp.on('data', (chunk) => {
                    data += chunk
                })
            
                resp.on('end', () => {
                    let hexResults = JSON.parse(data).result
                    resolve(parseInt(hexResults,16))
                })
            
            }).on("error", (err) => {
                reject("Error: " + err.message)
            })
            req.write(requestDataString)
            req.end()
        })
    }
    Promise.all([
        retrieveData(`{"jsonrpc":"2.0","method":"eth_getTransactionCount","params": ["${accounts[0]}","latest"],"id":1}`), 
        retrieveData(`{"jsonrpc":"2.0","method":"eth_getTransactionCount","params": ["${accounts[1]}","latest"],"id":1}`), 
        retrieveData(`{"jsonrpc":"2.0","method":"eth_getBalance","params": ["${accounts[0]}","latest"],"id":1}`),
        retrieveData(`{"jsonrpc":"2.0","method":"eth_getBalance","params": ["${accounts[1]}","latest"],"id":1}`)
    ])
    .then((retrieved) => {
        return retrieved[0]===retrieved[1] && retrieved[2]===retrieved[3] && retrieved[0]>0 && retrieved[2]>0
    }).catch(reason => {
        console.log(reason)
        return false
    })
})

Object.freeze(tests)



