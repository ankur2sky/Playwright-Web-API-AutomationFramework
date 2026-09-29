import { test,expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';

let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page}) =>{
loginPage = new LoginPage(page);
await loginPage.goToLoginPage();
await loginPage.doLogin('testuser1234@test.com','test123');
homePage= new HomePage(page);
})

test('home page title test',async()=>{
let homePageTitle= await homePage.HomePageTitle();
console.log(homePageTitle);
expect(homePageTitle).toBe('My Account');

});

test('Logout link exist or not',async ()=>{
expect(await homePage.isLogoutLinkexist()).toBeTruthy();

})

 test('all header exist or not',async ()=> {
  
    let allheader = await homePage.collectHeader()
    console.log(allheader);
    expect.soft(allheader).toHaveLength(4);
    expect.soft(allheader).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);

 })





