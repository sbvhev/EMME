import React from "react";
import {
  Input,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { withStyles, alpha, makeStyles } from "@material-ui/core/styles";

const FormInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 14,
    height: 48,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
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
    fontWeight: "bold",
  },
  input: {},
  form: {
    flex: 1,
    display: "flex",
  },
}));

export interface FormInputControlProps {
  touched?: boolean;
  error?: string;
  value?: string;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  handleChange?: (e: React.ChangeEvent<any>) => void;
  label: string;
  name: string;
  id: string;
  placeholder: string;
  type?: string;
}

const FormInputControl: React.FC<FormInputControlProps> = (props) => {
  const classes = useStyles();
  const {
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
  } = props;

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
        type={type}
        placeholder={placeholder}
        value={value}
        disableUnderline={!touched || !Boolean(error)}
        error={touched && Boolean(error)}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <FormHelperText className={classes.helperText}>
        {touched && error}
      </FormHelperText>
    </FormControl>
  );
};

export default FormInputControl;
