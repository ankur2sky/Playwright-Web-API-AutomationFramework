import { test,expect } from "@playwright/test";
import { runInContext } from "node:vm";

// intercept the netwrok calls and log them 
// **/*  wild card pattern for urls

test('network interception and log', async({ page })=>{

    page.route('**/*',async(route)=>{

    console.log(route.request().method(),route.request().url());
    await route.continue();

    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

})

// intercept with mocking 
// mocking : fake data/response 

test('mock the search data api', async({ page })=>{

let fakeProducts = [

    {name: 'Fake macbook Pro',price: '$2444'},
    {name: 'Fake Apple Pro',price: '$4400'}
];

await page.route('**//index.php?route=product/search&search=macbook%20pro',async(route)=>{

await route.fulfill({
      status:200,
      contentType:'application/json',
      body: JSON.stringify(fakeProducts)
});

});

await page.goto('https://abc.com/index.php?route=product/search&search=macbook%20pro')

})