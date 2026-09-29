import {test as BaseTest} from "@playwright/test";
import { apiHelper } from "../api/apihHelper";


// Define type for API Fixtures

type APIFixtures = {

    apiHelper: apiHelper;

}

export let test = BaseTest.extend<APIFixtures>({

     apiHelper: async( { request},use )=>{
    
        let apiHelperInstance = new apiHelper(request,process.env.API_BASE_URL!);
        await use(apiHelperInstance);
    }


})

 export { expect } from  '@playwright/test';
