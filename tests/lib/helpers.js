function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

let DEBUG = false
if (process.env.DEBUG) {
  console.log("DEBUG mode")
  DEBUG = true
}

function displayBrowserLogs(page) {
  page
    .on('console', message =>
      console.log(`🖥️ ${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    .on('pageerror', ({ message }) =>
      console.log("🖥️ ", message))
    .on('response', response =>
      console.log(`🌍️${response.status()} ${response.url()}`))
    .on('requestfailed', request =>
      console.log(`🌍️${request.failure().errorText} ${request.url()}`))
}

const pp_options = {
  executablePath: '/usr/bin/google-chrome-stable',
  args: [
    // This is needed to chrome with puppeteer
    '--no-sandbox',
    // Potential optimizations, but some might be already applied by puppeteer or ineffective
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--single-process',
    '--disable-gpu',
    '--mute-audio',
    '--disable-web-security',
    '--allow-file-access-from-files',
    '--disable-client-side-phishing-detection',
    '--disable-default-apps',
    '--disable-features=Translate',
    '--no-default-browser-check',
    '--ignore-certificate-errors',
    '--disable-gl-drawing-for-tests',
    //--disable-extensions // Might be necessary for metamask tests
  ], 
  headless: "old" // Avoids warning for running the older headless mode on new versions of Chrome. 
}
// Interesting idea:
// const opts = process.env.D ? { headless: false, slowMo: 250 } : {}; 


module.exports = { sleep, DEBUG, displayBrowserLogs, pp_options }
