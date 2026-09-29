import { APIRequestContext } from "@playwright/test"; 


export class apiHelper {

private readonly request : APIRequestContext;
private readonly baseurl : string;

constructor(request:APIRequestContext,baseurl:string){

this.request=request;
this.baseurl=baseurl;

}

// Get
async get(endPoint: string,headers?: Record<string,string>){
      
    let response = await this.request.get(`${this.baseurl}${endPoint}`,{

        headers:headers
    });
    console.log(await response.json(),response.status());
    return{
        status:response.status(),
        body: await response.json()
    }

}

// Post
async post(endPoint: string,data:object,headers?: Record<string,string>){
      
    let response = await this.request.post(`${this.baseurl}${endPoint}`,{
        headers: headers,
        data: data
    });

    return{
        status:response.status(),
        body: await response.json()
    }

}


// Put
async put(endPoint: string,data:object,headers?: Record<string,string>){
      
    let response = await this.request.put(`${this.baseurl}${endPoint}`,{
        headers: headers,
        data: data
    });
    
    return{
        status:response.status(),
        body: await response.json()
    }

}

// delete
async delete(endPoint: string,headers?: Record<string,string>){
      
    let response = await this.request.delete(`${this.baseurl}${endPoint}`,{
        headers: headers
   
    });

    return{
        status:response.status()
    }

}


}







