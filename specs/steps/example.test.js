import Example from 'src/controllers/Example';

describe('Arithmetic operations', () => {
  test('1 + 1 = 2', () => {
    const output = Example.sum(1, 2);

    expect(output).toBe(3);
  });
});
