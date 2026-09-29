import { test, expect } from "../../src/fixtures/apifixtures";
import Ajv from 'ajv';
import addFormats from 'ajv-formats';


const token = process.env.API_TOKEN;

let AUTH_HEADER={

    Authorization: `Bearer ${token}`

}

// Setup AJV library

let ajv = new Ajv();
addFormats(ajv);

//Define json schema
let userSchema=
{
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
};

let userArraySchema = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer"
      },
      "name": {
        "type": "string"
      },
      "email": {
        "type": "string",
        "format": "email"
      },
      "gender": {
        "type": "string"
      },
      "status": {
        "type": "string"
      }
    },
    "required": [
      "id",
      "name",
      "email",
      "gender",
      "status"
    ]
  }
}

// write a test for schema testing
 
test('schema testing',async({ apiHelper })=>{

    let userData = {
    name: 'api tester',
    email: `api_automation_${Date.now()}@open.com`,
    phone: '1333',
    status: 'active',
    gender: 'male'
    };
    let response = await apiHelper.post(`public/v2/users`,userData,AUTH_HEADER);
    expect(response.status).toBe(201);

    let userId = response.body.id;
    console.log('Created user id :',userId);

    // Get a user
    let getUserresponse = await apiHelper.get(`public/v2/users/${userId}`,AUTH_HEADER);
    expect((getUserresponse.status)).toBe(200);

    //verify response schema
    let validate = ajv.compile(userSchema);
    let isSchemaValid= validate(getUserresponse.body);

    if(!isSchemaValid){

        console.log("SCHEMA ERROR :",validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

})


test('get all users schema testing',async({ apiHelper })=>{

    // Get a user
    let getUserresponse = await apiHelper.get(`public/v2/users`,AUTH_HEADER);
    expect((getUserresponse.status)).toBe(200);

    //verify response schema
    let validate = ajv.compile(userArraySchema);
    let isSchemaValid= validate(getUserresponse.body);

    if(!isSchemaValid){

        console.log("SCHEMA ERROR :",validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

})

