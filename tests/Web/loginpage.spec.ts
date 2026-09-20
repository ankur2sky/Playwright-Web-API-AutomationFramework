import {test,expect} from '@playwright/test';
import {LoginPage} from '../../src/pages/LoginPage';

let loginPage:LoginPage

test.beforeEach(async ({page}) =>{
loginPage = new LoginPage(page);
await loginPage.goToLoginPage();

})

test('login page title test',async({}) => {
let pageTitle = await loginPage.loginPageTitle();
console.log('Login Page Title : ',pageTitle);
expect(pageTitle).toBe('Account Login');

});

test('forgot password link exist or not',async({}) => {
expect(await loginPage.isForgottenPasswordLinkExist()).toBeTruthy();
});

test('User is able to login',async({}) => {
await loginPage.doLogin('test@test.com','test123');
});

test('Validate the error message',async()=>{
 await loginPage.doLogin('test','123');
 await expect(await loginPage.isinValiderrorDisplayed()).toBeTruthy();
});


test('Validate the new customer title is visible or not',async()=>{
expect(await loginPage.newCustomerHeading()).toBeTruthy();

});

test('Validate returning Customer text',async()=>{
expect(await loginPage.returningCustomertextValidation()).toBeTruthy();
})
