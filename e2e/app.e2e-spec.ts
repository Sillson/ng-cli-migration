import { MigrationPage } from './app.po';

describe('migration App', function() {
  let page: MigrationPage;

  beforeEach(() => {
    page = new MigrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
