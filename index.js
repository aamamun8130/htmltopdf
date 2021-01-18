const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path")

const data = require("./database.json");

let htmlString = '<button>Submit</button>';

const compile = async function(templateName, data){
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
};

(async function(){
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const content = await compile('pdfhtmltemplate', data)
        await page.setContent(content);
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