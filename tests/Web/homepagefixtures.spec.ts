import process from 'node:process';
import { test, expect } from '../../src/fixtures/pagefixtures';

test.beforeEach(async ({loginPage,homePage}) =>{

await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.OPENCART_USERNAME,process.env.OPENCART_PASSWORD);
})

test('home page title test',async({homePage})=>{
let homePageTitle= await homePage.HomePageTitle();
console.log(homePageTitle);
expect(homePageTitle).toBe('My Account');

});

test('Logout link exist or not',async ({homePage})=>{
expect(await homePage.isLogoutLinkexist()).toBeTruthy();

})

 test('all header exist or not',async ({homePage})=> {
  
    let allheader = await homePage.collectHeader()
    console.log(allheader);
    expect.soft(allheader).toHaveLength(4);
    expect.soft(allheader).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);

 })

 //common features test

test('App logo exist on Login Page',async({basePage})=>{

    expect(await basePage.isLogoVisible()).toBeTruthy();

})

test('Search box exist on Login Page', async({basePage})=>{

expect(await basePage.isSearchBoxVisible()).toBeTruthy()

})

test('Cart exist on Login Page', async({basePage})=>{

expect(await basePage.CartButtonVisible()).toBeTruthy();

})

test('Footer exist on login Page', async({basePage})=>{
expect(await basePage.getPageFooterscount()).toBe(16);

})

 