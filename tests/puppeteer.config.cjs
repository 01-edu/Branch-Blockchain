const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer. Current folder is :__dirname
	cacheDirectory: join('/home/xa/', '.cache', 'puppeteer'),
};