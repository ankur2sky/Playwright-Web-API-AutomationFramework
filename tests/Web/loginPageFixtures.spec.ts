import { test, expect } from '../../src/fixtures/pagefixtures';
import { CSVHelper } from '../../src/utils/CSVHelper'
import { ExcelHelper } from '../../src/utils/ExcelHelper'
import { JSONHelper } from '../../src/utils/JSONHelper'


test.beforeEach(async ({ loginPage}) =>{

await loginPage.goToLoginPage();
});

test('login page title test',async({loginPage}) => {
let pageTitle = await loginPage.loginPageTitle();
console.log('Login Page Title : ',pageTitle);
expect(pageTitle).toBe('Account Login');

});

test('forgot password link exist or not',async({loginPage}) => {
expect(await loginPage.isForgottenPasswordLinkExist()).toBeTruthy();
});

test('User is able to login',async({loginPage,homePage}) => {
await loginPage.doLogin(process.env.OPENCART_USERNAME!,process.env.OPENCART_PASSWORD!);
expect.soft(await homePage.isLogoutLinkexist()).toBeTruthy();
expect.soft(await homePage.HomePageTitle()).toBe('My Account');

});


// Read the csv data directly from CSV file and loop it inside
let testData = CSVHelper.readCSV('testdata/loginData.csv');
for (let row of testData){
test(`Login to app with invalid credential - ${row.username} - ${row.password}`,async({loginPage,homePage}) =>{

await loginPage.doLogin(row.username,row.password);
expect(await loginPage.isinValiderrorDisplayed()).toBeTruthy();

})}

// Read the excel data directly from XLSX file and loop the test data row wise
let exceltestData = ExcelHelper.readExcel('testdata/opencartdata.xlsx','data')
for (let row of exceltestData){
test(`Login to app with invalid credential with excel data- ${row.username} - ${row.password}`
    ,async({loginPage,homePage}) =>{

await loginPage.doLogin(row.username,row.password);
expect(await loginPage.isinValiderrorDisplayed()).toBeTruthy();

})}

// Read the csv data directly from JSON file and loop the test data row wise
let exceltestJSONData = JSONHelper.readJson('testdata/logindata.json')
for (let row of exceltestJSONData){
test(`Login to app with invalid credential with json data- ${row.username} - ${row.password}`
    ,async({loginPage,homePage}) =>{

await loginPage.doLogin(row.username,row.password);
expect(await loginPage.isinValiderrorDisplayed()).toBeTruthy();

})}

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

 