import { ContactsProjectPage } from './app.po';

describe('contacts-project App', () => {
  let page: ContactsProjectPage;

  beforeEach(() => {
    page = new ContactsProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
