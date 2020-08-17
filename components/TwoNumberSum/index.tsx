import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box, { BoxProps } from '@material-ui/core/Box';
import wretch from 'wretch';

import { Modal } from './Modal';
import { ArrayInput } from './ArrayInput';

const ColumnBox = (props: BoxProps) => (
  <Box width={300} margin={1} {...props} />
);

export const TwoNumberSum: React.FC = () => {
  const [array, setArray] = React.useState(['12', '22', '33']);
  const [sum, setSum] = React.useState('');
  const [result, setResult] = React.useState('');
  const [error, setError] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleChangeSum = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSum(e.target.value),
    [setSum]
  );

  const handleSubmit = React.useCallback(() => {
    setResult('');
    setError('');
    setModalOpen(true);
    wretch('/api/two-number-sum')
      .query({ n: array, s: sum })
      .get()
      .json((j) => setResult(j[1] ? `${j[0]}, ${j[1]}` : 'not found'))
      .catch((error) => setError(`${error.status} - ${error.text}`));
  }, [setModalOpen, setResult, array, sum]);

  const handleModalClose = React.useCallback(() => setModalOpen(false), [
    setModalOpen,
  ]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box textAlign="center" m={2}>
        [{array.filter(Boolean).join(', ')}]
      </Box>

      <Box display="flex" justifyContent="center" flexWrap="wrap">
        <ColumnBox>
          <Paper variant="outlined">
            <Box maxHeight={500} overflow="auto">
              <ArrayInput value={array} onChange={setArray} />
            </Box>
          </Paper>
        </ColumnBox>

        <ColumnBox>
          <TextField
            key="Sum"
            fullWidth
            variant="outlined"
            label="Sum"
            value={sum}
            type="tel"
            onChange={handleChangeSum}
          />
          <Box clone mt={2}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Find two numbers
          </Button>
          </Box>
          <Modal
            sum={sum}
            result={result}
            error={error}
            onClose={handleModalClose}
            open={modalOpen}
          />
        </ColumnBox>
      </Box>
    </Box>
  );
};

export default TwoNumberSum;
