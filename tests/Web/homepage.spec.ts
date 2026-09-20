import { test,expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';

let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page}) =>{
loginPage = new LoginPage(page);
await loginPage.goToLoginPage();
await loginPage.doLogin('testuser1234@test.com','test123');

})



