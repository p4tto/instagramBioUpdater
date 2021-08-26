const info = require('./info'); // Login and Password import
const puppeteer = require('puppeteer'); // Tool used for the Web Scraping

// Constantes utilizadas
const login = info.info.passwordInsta; // It's possible to change the import
const password = info.info.passwordInsta; //  with your account credentials directly from here

const inputLogin = "#loginForm > div > div:nth-child(1) > div > label > input";
const inputPassword = "#loginForm > div > div:nth-child(2) > div > label > input";
const enterButton = "#loginForm > div > div:nth-child(3) > button";

const urlEdit = "https://www.instagram.com/accounts/edit/";
const bio = "#pepBio";
const sendButton = "#react-root > section > main > div > article > form > div:nth-child(10) > div > div > button";

// Delay function
function delay(time){
    return new Promise(function(resolve){
        setTimeout(resolve, time);
    });
};

// Percentage Function
function percentageMath(){

    let i = Date.now()/1000/60/60/24;
    let daySinceStart = i.toFixed(0) - 18263;

    let x = (100*daySinceStart)/1461;

    return String(x.toFixed(1));

};

// Master Function
async function attBio(url){

    let options = {
        headless: true,
        defaultViewport: {
          width: 400,
          height: 830,
        },
    };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');
    await page.goto(url);
    await delay(2000);

    // Login
    await page.type(inputLogin, login );
    await page.type(inputPassword, password);
    await page.click(enterButton);
    await delay(3000);

    // Edit Bio
    await page.goto(urlEdit);
    await delay(500);

    await page.click(bio);
    await page.keyboard.down('ControlLeft');
    await page.keyboard.press('KeyA');
    await page.keyboard.press('ControlLeft');

    await page.keyboard.type('age \ndegree - UNI '+ percentageMath() +'%\n other info.');
    await page.click(sendButton);

    await browser.close();

};

attBio("https://www.instagram.com");
