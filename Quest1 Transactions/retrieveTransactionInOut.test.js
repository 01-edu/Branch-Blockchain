

// /*/ // ⚡

setup =  function (params) {

} 

const t = (f) => tests.push(f)

t(async () => {
    let txValue = await retrieveTxValue('d030023d96b9170af9ec2fe5d9b62a5eacbcbf144c68f3f45d68bca72d1d3649') 
    return txValue.in[0] == 0.18075094 && eq(txValue.out, [0.001,0.1797493])
})
t(async ({eq}) => {
    let txValue = await retrieveTxValue('39c5ddccadd616891d448d2aa284fb677e8025e0e224667543ebb8557da2046a') 
    return txValue.in[0] == 0.76264991 && eq(txValue.out, [0.00001691,0.76262929])
})
t(async () => {
    let txValue = await retrieveTxValue('f44c4ed8faba33ad853e88471aba3d35dd3256c13eec270d74a6b2cf277b60b3') 
    return txValue.in[0] == 1.48260121 &&  eq(txValue.out, [ 0.001, 1.47047121 ])
})
t(async () => {
    let txValue = await retrieveTxValue('ab2c4149b53c09d589f73755927a2894cccfe58303ddfdc62682ef81cf248fc3') 
    return eq(txValue.in, [ 0.01001801, 0.09733837 ]) &&  eq(txValue.out, [ 0.01000063, 0.09735287 ])
})
t(async () => {
    let txValue = await retrieveTxValue('3f27c30b817f2e224a9cde19496bae51e1ed0e81b65547029273ce7e49d4c6e0') 
    return eq(txValue.in, [0]) && eq(txValue.out, [0.09851409,0])
})
t(async () => {
    let txValue = await retrieveTxValue('f14274ea218a3167e00517496f53ff77c917e85199f1ef77e830797698647812') 
    return eq(txValue.in, [0.12586365,0.12428433,0.11935054,0.12457835,0.12450596,0.12572618]) 
        && eq(txValue.out, [ 0.73430811, 0.0099961 ])
})

Object.freeze(tests)



