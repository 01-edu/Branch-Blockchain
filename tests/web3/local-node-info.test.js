const { expect } = require("chai")

const express = require('express')
const puppeteer = require('puppeteer-core')

const { sleep, DEBUG, displayBrowserLogs, pp_options } = require('/app/lib/helpers')


describe('Local node info', function () {
  let browser
  let page
  let server
  let provider

  before(async function () {
    this.timeout(100000)
    // const app = require('express')();
    // app.use(require('express-static')('/jail/student/'));
    // app.use(require('express-static')('/app/lib/'));
    const app = express()
    app.use(express.static('/jail/student/'))
    app.use(express.static('/app/lib/'))

    server = await app.listen(3001)

    browser = await puppeteer.launch(pp_options)
    page = await browser.newPage()
    await page.goto('http://127.0.0.1:3001/local-node-info.html')
    if (DEBUG) displayBrowserLogs(page)

    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    await provider.ready
    if (DEBUG) console.log(provider)
  })

  after(async function () {
    await browser.close()
    await server.close()
  })

  it('Should have the correct chainID', async function () {
    await page.waitForSelector('#chainId', { visible: true })
    sleep(300)
    let netw = await provider.getNetwork()
    const pageChainId = await page.$eval('#chainId', ci => ci.textContent)
    expect(parseInt(pageChainId)).to.be.equal(netw.chainId)
  })

  it('Should have the correct number of blocks', async function () {
    await page.waitForSelector('#blockNumber')
    sleep(300)
    let blockNumber = await provider.getBlockNumber()
    const pageBlockNumber = await page.$eval('#blockNumber', ci => ci.innerText)
    expect(parseInt(pageBlockNumber)).to.be.equal(blockNumber)
  })

  // TOCHECK : Temporarily disabled because it getBlockNumber seems unreliable. 
  // it('Should have the correct blocknumber after a transaction', async function() {  
  //   const txHash = await signer.sendTransaction({
  //       to: '0x7A7a4EdC679bC4E29F74E32E9eEDd256cd435FBb',
  //       value: ethers.utils.parseEther("0.2"),
  //   })
  //   await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  //   await page.waitForSelector('#blockNumber')
  //   sleep(300)
  //   const pageBlockNumber = await page.$eval('#blockNumber', ci => ci.innerText);
  //   let currentBlockNumber = await provider.getBlockNumber()
  //   expect(parseInt(pageBlockNumber)).to.be.equal(currentBlockNumber) 
  // }); 
})