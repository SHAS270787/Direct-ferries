import { Locator, Page } from '@playwright/test';

/**
 * Waits for the element to be visible, enabled, and stable, then clicks it.
 */
export async function safeClick(locator: Locator) {
  await locator.waitFor({ state: 'visible' });
  await locator.evaluate((el: HTMLElement) => el.scrollIntoView({ block: 'center' }));
  await locator.page().waitForFunction((el) => el && !el.getAttribute('disabled'), await locator.elementHandle());
  await locator.click();
}

/**
 * Waits for a select element and selects a value.
 */
export async function safeSelect(locator: Locator, value: string) {
  await locator.waitFor({ state: 'visible' });
  await locator.page().waitForFunction((el) => el !== null && !el.getAttribute('disabled'), await locator.elementHandle());
  await locator.selectOption(value);
}

/**
 * Waits for a popup to open after a click action.
 */
export async function clickAndWaitForPopup(page: Page, locator: Locator) {
  const [popup] = await Promise.all([page.waitForEvent('popup'), locator.click()]);
  await popup.waitForLoadState('domcontentloaded');
  return popup;
}

/**
 * Waits for an element to be enabled (useful for buttons like "Done").
 */
export async function waitUntilEnabled(locator: Locator) {
  await locator.waitFor({ state: 'visible' });
  await locator.page().waitForFunction((btn) => !btn.isDisabled, locator);
}
