import { test, expect } from "../../src/fixtures/apifixtures";
import * as allure from "allure-js-commons";


const token = process.env.API_TOKEN;
let userId:number;

let AUTH_HEADER={

    Authorization: `Bearer ${token}`

}
// helper generic function - create a user post call

async function createUser(apiHelper:any ) {

    let userData = {
    name: 'api tester',
    email: `api_automation_${Date.now()}@open.com`,
    phone: '1333',
    status: 'active',
    gender: 'male'
    }

    let response = await apiHelper.post('public/v2/users',userData,AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
    
}


   test('@regression Create a test user',async({ apiHelper})=>{

    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");

      let userResponse = await createUser(apiHelper);

      let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.name).toBe('api tester');

    })


      test('@smoke Update a test user',async({ apiHelper})=>{
      
      //1. Create a test user  
      let userResponse = await createUser(apiHelper);

      //2. Get a test user
      let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.name).toBe('api tester');

      //3. Update a user

      let userUpdatedData = {
       name: 'apiautomation-updated',
       status: 'inactive'
      };

      let updateResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData,AUTH_HEADER);
      expect(updateResponse.status).toBe(200);
      expect.soft(updateResponse.body.name).toBe(userUpdatedData.name);
      expect.soft(updateResponse.body.status).toBe(userUpdatedData.status);

      getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
      expect(getResponse.body.status).toBe(userUpdatedData.status);
      expect(getResponse.body.name).toBe(userUpdatedData.name);

    })

    test('Delete a test user',async({ apiHelper})=>{
      
      //1. Create a test user  
      let userResponse = await createUser(apiHelper);

      //2. Get a test user
      let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.name).toBe('api tester');

      //3. Delete a user

      let updateResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
      expect(updateResponse.status).toBe(204);


      getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
      expect(getResponse.status).toBe(404);
      expect(getResponse.body.message).toBe('Resource not found');

    })