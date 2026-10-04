import { test, expect } from '../../src/fixtures/pagefixtures';

test.beforeEach(async ({loginPage,homePage}) =>{

await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.OPENCART_USERNAME,process.env.OPENCART_PASSWORD);
})


test('@regression @smoke Verify details on productInfo',async({homePage,searchResultsPage,productInfoPage,page})=>{

await homePage.doSearch('macbook');
await searchResultsPage.selectProduct('MacBook Air');
expect(await productInfoPage.getProductHeader()).toBe('MacBook Air');
expect(await page.title()).toBe('MacBook Air');
expect(await productInfoPage.getProductImages()).toBe(4);

let actualProductInfoMap = await productInfoPage.getWholeProductInfo();

console.log(actualProductInfoMap);
expect.soft(actualProductInfoMap.get('productHeader')).toBe('MacBook Air');

})

//common features test

test('@smoke App logo exist on Login Page',async({basePage})=>{

    expect(await basePage.isLogoVisible()).toBeTruthy();

})

test('@smoke Search box exist on Login Page', async({basePage})=>{

expect(await basePage.isSearchBoxVisible()).toBeTruthy()

})

test('@smoke Cart exist on Login Page', async({basePage})=>{

expect(await basePage.CartButtonVisible()).toBeTruthy();

})

test('@smoke Footer exist on login Page', async({basePage})=>{
expect(await basePage.getPageFooterscount()).toBe(16);

})
