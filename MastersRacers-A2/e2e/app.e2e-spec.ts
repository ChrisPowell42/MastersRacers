import { MastersRacersA2Page } from './app.po';

describe('masters-racers-a2 App', () => {
  let page: MastersRacersA2Page;

  beforeEach(() => {
    page = new MastersRacersA2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
