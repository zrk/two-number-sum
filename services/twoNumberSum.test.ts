import { twoNumberSum } from './twoNumberSum';

describe('twoNumberSum', () => {
  it('passes sample test', () => {
    const args = {
      array: [3, 5, -4, 8, 11, 1, -1, 6],
      sum: 10,
    } as const;
    expect(twoNumberSum(args)).toStrictEqual([-1, 11]);
  });

  it('result is sorted', () => {
    expect(twoNumberSum({ array: [-1, 11], sum: 10}))
      .toStrictEqual(twoNumberSum({ array: [11, -1], sum: 10}));
  });

  it('returns an empty array if no two numbers sum up', () => {
    const args = {
      array: [3, 5, -4, 8, 11, 1, -1, 6],
      sum: 100,
    } as const;
    expect(twoNumberSum(args)).toStrictEqual([]);
  });
});
