import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import wretch from 'wretch';

import { Modal } from './Modal';
import { ArrayInput } from './ArrayInput';

export function App() {
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
    setModalOpen(true);
    wretch('http://localhost:3000/api/two-number-sum')
      .query({ n: array, s: sum })
      .get()
      .json((j) => setResult(j[1] ? `${j[0]}, ${j[1]}` : 'not found'))
      .catch((error) => setError(`${error.status} - ${error.text}`));
  }, [setModalOpen, setResult, array, sum]);

  const handleModalClose = React.useCallback(() => setModalOpen(false), [
    setModalOpen,
  ]);

  return (
    <Grid container justify="center" direction={'column'} spacing={2}>
      <Grid item xs={12}>
        <Box textAlign={'center'} m={2}>
          [{array.filter(Boolean).join(', ')}]
        </Box>
      </Grid>
      <Grid container item justify="center" spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper variant="outlined">
            <ArrayInput value={array} onChange={setArray} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            variant="outlined"
            label="Sum"
            value={sum}
            type="tel"
            required
            onChange={handleChangeSum}
          />
          <FormControl fullWidth margin="normal">
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Find two numbers
            </Button>
          </FormControl>
          <Modal
            sum={sum}
            result={result}
            error={error}
            onClose={handleModalClose}
            open={modalOpen}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
