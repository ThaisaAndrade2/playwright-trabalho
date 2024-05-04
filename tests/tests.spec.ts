import { test } from "playwright/test";

// Função para gerar um e-mail aleatório
function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(7);
    return `user_${randomString}@example.com`;
}

// Função para gerar uma senha aleatória
function generateRandomPassword(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const symbols = '!@#*'
    let password = '';
    for (let i = 0; i < length; i++) {
        password += symbols + characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}


test ('Cenário 1: Abrindo o site e validando as informações inicais', async({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByText('Shop New Yoga').click();
    const text = await page.getByText('Shopping Options').textContent(); //só um elemento
    console.log(text)
})


test ('Cenario 2: Criando uma conta', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');   
    const createAccount = page.getByText('Create an Account').first()
    createAccount.click();
    // Preencher o formulário de registro com dados aleatórios
    await page.getByTestId('firstname').fill('Thaisa');
    await page.getByTestId('lastname').fill('Santos');
    await page.getByTestId('email_address').fill(generateRandomEmail());
    const randomPassword = generateRandomPassword();
    await page.getByTestId('password').fill(randomPassword);
    await page.getByTestId('password-confirmation').fill(randomPassword);
    await page.locator('.action.submit.primary').click();
    await page.getByText('Thank you for registering with Main Website Store.').textContent(); 
})



test ('Cenario 3: Fazendo uma conta', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    const elemento1= await page.locator('li.authorization-link').first()
    elemento1.click();
    page.getByText('Registered Customers').textContent();
    await page.getByTestId('email').fill('thaisa.test@gmail.com');
    await page.getByTestId('pass').fill('senha12@');
    await page.locator('.action.login.primary').click();
    await page.getByText('Welcome, Thaisa Santos! Change').textContent;
})
