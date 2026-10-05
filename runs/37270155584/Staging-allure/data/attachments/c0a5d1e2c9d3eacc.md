# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Web/homepagefixtures.spec.ts >> @smoke App logo exist on Login Page
- Location: tests/Web/homepagefixtures.spec.ts:33:1

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | import { Locator,Page} from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | export class LoginPage extends BasePage {
  5  | 
  6  | //1. private locators
  7  | private readonly emailId:Locator;
  8  | private readonly password:Locator;
  9  | private readonly login:Locator;
  10 | private readonly forgotttenPassword:Locator;
  11 | private readonly loginPageErrorMessage:Locator;
  12 | private readonly newCustomerHeadingTitle:Locator;
  13 | private readonly returningCustomertext:Locator;
  14 | 
  15 | 
  16 | //2. constructor of page class = initialise the locator
  17 |  constructor(page:Page){
  18 |  super(page);
  19 |  this.emailId= page.getByRole('textbox', { name: 'E-Mail Address' });
  20 |  this.password=page.getByLabel('Password');
  21 |  this.login=page.getByRole('button', { name: 'Login' });
  22 |  this.forgotttenPassword=page.getByRole('link', { name: 'Forgotten Password' }).first();
  23 |  this.loginPageErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
  24 |  this.newCustomerHeadingTitle=page.getByRole('heading', { name: 'New Customer', level: 2 });
  25 |  this.returningCustomertext=page.locator('#content > div.row > div.col-sm-6:nth-of-type(2) > div.well > p > strong');
  26 | 
  27 |  }
  28 | 
  29 |  // public page actions /method behaviour of the page : Encapsulation
  30 |  async goToLoginPage():Promise<void>
  31 |  {
> 32 |     await this.page.goto('opencart/index.php?route=account/login');
     |                     ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  33 | 
  34 |  }
  35 | 
  36 |  async loginPageTitle():Promise<string>{
  37 | 
  38 |     return await this.page.title();
  39 |  }
  40 | 
  41 | async isForgottenPasswordLinkExist(){
  42 | 
  43 |     return await this.forgotttenPassword.isVisible()
  44 | 
  45 | 
  46 | }
  47 | 
  48 | async doLogin(username:string,password:string):Promise<void>
  49 | {
  50 | console.log(`User credential: ${username} - ${password}`); 
  51 | await this.emailId.fill(username);
  52 | await this.password.fill(password);
  53 | await this.login.click();
  54 | 
  55 | }
  56 | 
  57 | async isinValiderrorDisplayed(): Promise<boolean>{
  58 |  console.log(await this.loginPageErrorMessage.allInnerTexts());
  59 |  return await this.loginPageErrorMessage.isVisible();
  60 | 
  61 | }
  62 | 
  63 | async newCustomerHeading():Promise<boolean>{
  64 |  return await this.newCustomerHeadingTitle.isVisible();
  65 | 
  66 | }
  67 | 
  68 | async returningCustomertextValidation():Promise<boolean>{
  69 | 
  70 |    console.log(await this.returningCustomertext.allInnerTexts());
  71 |    return await this.returningCustomertext.isVisible();
  72 | 
  73 | }
  74 | 
  75 | }
```