const puppeteer = require("puppeteer");
const fs = require("fs-extra");

let htmlString = '<button>Submit</button>';

(async function(){
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlString);
       // await page.emulateMedia('screen');
        await page.pdf({
            path: 'htmlpdf.pdf',
            format: 'A4',
            printBackground: true
        });
        console.log("Sucessfully Done!!!");
        await browser.close();
        process.exit();

    }
    catch(e){
        console.log("My Error Is : ", e);
    }
})();