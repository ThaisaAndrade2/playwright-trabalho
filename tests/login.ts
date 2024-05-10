async function fazerLogin(page) {
    await page.goto('https://magento.softwaretestingboard.com/');
    const elemento1 = await page.locator('li.authorization-link').first();
    await elemento1.click();
    await page.waitForSelector('text=Registered Customers');
    await page.fill('input[id=email]', 'thaisa.test@gmail.com');
    await page.fill('input[id=pass]', 'senha12@');
    await page.click('.action.login.primary');
    await page.waitForSelector("text=What's New");
}

export default fazerLogin; // Exportação padrão da função fazerLogin
