import { test, expect } from '../../src/fixtures/pagefixtures';
import { HomePage } from '../../src/pages/HomePage';
import { searchResultsPage } from '../../src/pages/SearchResultsPage';
import { CSVHelper } from '../../src/utils/CSVHelper';

test.beforeEach(async ({loginPage,homePage}) =>{

await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.OPENCART_USERNAME!,process.env.OPENCART_PASSWORD!);
})

let productData = CSVHelper.readCSV('testdata/Product.csv');

for(let row of productData){

test(`Verify Search result count - ${row.searchkey} -${row.productname}`,async ({homePage,searchResultsPage})=>{

await homePage.doSearch(row.searchkey);
let actualresultCount=await searchResultsPage.productSearchResultCount();
console.log('Search result count : ',actualresultCount);
expect(actualresultCount).toBe(Number(row.resultcount));

})};

test('Verify the title on Search result page',async ({homePage,searchResultsPage})=>{

await homePage.doSearch('iphone');
let title = await searchResultsPage.productHeading();
console.log(title);
expect(title).toBe('Search - iphone');

})

for(let row of productData)
{
test(`Verify user is able to land on product page ${row.searchkey} -${row.productname}`,
    async({homePage,searchResultsPage,page})=>{

    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
})
}

