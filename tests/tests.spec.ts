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


test ('Cenário 1: Abrindo o site e validando as informações do menu bar', async({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByText("What's New").textContent();
    await page.getByText("Women").textContent();
    const fisrtGearDisplayed = await page.getByText("Gear").first()
    fisrtGearDisplayed.textContent();
    await page.getByText("Training").textContent();
    await page.getByText("Sale").textContent();
    await page.getByText('Shop New Yoga').click();
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

test ('Cenário 4: Adicionando alguns produtos ao carrinho de compras', async({ page }) => {
    //inicio
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.locator('text=Shop New Yoga').click();
    await page.locator('text=Shopping Options').textContent();

    // Primeiro produto selecionado
    await page.locator('text=Echo Fit Compression Short').click();
    await page.locator('text=Echo Fit Compression Short').textContent;
    await page.locator('text=Size').textContent;
    await page.locator('div[id="option-label-size-143-item-171"]').click();
    await page.locator('div[id*="option-label-color-93-item-50"]').click();
    await page.getByText('Qty').textContent;
    await page.locator('input[id*="qty"]').fill('10');
    await page.locator('text=Add to Cart').click();
    await page.locator('text=Adding...').textContent;
    await page.locator('text=Added').textContent;
    await page.locator('text=You added Echo Fit Compression Short to your shopping cart.').textContent;

    // Segundo produto selecionado
    await page.locator('text=Prima Compete Bra Top').click();
    await page.locator('text=Prima Compete Bra Top').textContent;
    await page.locator('text=Size').textContent;
    await page.locator('div[id="option-label-size-143-item-168"]').click();
    await page.locator('div[id*="option-label-color-93-item-50"]').click();
    await page.locator('text=Qty').textContent;
    await page.locator('input[id*="qty"]').click();
    await page.locator('input[id*="qty"]').fill('3');
    await page.locator('text=Add to Cart').click();
    await page.locator('text=Adding...').textContent;
    await page.locator('text=Added').textContent;
    await page.locator('text=You added Prima Compete Bra Top to your shopping cart.').textContent;

    //Terceiro produto selecionado
    await page.locator('text=Erika Running Short').click();
    await page.locator('text=Erika Running Short').textContent;
    await page.locator('text=Size').textContent;
    await page.locator('div[id="option-label-size-143-item-172"]').click();
    await page.locator('div[id*="option-label-color-93-item-53"]').click();
    await page.locator('text=Qty').textContent;
    await page.locator('input[id*="qty"]').click();
    await page.locator('input[id*="qty"]').fill('1');
    await page.locator('text=Add to Cart').click();
    await page.locator('text=Adding...').textContent;
    await page.locator('text=Added').textContent;
    await page.locator('text=You added Erika Running Short to your shopping cart.').textContent;
})

test('Cenário 5: Buscando por um produto na lupa', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.waitForSelector('text=Get fit and look fab in new seasonal styles');
    await page.fill('input[placeholder="Search entire store here..."]', 'Montana Wind Jacket');
    await page.press('input[placeholder="Search entire store here..."]', 'Enter');
    await page.getByText('Related search terms').textContent;
});


