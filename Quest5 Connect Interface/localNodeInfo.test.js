const { expect } = require("chai");
const ethers = require("ethers")
const puppeteer = require('puppeteer'); 
const opts = {} 

describe('Remote node info', function() {
  let browser;
  let page;
  let server;
  let BLOCKNUMBER
  let CHAINID 
  let signer
  let provider

  before(async function() { 
    const app = require('express')();
    app.use(require('express-static')('.'));
    server = await app.listen(3001);

    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3001/localNodeInfo.sl.html'); 

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

  it('Should have the correct chainID', async function() {  u
    await page.waitForSelector('#chainId', {visible: true})
    const pageChainId = await page.$eval('#chainId', ci => ci.innerText);
    expect(parseInt(pageChainId)).to.be.equal(CHAINID) 
  }); 

  it('Should have the correct number of blocks', async function() {  
    await page.waitForSelector('#blockNumber')
    const pageBlockNumber = await page.$eval('#blockNumber', ci => ci.innerText);
    expect(parseInt(pageBlockNumber)).to.be.equal(BLOCKNUMBER) 
  }); 

  it('Should have the correct blocknumber after a transaction', async function() {  
    const txHash = await signer.sendTransaction({
        to: '0x7A7a4EdC679bC4E29F74E32E9eEDd256cd435FBb',
        value: ethers.utils.parseEther("0.2"),
    })
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    await page.waitForSelector('#blockNumber')
    const pageBlockNumber = await page.$eval('#blockNumber', ci => ci.innerText);
    let currentBlockNumber = await provider.getBlockNumber()
    expect(parseInt(pageBlockNumber)).to.be.equal(currentBlockNumber) 
  }); 
});