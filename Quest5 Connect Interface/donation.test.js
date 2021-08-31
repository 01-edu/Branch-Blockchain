const { expect } = require("chai");
const ethers = require("ethers")
const puppeteer = require('puppeteer'); 
const opts = {} 
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}
describe('Remote node info', function() {
  let browser;
  let page;
  let server;
  let BLOCKNUMBER
  let CHAINID 
  let signer
  let provider

  before(async function() { 
    this.timeout(100000);

    const app = require('express')();
    app.use(require('express-static')('.'));
    server = await app.listen(3001);

    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3001/donation.sl.html'); 

    provider = new ethers.providers.JsonRpcProvider();
    BLOCKNUMBER = await provider.getBlockNumber()
    let netw = await provider.getNetwork()
    CHAINID = netw.chainId
    signer = provider.getSigner()

  });

  after(async function() {
    await browser.close();
    await server.close();
  });

  it('should have a properly formated address', async function() {  
    await page.waitForSelector('#address', {visible: true})
    const addr = await page.$eval('#address', elem => elem.textContent)
    expect(parseInt(addr.length)).to.be.equal(42) 
  }); 

  it('Should have the correct balance initial balance', async function() {  
    await page.waitForSelector('#balance')
    const balance = await page.$eval('#balance', el => el.textContent);
    expect(parseInt(balance)).to.be.equal(0) 
  })

  it('Should contain the donation amount element', async function() {  
    await page.waitForSelector('#amount')
    const type = await page.$eval('#amount', el => el.tagName);
    expect(type).to.be.equal("INPUT") 
  })

  it('Should contain the donation button', async function() {  
    await page.waitForSelector('#donate')
    const type = await page.$eval('#donate', el => el.tagName);
    expect(type).to.be.equal("BUTTON") 
  })
  it('Should send donations', async function() {  

    await page.waitForSelector('#address', {visible: true})
    const addr = await page.$eval('#address', elem => elem.textContent)
    // give money to the user
    const response = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther("3"),
    })
    await response.wait()

    await page.waitForSelector('#donate')
    await page.$eval('#amount', el => el.value = '1');

    let button = await page.$('#donate')
      if (button) {
        await page.click('#donate')

        await sleep(300)
        let balance = await provider.getBalance(addr)
        let cleanBalance = parseInt(ethers.utils.formatUnits(balance,'finney'))
        console.log(cleanBalance)

        expect(cleanBalance).to.be.lessThan(3000) &&   expect(1000).to.be.lessThan (cleanBalance) 
      } else {
        console.error('Button not found !')
        process.exit(1)
      }


  }); 

});