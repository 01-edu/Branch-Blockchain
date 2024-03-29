// Basic test as a placeholder

let assert = require('assert')
const { expect } = require("chai")
let {txid} = require("/jail/student/send-eth-transaction.js")

function isSha256(h) {
  h = h.slice(2)
  const regex = /^[a-f0-9]{64}$/gi
  return regex.test(h)
}  

describe('Send transaction', function () {
  it('Should return a valid txid', function () {
    assert.ok(isSha256(txid))
  })
})


// Prior version of the test using test.mjs
// // /*/ // ⚡

// setup =  function (params) {

// } 

// const t = (f) => tests.push(f)

// t(async () => {

//     // Simplified test without internet access 
//     function isSha256(h) {
//         const regex = /^[a-f0-9]{64}$/gi
//         return regex.test(h)
//     }
//     return isSha256(txHash) 


//     // With internet access enabled

//     // const https = require('https');
//     // const API = 'https://kovan.infura.io/v3/8c132b7fedab4f0db53133d04460add4'
//     // async function  retrieveTxValue(txH) {
//     //     const dataString = `{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params": ["${txH}"],"id":1}` // alt :JSON.stringify(data)
//     //     const options = {
//     //         method: 'POST',
//     //         headers: {
//     //           'Content-Type': 'application/json',
//     //           'Content-Length': dataString.length,
//     //         },
//     //         // timeout: 3000, 
//     //     }
//     //     // global.fetch("/login", {
//     //     //     method: "POST",
//     //     //     body: {"jsonrpc":"2.0","method":"eth_getBlockByHash","params": ["0xf123d411edb3bccd1785cecf700b0f60aef5608347a37cf9e5638fec12ef8cff",false],"id":1}
//     //     //   }).then( res => {
//     //     //     console.log(res)
//     //     //   })
//     //     return new Promise((resolve) => {
//     //         const req = https.request(API, options, (resp) => {
//     //             let data = ''
            
//     //             resp.on('data', (chunk) => {
//     //                 data += chunk
//     //             })
            
//     //             resp.on('end', () => {
//     //                 console.log(JSON.parse(data).result)
//     //                 let txValue = parseInt(JSON.parse(data).result.value, 16)
//     //                 resolve(txValue)
                    
//     //             })
            
//     //         }).on("error", (err) => {
//     //             console.log("Error: " + err.message)
//     //         }).on('timeout', () => {
//     //             req.destroy()
//     //             console.log(new Error('Request time out'))
//     //             // reject(new Error('Request time out'))
//     //         })
//     //         req.write(dataString)
//     //         req.end()
//     //     })
//     // }
//     // let txValue = await retrieveTxValue(txHash) 
//     // return txValue == 1337
// })

// Object.freeze(tests)



