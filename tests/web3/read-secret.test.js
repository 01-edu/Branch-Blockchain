const { expect } = require("chai");
const puppeteer = require('puppeteer-core'); 
const opts = {executablePath: '/usr/bin/google-chrome-stable', args: ['--no-sandbox']}
const express = require('express')
const crypto = require('crypto')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}
describe('Read secret', function() {
  let browser;
  let page;
  let server;

  before(async function() { 
    this.timeout(10000);
    const app = express()
    app.use(express.static('/jail/student/'))
    app.use(express.static('/app/lib/'))
    server = await app.listen(3001);

    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3001/read-secret.html'); 
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