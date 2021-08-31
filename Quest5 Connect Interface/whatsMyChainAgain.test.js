const { expect } = require("chai")
const ethers = require("ethers")
const puppeteer = require('puppeteer')
const apiKeys = require('./apiKeys.json')
const opts = {} 

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

describe('Remote note info', function() {
  let browser;
  let page;
  let server;
  let provider
  let blocknumber

  before(async function() { 
    const app = require('express')();
    app.use(require('express-static')('.'));
    server = await app.listen(3001);

    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3001/whatsMyChainAgain.sl.html'); 

    provider = new ethers.providers.getDefaultProvider('mainnet');
    const provider = ethers.getDefaultProvider("homestead", {
      etherscan: apiKeys.etherscan,
      infura: {
        projectId: apiKeys.infuraID,
        projectSecret: apiKeys.infuraSecret,
      },
      alchemy: apiKeys.alchemy,
      pocket: {
        applicationId: apiKeys.pocketID,
        applicationSecretKey: apiKeys.pocketSecret
      }
    });
    await provider.ready
  
    blocknumber = await provider.getBlockNumber()

  });

  after(async function() {
    await browser.close();
    await server.close();
  });

  it('Should have the correct chainID', async function() {  
    await page.waitForSelector('#chainId', {visible: true})
    let pageChainId = await page.$eval('#chainId', ci => ci.textContent)
    if (Number.isNaN(pageChainId)){
      await sleep(500) 
      pageChainId = await page.$eval('#chainId', ci => ci.textContent)
    }
    expect(parseInt(pageChainId)).to.be.equal(1) 
  }); 

  it('Should have the correct blocknumber', async function() {  
    await sleep(500) /
    await page.waitForSelector('#lastBlockNumber')
    let pageBlockNumber = await page.$eval('#lastBlockNumber', el => el.textContent);
    if (Number.isNaN(pageBlockNumber)){
      // Second attempt
      await sleep(500) 
      pageBlockNumber = await page.$eval('#lastBlockNumber', el => el.textContent);
    }
    expect(Math.abs(parseInt(pageBlockNumber)-blocknumber)).to.be.lessThan(100) 
  }); 

  it('Should have the correct number of transactions', async function() {  
    this.timeout(5000) // This test can take some time
    await sleep(500) 
    await page.waitForSelector('#numberOfTransactions')
    await page.waitForSelector('#lastBlockNumber')
    const pageBlockNumber = await page.$eval('#lastBlockNumber', el => el.textContent);
    let blck = await provider.getBlock(parseInt(pageBlockNumber))
    let nbTx = blck.transactions.length
    const pageNumberOfTransactions = await page.$eval('#numberOfTransactions', el => el.textContent);
    expect(parseInt(pageNumberOfTransactions)).to.be.equal(nbTx) 
  }); 
});