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
      fontSize: '14px',
      lineHeight: '16px',
      fontWeight: 'bold',
      '& a': {
        color: '#3772FF',
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
          <Typography component="div" className={classes.otherText}>
            By signing up I agree that I’m 18 years of age or older, to the{' '}
            <Link href="http://www.google.com" target="_blank" rel="noreferrer" underline="none">
              User Agreements, Privacy Policy, Cookie Policy, E-Sign Consent.
            </Link>
          </Typography>
        }
      />
      <FormHelperText error>{touched && errors ? errors : '\xA0'}</FormHelperText>
    </>
  );
};

export default TermsCheckbox;
