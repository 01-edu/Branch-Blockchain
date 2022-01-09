
// /*/ // ⚡

setup =  function (params) {

} 

const t = (f) => tests.push(f)

t(async () => {

    const https = require('https');
    const API = 'https://api.blockcypher.com/v1/btc/test3/txs/'
    async function  retrieveTxValue(tH) {
        return new Promise((resolve) => {
            https.get(API+tH, (resp) => {
                let data = ''
            
                resp.on('data', (chunk) => {
                    data += chunk
                })
            
                resp.on('end', () => {
                    let received = Date.parse(JSON.parse(data).received)
                    let dateNow = new Date
                    let value = JSON.parse(data).outputs[0].value
                    if(Math.abs(received-dateNow) < 3600*1000*z) {
                        resolve(value)
                    } else {
                        resolve(0)// arbitrary value to fail test
                    }
                })
            
            }).on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    }
    return await retrieveTxValue(txHash) == 1691
})

Object.freeze(tests)



