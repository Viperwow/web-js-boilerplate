import uuidv4 from 'uuid/v4';
import {
  mult,
  sum,
} from 'src/helpers/math';
import {generateUUID} from 'src/helpers/utility';

jest.unmock('uuid/v4');
jest.unmock('src/helpers/math');
jest.unmock('src/helpers/utility');

describe('Math', () => {
  test('1 + 1 = 2', () => {
    const output = sum(1, 1);

    expect(output).toBe(2);
  });

  test('2 * 2 = 4', () => {
    const output = mult(2, 2);

    expect(output).toBe(4);
  });
});

describe('Utility', () => {
  test('uuid differs', () => {
    const output = generateUUID();

    expect(output).not.toBe(uuidv4());
  });
});
