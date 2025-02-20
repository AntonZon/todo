const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');


xdescribe('Google Search', function () {
    it('should work', async function () {

        const options = new Chrome.Options();
        options.addArguments( "--no-sandbox", "--verbose", "--log-path=C:\\Users\\Anton\\Bin\\chromedriver.log")
            .setBinaryPath("C:\\Users\\Anton\\Bin\\chromedriver\\chrome.exe");


        let driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(options)
            .build();



        try {
            await driver.get('https://www.selenium.dev/documentation/webdriver/getting_started/first_script/');
            await driver.findElement(By.className("DocSearch-Button")).click();
            
            await driver.wait(until.elementIsVisible(driver.findElement(By.className("DocSearch-Modal"))), 5000);
          //  expect(await driver.findElement(By.id("docsearch-input").isDisplayed() )).toBeTruthy();
             
            await driver.findElement(By.id('docsearch-input')).sendKeys('webdriver');
            await driver.findElement(By.id('docsearch-input')).submit();
            
            await driver.findElement(By.css('#docsearch-item-0 a')).click();
            // await driver.sendKeys(Key.RETURN);

            //await driver.wait(() =>{}, 15000);
           await driver.wait(until.titleIs('WebDriver | Selenium'), 5000);
            expect(await driver.getTitle()).toEqual('WebDriver | Selenium');







            // await driver.get('https://www.google.com/ncr');
//             await driver.findElement(By.xpath('//button[normalize-space()="Accept all"]')).click();
//             await driver.wait(() =>{}, 500);           
//             await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//             await driver.wait(() =>{}, 15000);
// //            await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//             expect(await driver.getTitle()).toEqual('webdriver - Google Search');
         } finally {
            // await driver.quit();
        }
    },30000);
});

