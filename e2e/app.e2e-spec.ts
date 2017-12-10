import { AppPage } from './app.po';

describe('angular-snippets App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display rxjs recursive observable intro', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Recursive Observable');
  });
});
