import { CapitalizedFirstLetterPipe } from './capitalized-first-letter.pipe';

describe('CapitalizedFirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizedFirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
