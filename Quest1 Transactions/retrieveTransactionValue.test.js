

// /*/ // ⚡

setup =  function (params) {

} 

const t = (f) => tests.push(f)

// init are unique
t(async () => {
    let txValue = await retrieveTxValue('d030023d96b9170af9ec2fe5d9b62a5eacbcbf144c68f3f45d68bca72d1d3649') 
    return txValue == 0.18075094
})
t(async () => {
    let txValue = await retrieveTxValue('39c5ddccadd616891d448d2aa284fb677e8025e0e224667543ebb8557da2046a') 
    return txValue == 0.76264991
})
t(async () => {
    let txValue = await retrieveTxValue('f44c4ed8faba33ad853e88471aba3d35dd3256c13eec270d74a6b2cf277b60b3') 
    return txValue == 1.48260121
})

Object.freeze(tests)



