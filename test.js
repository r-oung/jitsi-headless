const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
	defaultViewport: {height: 1080, width: 1920},
	headless: false,
	args: ['--display=:1', '--no-sandbox', '--disable-extensions'],
	executablePath: '/usr/bin/chromium-browser'
});
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
