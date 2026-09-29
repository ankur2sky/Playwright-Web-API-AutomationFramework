import { test, expect } from "@playwright/test";
import { meta,log,testData } from "reporting-labs";

let userId:number;
let Auth_token = {
 "Authorization" : "Bearer ea80435ba25a39641f22aab66325c263e1b97a8eb5df702a92cdb517d27c6f9e"

}

test.describe.serial('execute test case serially',()=>{

test('Get api response test',async({ request })=>{
meta({priority: 'P2',severity: 'Minor',owner:'Ankur',story:'Api testing'})

let response=await request.get("https://gorest.co.in/public/v2/users/",{
    headers: Auth_token
})

let jsonBody = await response.json();
console.log(jsonBody);
console.log(response.status());
console.log(response.statusText());

expect(response.status()).toBe(200);



//
})

test('create user api test',async({ request })=>{

    let userData = {
    name: 'Test3',
    email: `pw_automation_${Date.now()}@open.com`,
    phone: '1333',
    status: 'active',
    gender: 'male'
    }

    let response =await request.post("https://gorest.co.in/public/v2/users",{
     headers:Auth_token,
     data:userData

    })

    let jsonBody =await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(201);
    userId=jsonBody.id;
    console.log("Created User ID:", userId);


})

test('update a user PUT api test',async({ request })=>{

let userData = {
    name: 'TestUser testdata',
    email: 'rediff12333@test.com',
    phone: '1233333',
    status: 'inactive',
    gender: 'male'
    }

let response = await request.put(`https://gorest.co.in/public/v2/users/${userId}`,{
     headers:Auth_token,
     data:userData
})

    let jsonBody =await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());
    console.log("Updating User ID:", userId);
    expect(response.status()).toBe(200);

})


test('Delete a user',async({ request })=>{
    console.log("DELETING User ID:", userId);
let response = await request.delete(`https://gorest.co.in/public/v2/users/${userId}`,{
     headers:Auth_token
})
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(204);

})

});