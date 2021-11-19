

// /*/ // ⚡

setup =  function (params) {

} 

const t = (f) => tests.push(f)

t(async () => {
    let d = await retrieveBlockDate(1881467)
    let dRef = new Date('2020-11-05T20:18:48.000Z')
    return d.getTime() == dRef.getTime()
})

t(async () => {
    let d = await retrieveBlockDate(1)
    let dRef = new Date('2011-02-02T23:22:08.000Z')
    return d.getTime() == dRef.getTime()
})

// Alternative 
// t( () => {
//     return  retrieveBlockDate(1881467)
//         .then( d => {
//             let dRef = new Date('2020-11-05T20:18:48.000Z')
//             return d.getTime() == dRef.getTime()
//         })
//     }
// )


Object.freeze(tests)



