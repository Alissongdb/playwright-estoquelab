import type { Page } from '@playwright/test';

export class BasePage {
  constructor(private readonly initialWindow: Page) {}

  currentWindow(): Page {
    const openPages = this.initialWindow.context().pages().filter((page) => !page.isClosed());
    const currentWindow = openPages[openPages.length - 1];

    return currentWindow ?? this.initialWindow;
  }
}