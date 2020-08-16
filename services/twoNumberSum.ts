type Arg = {
  array: readonly [number, number, ...number[]];
  sum: number;
};

type Output = [number, number] | [];

export function twoNumberSum({ array, sum }: Arg): Output {
  const map: { [key: number]: true } = {};

  for (let i = 0; i < array.length; i++) {
    const diff = sum - array[i];
    if (diff in map)
      return array[i] < diff ? [array[i], diff] : [diff, array[i]];

    map[array[i]] = true;
  }

  return [];
}
