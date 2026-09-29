import { BasePage } from "./BasePage";
import {Locator, Page,test} from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class HomePage extends BasePage{

// Private locators
private readonly logOutlink: Locator;
private readonly headers:Locator;
private readonly searchBox:Locator;
private readonly searchButton:Locator;


constructor(page:Page){
super(page);

this.logOutlink= page.getByRole('link', { name: 'Logout' });
this.headers=page.getByRole('heading',{level:2});
this.searchBox=page.getByRole('textbox', { name: 'Search' });
this.searchButton=page.locator('#search button');

}

async isLogoutLinkexist():Promise<boolean>{

return await this.logOutlink.isVisible();

}

async collectHeader():Promise<string[]>{

    return await this.headers.allInnerTexts()

}
 async HomePageTitle():Promise<string>{

    return await this.page.title();
 }

  async doSearch(searchKey: string):Promise<void>{
  console.log('search key: ',searchKey);
  await this.searchBox.fill(searchKey);
  await this.searchButton.click();
 }





}
