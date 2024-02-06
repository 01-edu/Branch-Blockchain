const { expect } = require('chai')

const puppeteer = require('puppeteer-core')

const { DEBUG, displayBrowserLogs, pp_options } = require('/app/lib/helpers')

describe('Local node info', function () {
  let browser
  let page
  let provider

  before(async function () {
    browser = await puppeteer.launch(pp_options)
    page = await browser.newPage()
    await page.goto('file:///jail/student/local-node-info.html')
    await page.reload()
    if (DEBUG) console.log(await page.content())

    provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    await provider.ready
    if (DEBUG) console.log(provider)
  })

  after(async function () {
    await browser.close()
  })

  it('Should have the correct chainID', async function () {
    await page.waitForSelector('#chainId')
    let netw = await provider.getNetwork()
    const pageChainId = await page.$$eval('#chainId', el => el.textContent)
    expect(parseInt(pageChainId)).to.be.equal(netw.chainId)
  })

  it('Should have the correct number of blocks', async function () {
    await page.waitForSelector('#blockNumber')
    let blockNumber = await provider.getBlockNumber()
    const pageBlockNumber = await page.$$eval('#blockNumber', el => el.textContent)
    expect(parseInt(pageBlockNumber)).to.be.equal(blockNumber)
  })
})
