import { TechnicalTestPage } from './app.po';

describe('technical-test App', () => {
  let page: TechnicalTestPage;

  beforeEach(() => {
    page = new TechnicalTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
