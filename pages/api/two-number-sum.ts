import { NextApiRequest, NextApiResponse } from 'next';
import { twoNumberSum } from 'services/twoNumberSum';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { n, s },
    // method,
  } = req;

  // console.log(array[2]);

  const intArray = Array<string>()
    .concat(n) // one or more `n`, make it array for sure
    .map((str) => str?.split(',')) // for `?n=1,2,3`
    .flat() // for `?n=1&n=2,3`
    .map(Number)
    .filter(Boolean); // remove non-numbers
  const isValidArray = intArray?.length > 1

  const sum = Number(s);

  if ( !isValidArray || isNaN(sum)) {
    res.status(400).end();
    return;
  }

  const [first, second, ...other] = intArray;
  const array = [first, second, ...other] as const;

  res.statusCode = 200;
  res.json(twoNumberSum({ array, sum }));

  // res.json({
  //   n,
  //   array,
  //   s,
  //   sum,
  //   method,
  //   result: twoNumberSum({ array, sum }),
  // });
};

export default handler;
