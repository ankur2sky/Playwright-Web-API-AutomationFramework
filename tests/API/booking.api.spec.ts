import { test,expect } from '../../src/fixtures/apifixtures';

let tokenId: string;


// get token id

test.beforeEach(' get token id',async({ request })=>{

    let creds = {
      "username" : "admin",
    "password" : "password123"

    }

    let authResponse = await request.post('https://restful-booker.herokuapp.com/auth',
        {
    headers: {'Content-Type':'application/json'},
    data: creds
    }

)

    expect(authResponse.status()).toBe(200);
    let jsonResponse = await authResponse.json();
    console.log(jsonResponse)
    tokenId= jsonResponse.token;
})

    test('@regression Booking crud with token', async({ request }) => {

// create a new booking
let bookingResponse = await request.post("https://restful-booker.herokuapp.com/booking",{
 headers: {'Content-Type': 'application/json'},
 data: {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}  

})

expect((await bookingResponse).status()).toBe(200)
let bookingjson = await (await bookingResponse).json();
let bookingId = bookingjson.bookingid;
console.log('booking id',bookingId);

//Update a booking by booking id

let updatedResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
{headers: {Cookie: `token=${tokenId}`},
data: {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 121,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Lunch"
}  


    }  ) 
    
expect(updatedResponse.status()).toBe(200);
let updatedJson = await updatedResponse.json();
expect(await updatedJson.totalprice).toBe(121);
expect(await updatedJson.additionalneeds).toBe("Lunch");
    
})