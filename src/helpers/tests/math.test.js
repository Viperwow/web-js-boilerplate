import {
  mult,
  sum,
} from 'src/helpers/math';

jest.unmock('src/helpers/math');

describe('Math', () => {
  test('1 + 1 = 2', () => {
    const output = sum(1, 1);

    expect(output)
      .toBe(2);
  });

  test('2 * 2 = 4', () => {
    const output = mult(2, 2);

    expect(output)
      .toBe(4);
  });
});