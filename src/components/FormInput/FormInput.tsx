import React, { useState } from 'react';
import {
  Input,
  FormHelperText,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { withStyles, alpha, makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const FormInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 14,
    height: 48,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    width: '100%',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  formControl: {
    minHeight: theme.spacing(3),
  },
}))(Input);

const useStyles = makeStyles((theme) => ({
  helperText: {
    minHeight: 16,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {},
  form: {
    flex: 1,
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export interface FormInputControlProps {
  touched?: boolean;
  error?: string | any;
  value?: string;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange?: (e: React.ChangeEvent<any>) => void;
  label: string;
  name: string;
  id: string;
  placeholder: string;
  type?: string;
}

interface State {
  showPassword: boolean;
}

const FormInputControl = ({
  touched,
  error,
  value,
  handleBlur,
  handleChange,
  label,
  name,
  id,
  placeholder,
  type,
}: FormInputControlProps) => {
  const classes = useStyles();

  const [values, setValues] = useState<State>({
    showPassword: type !== 'password',
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl
      fullWidth
      className={classes.form}
      focused={false}
      error={touched && Boolean(error)}
    >
      <InputLabel shrink className={classes.label} htmlFor={id}>
        {label}
      </InputLabel>
      <FormInput
        id={id}
        name={name}
        type={values.showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        disableUnderline={!touched || !error}
        error={touched && Boolean(error)}
        onBlur={handleBlur}
        onChange={handleChange}
        endAdornment={
          type !== 'password' ? (
            <></>
          ) : (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? (
                  <Visibility style={{ fill: '#777E90' }} />
                ) : (
                  <VisibilityOff style={{ fill: '#777E90' }} />
                )}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      <FormHelperText className={classes.helperText}>{touched && error}</FormHelperText>
    </FormControl>
  );
};

export default FormInputControl;
