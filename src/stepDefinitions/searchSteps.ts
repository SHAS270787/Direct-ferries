import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { SearchPage } from '../pageObjects/SearchPage';

let searchPage: SearchPage;
let page: Page;

Given('I navigate to the Direct Ferries homepage', async function () {
  page = this.page; // from your custom World if you have one
  searchPage = new SearchPage(page);
  await searchPage.goto();
  await searchPage.acceptCookies();
});

When('I select the Dover route', async function () {
  await searchPage.selectRoute();
});

When('I select a vehicle', async function () {
  await searchPage.selectVehicle();
});

When('I select 1 child', async function () {
  await searchPage.selectPassengers();
});

When('I click the Search button', async function () {
  const popup = await searchPage.submitSearch();
  console.log('Popup URL:', popup.url());
});

Then('I should see search results', async function () {
  // You can add an assertion if needed
  expect(await page.title()).toContain('Direct Ferries');
});
