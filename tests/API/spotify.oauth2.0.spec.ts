import { test,expect } from '@playwright/test';
import { json } from 'node:stream/consumers';
import * as allure from "allure-js-commons";

let OAUTH_CONFIG = {

tokenURL: 'https://accounts.spotify.com/api/token',
client_id: process.env.OAUTH_CLIENT_ID!,
client_secret: process.env.OAUTH_CLIENT_SECRET,
grant_type: process.env.GRANT_TYPE 

}

let accessToken:string;

test.beforeEach('POST API - generate the access token',async({request})=>{

let response = await request.post(OAUTH_CONFIG.tokenURL,{
form:{

   grant_type:OAUTH_CONFIG.grant_type,
   client_id:OAUTH_CONFIG.client_id,
   client_secret: OAUTH_CONFIG.client_secret 
}

});

expect(response.status()).toBe(200);

let jsonResponse = await response.json();
console.log("Json response",jsonResponse);
accessToken=jsonResponse.access_token;


})


test('@regression get albums data test',async({ request })=>{
    
let baseUrl = 'https://api.spotify.com';
let endpointurl = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';

let albumResponse = request.get(`${baseUrl}${endpointurl}`,{

    headers:{Authorization:  `Bearer ${accessToken}`}
});

expect((await albumResponse).status()).toBe(200);
console.log((await albumResponse).json());

let jsonBody = await (await albumResponse).json();

console.log( jsonBody.total_tracks);
console.log(jsonBody.images.length);
expect(jsonBody.images.length).toBe(3);

})