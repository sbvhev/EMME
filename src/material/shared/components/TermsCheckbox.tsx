import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>
  createStyles({
    otherText: {
      color: theme.palette.neutralsFour.main,
      '& a': {
        fontWeight: 500,
        paddingLeft: 8,
        textDecoration: 'none',
      },
    },
  })
);

interface Props {
  touched: boolean;
  values: boolean;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  errors: string;
  setFieldTouched: () => void;
}

const TermsCheckbox = ({ touched, values, handleChange, errors, setFieldTouched }: Props) => {
  const classes = useStyles();

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={values}
            onChange={handleChange}
            name="termsOfService"
            required
            onBlur={setFieldTouched}
          />
        }
        label={
          <Typography variant="caption" className={classes.otherText} align="justify">
            By signing up I agree that I’m 18 years of age or older, to the
            <Link href="http://www.google.com" target="_blank" rel="noreferrer" color="textPrimary">
              User Agreements, Privacy Policy, Cookie Policy, E-Sign Consent.
            </Link>
          </Typography>
        }
        style={{ marginRight: 0, minWidth: '100%' }}
      />
      <FormHelperText error>{touched && errors ? errors : '\xA0'}</FormHelperText>
    </>
  );
};

export default TermsCheckbox;
