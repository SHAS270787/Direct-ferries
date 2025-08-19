import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.directferries.co.uk/');
    await this.page.waitForLoadState('networkidle');
  }

  async acceptCookies() {
    const acceptBtn = this.page.getByRole('button', { name: 'Accept All' });
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
    }
  }

  async selectRoute() {
    await this.page.getByTestId('outbound-route-display').click();
    await this.page.getByTestId('Dover-Calais').click();
  }

  async selectVehicle() {
    await this.page.getByTestId('outbound-vehicle-display').click();
    await this.page.getByTestId('vehicle-list-type-2').click();
    await this.page.getByTestId('radio-button-abarth').click();
    await this.page.getByTestId('radio-button-500').click();
    await this.page.getByTestId('button-done').click();
  }

  async selectPassengers() {
    await this.page.getByTestId('outbound-passengers').click();
    await this.page.getByTestId('counter-increment-range-18+').getByTestId('add').click();
    await this.page.getByTestId('counter-increment-range-18+').getByTestId('add').click();
    await this.page.getByTestId('counter-increment-range-0-17').getByTestId('add').click();
    await this.page.getByTestId('select-age-0').selectOption('10');
    await this.page.getByTestId('button-done').click();
  }

  async submitSearch() {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.getByTestId('button-submit').click(),
    ]);
    await popup.waitForLoadState('domcontentloaded');
    return popup;
  }
}
