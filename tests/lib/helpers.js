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

function displayBrowserLogs (page) {
  page
  .on('console', message =>
    console.log(`🖥️ ${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
  .on('pageerror', ({ message }) => 
    console.log("🖥️ ",message))
  .on('response', response =>
    console.log(`🌍️${response.status()} ${response.url()}`))
  .on('requestfailed', request =>
    console.log(`🌍️${request.failure().errorText} ${request.url()}`))
}
module.exports = { sleep, DEBUG, displayBrowserLogs }
