const info = require('./info'); // Login e Senha que estão em outro arquivo
const puppeteer = require('puppeteer'); // Ferramenta para fazer o web scraping

// Constantes utilizadas
const login = info.info.loginInsta; // É possível trocar a importação pela 
const senha = info.info.senhaInsta; //  própria string de login e senha.

const inputLogin = "#loginForm > div > div:nth-child(1) > div > label > input";
const inputSenha = "#loginForm > div > div:nth-child(2) > div > label > input";
const botaoEntrar = "#loginForm > div > div:nth-child(3) > button";

const urlEdit = "https://www.instagram.com/accounts/edit/";
const bio = "#pepBio";
const botaoEnviar= "#react-root > section > main > div > article > form > div:nth-child(10) > div > div > button";

// Função delay
function delay(time){
    return new Promise(function(resolve){
        setTimeout(resolve, time);
    });
};

// Função porcentagem
function porcentagemCurso(){

    let i = Date.now()/1000/60/60/24;
    let diaDoAno = i.toFixed(0) - 18263;

    let x = (100*diaDoAno)/1461;

    return String(x.toFixed(1));

};

// Função principal
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
    await page.type(inputSenha, senha);
    await page.click(botaoEntrar);
    await delay(3000);

    // Editar Bio
    await page.goto(urlEdit);
    await delay(500);

    await page.click(bio);
    await page.keyboard.down('ControlLeft');
    await page.keyboard.press('KeyA');
    await page.keyboard.press('ControlLeft');

    await page.keyboard.type('idade \nCurso - UNI '+ porcentagemCurso() +'%\n alguma info.');
    await page.click(botaoEnviar);

    await browser.close();

};

attBio("https://www.instagram.com");