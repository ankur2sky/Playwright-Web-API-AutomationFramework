import {test,expect} from '../../src/fixtures/apifixtures';

const token = process.env.API_TOKEN;
let userId:number;

let AUTH_HEADER={

    Authorization: `Bearer ${token}`

}

test.describe.serial("running end to end api test cases",()=>{

test('get details test case',async({apiHelper})=>{

    let response = await apiHelper.get('public/v2/users',AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);


})

test('post api create a fresh user',async({apiHelper})=>{

    let userData = {
    name: 'Test3',
    email: `pw_automation_${Date.now()}@open.com`,
    phone: '1333',
    status: 'active',
    gender: 'male'
    }

    let response = await apiHelper.post('public/v2/users',userData,AUTH_HEADER);
    expect(response.status).toBe(201);
    userId= response.body.id;
    console.log('created user id',userId);



})

test('put api update existing user',async({apiHelper})=>{

    let userData = {
    name: 'manish automation labs',
    status: 'inactive'
    }

    let response = await apiHelper.put(`public/v2/users/${userId}`,userData,AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(userData.status);

})

test('delete api - delete  existing user',async({apiHelper})=>{



    let response = await apiHelper.delete(`public/v2/users/${userId}`,AUTH_HEADER);
    expect(response.status).toBe(204);


})



})
