import {test, expect} from "playwright/test";
import fazerLogin from './login';

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

test('Cenario 2: Criando uma conta', async ({ page }) => {
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

    await page.goto('https://magento.softwaretestingboard.com/');
    await page.waitForSelector('text=Create an Account');
    await page.click('text=Create an Account');
    // Esperar que os campos de entrada estejam disponíveis
    await page.waitForSelector('[id=firstname]');
    await page.fill('[id=firstname]', 'Thaisa');
    await page.fill('[id=lastname]', 'Santos');
    await page.fill('[id=email_address]', generateRandomEmail());
    const randomPassword = generateRandomPassword();
    await page.fill('[id=password]', randomPassword);
    await page.fill('[id=password-confirmation]', randomPassword);
    await page.click('.action.submit.primary');
    await page.waitForSelector('text=Thank you for registering with Main Website Store.');
})



test('Cenario 3: Login com dados corretos', async ({ page }) => {
    await fazerLogin(page);
});

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
    await page.waitForSelector('text=Qty');
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
    await page.waitForSelector('text=Qty');
    await page.locator('input[id*="qty"]').click();
    await page.locator('input[id*="qty"]').fill('2');
    await page.locator('text=Add to Cart').click();
    await page.locator('text=Adding...').textContent;
    await page.locator('text=Added').textContent;
    await page.locator('text=You added Erika Running Short to your shopping cart.').textContent;
})

test('Cenário 5: Buscando por um produto na lupa', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByText('Shop New Yoga').textContent;   
    await page.fill('input[placeholder="Search entire store here..."]', 'Montana Wind Jacket');
    await page.press('input[placeholder="Search entire store here..."]', 'Enter');
    await page.waitForSelector('text=Related search terms');
    const relatedSearchTermsMessage = await page.textContent('text=Related search terms');
    expect(relatedSearchTermsMessage).toBeTruthy();
});


test('Cenário 6: Buscando por um produto inexistente', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByText('Shop New Yoga').textContent;   
    await page.fill('input[placeholder="Search entire store here..."]', 'Testes');
    await page.press('input[placeholder="Search entire store here..."]', 'Enter');
    await page.waitForSelector('text=Your search returned no results.');
    const errorMessage = await page.textContent('text=Your search returned no results.');
    expect(errorMessage).toBeTruthy();
});

test('Cenario 7: Login com dados inexistentes', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    const elemento1 = await page.locator('li.authorization-link').first();
    await elemento1.click();
    await page.getByText('Registered Customers').textContent();
    await page.locator('input[id=email]').fill('thaisa99.test@gmail.com');
    await page.locator('input[id=pass]').fill('senha99@');
    await page.locator('.action.login.primary').click();
    await page.waitForSelector('text=The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    const errorMessage = await page.textContent('text=The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    expect(errorMessage).toBeTruthy();
});


test('Cenário 8: Navegando para uma página inexistente', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/nonexistent-page');
    await page.waitForSelector('text=Whoops, our bad...');
    const errorMessage = await page.textContent('text=Whoops, our bad...');
    expect(errorMessage).toBeTruthy();
})


test ('Cenário 9: Adicionando um produto a lista de desejos', async({ page }) => {
    //inicio
    await fazerLogin(page);
    await page.locator('text=Shop New Yoga').click();
    await page.locator('text=Shopping Options').textContent();
    await page.locator('text=Layla Tee').click();
    await page.locator('text=Layla Tee').textContent;
    await page.locator('text=Size').textContent;
    await page.locator('//span[text()="Add to Wish List"]').click();
    await page.waitForSelector('text=Layla Tee has been added to your Wish List. Click here to continue shopping.');
    const successMessage = await page.textContent('text=Layla Tee has been added to your Wish List. Click here to continue shopping.');
    expect(successMessage).toBeTruthy();
})



test('Cenário 10: Logout e confirmação', async ({ page }) => {
    await fazerLogin(page);
    const changeButton = await page.locator('button.action.switch').first();
    await changeButton.click();
    await page.waitForSelector('text=Sign Out');
    await page.click('text=Sign Out');
    await page.waitForSelector('text=You are signed out');
    expect(await page.isVisible('text=You are signed out')).toBeTruthy();
});
