import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

type Elenment = string;

type Props = {
  value: Elenment[];
  onChange(value: Elenment[]): void;
};

export const ArrayInput: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = React.useCallback(
    (i) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newArray = value.slice();
      newArray[i] =
        ['', '+', '-'].includes(e.target.value?.trim())
          ? e.target.value
          : isNaN(Number(e.target.value))
          ? value[i]
          : e.target.value;
      onChange(newArray);
    },
    [onChange, value]
  );

  const handleDelete = React.useCallback(
    (i) => () => {
      const newArray = value.filter((_, index) => index !== i);
      onChange(newArray);
    },
    [onChange, value]
  );

  const handleAdd = React.useCallback(
    (i) => () => {
      const newArray = value.slice();
      newArray.splice(i, 0, '');
      onChange(newArray);
    },
    [onChange, value]
  );

  const isDeleteDisabled = React.useMemo(() => value.length <= 2, [
    value.length,
  ]);

  return (
    <List>
      {value.map((el, i) => (
        <ListItem key={i}>
          <TextField
            value={el}
            onChange={handleChange(i)}
            type="tel"
            fullWidth
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={handleDelete(i)}
              disabled={isDeleteDisabled}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <ListItem key="new" alignItems="center">
        <Button onClick={handleAdd(value.length)} fullWidth>
          <AddIcon />
        </Button>
      </ListItem>
    </List>
  );
};
