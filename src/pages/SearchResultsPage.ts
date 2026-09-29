import { Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {

private readonly searchHeading: Locator;
private readonly searchResults:Locator;

constructor(page:Page){
 super(page)

 this.searchHeading=page.getByRole('heading', { name: 'Search - iphone', level: 1 });
 this.searchResults=page.locator('div.product-layout');


}

// page actions

async productSearchResultCount(): Promise<number>{

    return await this.searchResults.count();

}

async productHeading(){
 
   return this.searchHeading.textContent();

}

async selectProduct(productName:string){
console.log('product name',productName);
await this.page.getByRole('link',{name:productName,exact:true}).first().click();

}


}