import { DevfestmnPage } from './app.po';

describe('devfestmn App', function() {
  let page: DevfestmnPage;

  beforeEach(() => {
    page = new DevfestmnPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
