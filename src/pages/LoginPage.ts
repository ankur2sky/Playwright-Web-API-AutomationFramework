import { Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

//1. private locators
private readonly emailId:Locator;
private readonly password:Locator;
private readonly login:Locator;
private readonly forgotttenPassword:Locator;
private readonly loginPageErrorMessage:Locator;
private readonly newCustomerHeadingTitle:Locator;
private readonly returningCustomertext:Locator;


//2. constructor of page class = initialise the locator
 constructor(page:Page){
 super(page);
 this.emailId= page.getByRole('textbox', { name: 'E-Mail Address' });
 this.password=page.getByLabel('Password');
 this.login=page.getByRole('button', { name: 'Login' });
 this.forgotttenPassword=page.getByRole('link', { name: 'Forgotten Password' }).first();
 this.loginPageErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
 this.newCustomerHeadingTitle=page.getByRole('heading', { name: 'New Customer', level: 2 });
 this.returningCustomertext=page.locator('#content > div.row > div.col-sm-6:nth-of-type(2) > div.well > p > strong');

 }

 // public page actions /method behaviour of the page : Encapsulation
 async goToLoginPage():Promise<void>
 {
    await this.page.goto('opencart/index.php?route=account/login');

 }

 async loginPageTitle():Promise<string>{

    return await this.page.title();
 }

async isForgottenPasswordLinkExist(){

    return await this.forgotttenPassword.isVisible()


}

async doLogin(username:string,password:string):Promise<void>
{
console.log(`User credential: ${username} - ${password}`); 
await this.emailId.fill(username);
await this.password.fill(password);
await this.login.click();

}

async isinValiderrorDisplayed(): Promise<boolean>{
 console.log(await this.loginPageErrorMessage.allInnerTexts());
 return await this.loginPageErrorMessage.isVisible();

}

async newCustomerHeading():Promise<boolean>{
 return await this.newCustomerHeadingTitle.isVisible();

}

async returningCustomertextValidation():Promise<boolean>{

   console.log(await this.returningCustomertext.allInnerTexts());
   return await this.returningCustomertext.isVisible();

}

}