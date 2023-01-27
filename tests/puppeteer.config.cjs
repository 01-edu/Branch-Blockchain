const { join } = require('path')

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
	// Changes the cache location for Puppeteer. Current folder is :__dirname
	cacheDirectory: join('/home/xa/', '.cache', 'puppeteer'),
	// executablePath: '/usr/bin/chromium-browser',	
	// Further optimisation ideas: https://stackoverflow.com/questions/62852481/how-to-speed-up-puppeteer
}