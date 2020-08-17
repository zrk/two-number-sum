import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

interface Props extends DialogProps {
  sum: string;
  result?: string;
  error?: string;
  onClose(): void;
}

export const Modal: React.FC<Props> = ({
  sum,
  result,
  error,
  open,
  onClose,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>
      {error ? (
        <Box color="error.main">Error</Box>
      ) : result ? (
        `Two numbers making ${sum}:`
      ) : (
        `Processing...`
      )}
    </DialogTitle>
    <DialogContent>
      {error || result ? (
        <DialogContentText>{error || result}</DialogContentText>
      ) : (
        <LinearProgress />
      )}
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={onClose} color="primary">
        {error ? 'Close' : result ? 'Ok' : 'Cancel'}
      </Button>
    </DialogActions>
  </Dialog>
);
