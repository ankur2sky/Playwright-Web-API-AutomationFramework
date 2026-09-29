import { Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    private readonly productInfoSearchResultHeading:Locator;
    private readonly productImagescount:Locator;
    private readonly productMetadata:Locator;
    private readonly productPricing:Locator;
    private productInfoMap:Map<string,string|number>;
    

    constructor(page:Page){
     super(page);
     
     this.productInfoSearchResultHeading=page.getByRole('heading', {level: 1});
     this.productImagescount=page.locator('div#content li img');
     this.productMetadata=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
     this.productPricing=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
     this.productInfoMap = new Map<string,string|number>();

    }

    async getProductHeader() :Promise<string> 
    {
        return await this.productInfoSearchResultHeading.innerText();
    }

    async getProductImages() : Promise<number> {
     return await this.productImagescount.count();
        
    }

       private async getProductMetadata():Promise<void>  {
    
       let metaData= await this.productMetadata.allInnerTexts();
       for(let data of metaData)
       {
        let meta = data.split(':');
        let metakey = meta[0].trim();
        let metaValue=meta[1].trim();
        this.productInfoMap.set(metakey,metaValue);

       }

    }

        private async getProductPriceData() {
     
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.productInfoMap.set('productPrice',productPrice);
        this.productInfoMap.set('ExtTaxPrice',exTaxPrice);


    }


    async  getWholeProductInfo(){

    this.productInfoMap.set('productHeader',await this.getProductHeader());
    this.productInfoMap.set('productImagescount',await this.getProductImages());
    await this.getProductMetadata();
    await this.getProductPriceData();
    return this.productInfoMap;

    }




}