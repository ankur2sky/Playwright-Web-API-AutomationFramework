import { BasePage } from "./BasePage";
import {Locator, Page,test} from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class HomePage extends BasePage{

// Private locators
private readonly logOutlink: Locator;
private readonly headers:Locator;

constructor(page:Page){
super(page);

this.logOutlink= page.getByRole('link', { name: 'Logout' });
this.headers=page.getByRole('heading',{level:2});

}

async isLogoutLingexist():Promise<boolean>{

return await this.logOutlink.isVisible();

}

async collectHeader():Promise<string[]>{

    return await this.headers.allInnerTexts()

}






}
