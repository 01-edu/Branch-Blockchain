const { expect } = require("chai");
const puppeteer = require('puppeteer'); 
const opts = {} 
const crypto = require('crypto')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}
describe('Remote node info', function() {
  let browser;
  let page;
  let server;

  before(async function() { 
    this.timeout(10000);
    const app = require('express')();
    app.use(require('express-static')('.'));
    server = await app.listen(3001);

    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3001/readSecret.sl.html'); 
  });

  after(async function() {
    await browser.close();
    await server.close();
  });

  it('Should have the correct secret', async function() {  
    await page.waitForSelector('#secret', {visible: true})
    await sleep(200) // buffer in case retrieval is slow, albeit not experienced during tests
    const pageSecret = await page.$eval('#secret', ci => ci.innerText);
    let h = crypto.createHash("sha256").update(Buffer.from(pageSecret)).digest('hex')
    expect(h).to.be.equal('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855') 
  }); 

});