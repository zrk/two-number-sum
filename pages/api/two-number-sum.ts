import { NextApiRequest, NextApiResponse } from 'next';
import { twoNumberSum } from 'services/twoNumberSum';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { n, s },
    method,
  } = req;

  if (method !== 'GET') {
    res.status(405).end(`Method ${method} not allowed, please use GET`);
    return;
  }

  const intArray = Array<string>()
    .concat(n) // one `n` or more, make it an array for sure
    .map((str) => str?.split(',')) // for `?n=1,2,3`
    .flat() // for `?n=1&n=2,3`
    .map(Number)
    .filter(Boolean); // remove non-numbers

  const isValidArray = intArray?.length > 1;
  if (!isValidArray) {
    res.status(400).end(`Array is not valid`);
    return;
  }

  const lastS = Array<string>().concat(s).pop();
  const sum = Number(lastS);

  if (lastS === '' || isNaN(sum)) {
    res.status(400).end(`Sum is not passed or not valid`);
    return;
  }

  const [first, second, ...other] = intArray;
  const array = [first, second, ...other] as const;

  res.status(200).json(twoNumberSum({ array, sum }));
};

export default handler;
