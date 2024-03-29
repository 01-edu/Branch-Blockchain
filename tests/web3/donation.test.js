const { expect } = require("chai")

const express = require('express')
const puppeteer = require('puppeteer-core')

const { sleep, DEBUG, displayBrowserLogs, pp_options } = require('/app/lib/helpers')

describe('Donation tests', function () {
  let browser
  let page
  let server
  let signer
  let provider

  before(async function () {
    // this.timeout(100000) // used during development to ensure timely execution

    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    await provider.ready
    if (DEBUG) console.log("Got provider: ", provider)
    signer = provider.getSigner()

    const app = express()
    app.use(express.static('/jail/student/'))
    app.use(express.static('/app/lib/'))
    server = await app.listen(3001)

    browser = await puppeteer.launch(pp_options)
    page = await browser.newPage()
    await page.goto('http://localhost:3001/donation.html')

    if (DEBUG) displayBrowserLogs(page)
  })

  after(async function () {
    await browser.close()
    await server.close()
  })

  it('Should contain the donation amount element', async function () {
    await page.waitForSelector('#amount')
    const type = await page.$eval('#amount', el => el.tagName)
    expect(type).to.be.equal("INPUT")
  })

  it('Should contain the donation button', async function () {
    await page.waitForSelector('#donate')
    const type = await page.$eval('#donate', el => el.tagName)
    expect(type).to.be.equal("BUTTON")
  })

  it('Should send donations', async function () {
    await page.waitForSelector('#address', { visible: true })
    const addr = await page.$eval('#address', elem => elem.textContent)

    // give money to the user
    const response = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther("3"),
    })
    await response.wait()

    // The user donates 1 Ether
    await page.waitForSelector('#donate')
    await page.$eval('#amount', el => el.value = '1')

    // If button is available, check the new balance
    let button = await page.$('#donate')
    if (button) {
      await page.click('#donate')
      await sleep(300)
      let balance = await provider.getBalance(addr)
      let cleanBalance = parseInt(ethers.utils.formatUnits(balance, 'finney'))
      expect(cleanBalance).to.be.lessThan(3000) && expect(1000).to.be.lessThan(cleanBalance)
    } else {
      console.error('Button not found !')
      process.exit(1)
    }
  })

})