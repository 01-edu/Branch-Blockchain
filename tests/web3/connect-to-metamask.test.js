const { expect } = require("chai");
const ethers = require("ethers")
const express = require('express')
const puppeteer = require('puppeteer-core'); 
const opts = {executablePath: '/usr/bin/google-chrome-stable', args: ['--no-sandbox']}
// const opts = process.env.D ? { headless: false, slowMo: 250 } : {}; 
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}
describe('Connect to MetaMask', function() {
  let browser;
  let page;
  let server;
  let BLOCKNUMBER
  let CHAINID 
  let signer
  let provider

  before(async function() { 
    const app = express()
    app.use(express.static('/jail/student/'))
    app.use(express.static('/app/lib/'))

    // const app = require('express')();
    // app.use(require('express-static')('.'));
    server = await app.listen(3001);

    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3001/connect-to-metamask.html'); 

    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    await provider.ready
    BLOCKNUMBER = await provider.getBlockNumber()
    let netw = await provider.getNetwork()
    CHAINID = netw.chainId
    signer = provider.getSigner()

  });

  after(async function() {
    await browser.close();
    await server.close();
  });

  it('should have a properly formatted address', async function() {  
    await page.waitForSelector('#address', {visible: true})
    const addr = await page.$eval('#address', elem => elem.textContent)
    expect(parseInt(addr.length)).to.be.equal(42) 
  }); 

  it('Should have the correct balance initial balance', async function() {  
    await page.waitForSelector('#balance')
    const balance = await page.$eval('#balance', el => el.textContent);
    expect(parseInt(balance)).to.be.equal(0) 
  })


  // it('Should have the correct balance after a transaction', async function() {  
  //   await page.waitForSelector('#address', {visible: true})
  //   const addr = await page.$eval('#address', elem => elem.textContent)
  //   const response = await signer.sendTransaction({
  //       to: addr,
  //       value: ethers.utils.parseEther("3"),
  //   })
  //   await response.wait()
  //   sleep(400) // arbitrary number
  //   let networkBalance = await provider.getBalance(addr)

  //   await page.waitForSelector('#refreshBalance')

  //   let button = await page.$('#refreshBalance')
  //     if (button) {
  //       // await button.click()
  //       await page.click('#refreshBalance')
  //       // await button.evaluate( b => b.click() );

  //       sleep(800)
  //       await page.waitForSelector('#balance')
  //       const balance = await page.$eval('#balance', el => el.textContent);

  //       // console.log(addr, "Balance : ", ethers.utils.formatEther(networkBalance), balance)

  //       expect(parseInt(balance)).to.be.equal(3) 
  //     } else {
  //       console.error('Button not found !')
  //       process.exit(1)
  //     }
  // }); 

});