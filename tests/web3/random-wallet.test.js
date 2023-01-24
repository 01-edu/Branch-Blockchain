const { expect } = require("chai")

const express = require('express')
const puppeteer = require('puppeteer-core'); 
const opts = {executablePath: '/usr/bin/google-chrome-stable', args: ['--no-sandbox']}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}
describe('Random wallet', function() {
  let browser;
  let page;
  let server;
  let signer
  let provider

  before(async function() { 
    const app = express()
    app.use(express.static('/jail/student/'))
    app.use(express.static('/app/lib/'))
    server = await app.listen(3001);

    provider = new ethers.providers.JsonRpcProvider()
    await provider.ready
    signer = provider.getSigner()

    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3001/random-wallet.html'); 

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
    await sleep(300)
    const balance = await page.$eval('#balance', el => el.textContent);
    expect(parseInt(balance)).to.be.equal(0) 
  })

  it('Should have the correct balance after a transaction', async function() {  
    await page.waitForSelector('#address', {visible: true})
    const addr = await page.$eval('#address', elem => elem.textContent)
    const response = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther("3"),
    })
    await response.wait()
    // sleep(400) // arbitrary number
    // let networkBalance = await provider.getBalance(addr)

    await page.waitForSelector('#refreshBalance')

    let button = await page.$('#refreshBalance')
      if (button) {
        // await button.click()
        await page.click('#refreshBalance')
        // await button.evaluate( b => b.click() );
        await sleep(300)
        await page.waitForSelector('#balance')
        const balance = await page.$eval('#balance', el => el.textContent);

        expect(parseInt(balance)).to.be.equal(3) 
      } else {
        console.error('Button not found !')
        process.exit(1)
      }
  }); 

});