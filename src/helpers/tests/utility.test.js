import {generateUUID} from 'src/helpers/utility';
import uuidv4 from 'uuid/v4';

jest.unmock('uuid/v4');
jest.unmock('src/helpers/utility');

describe('Utility', () => {
  test('uuid differs', () => {
    const output = generateUUID();

    expect(output)
      .not
      .toBe(uuidv4());
  });
});
