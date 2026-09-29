import { Page,Locator } from "@playwright/test";


export class BasePage
{
protected readonly page:Page;
protected readonly logo: Locator;
protected readonly searchBox: Locator;
protected readonly searchIcon: Locator;
protected readonly footerLinks: Locator;
protected readonly currency: Locator;
protected readonly cartButton: Locator;


constructor(page:Page){
    this.page=page;

    this.logo = page.getByRole('img', { name: 'naveenopencart' });
    this.searchBox = page.getByRole('textbox', { name: 'Search' });
    this.searchIcon = page.locator('div#search button');
    this.currency = page.locator('form#form-currency');
    this.cartButton = page.locator('div#cart button');
    this.footerLinks = page.locator('footer a');
}


async isLogoVisible() : Promise<boolean> {
 return await this.logo.isVisible();

}

async isSearchBoxVisible() : Promise<boolean> {
 return await this.searchBox.isVisible();

}

async currencyVisible() : Promise<boolean> {
 return await this.currency.isVisible();

}

async CartButtonVisible() : Promise<boolean> {
 return await this.cartButton.isVisible();

}

async getPageFooters() : Promise<string[]> {
 return await this.footerLinks.allInnerTexts();

}

async getPageFooterscount() : Promise<number> {
 return await this.footerLinks.count();

}

async getPageTitle(): Promise<string> {
    return await this.page.title();
}

async getPageCurrentTitle(): Promise<string> {
    return await this.page.url();
}

async waitForPageLoad() {
    await this.page.waitForLoadState('load');
}









}