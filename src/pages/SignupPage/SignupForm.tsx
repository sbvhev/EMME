import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link as MaterialLink } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { getErrorFormatter } from 'material/shared/util';
import LoadingButton from 'material/shared/LoadingButton';
import TermsCheckbox from 'material/shared/TermsCheckbox';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>
  createStyles({
    otherText: {
      fontSize: '14px',
      lineHeight: '16px',
      fontWeight: 'bold',
      marginTop: '32px',
      marginBottom: theme.spacing(2),
      '& a': {
        color: '#3772FF',
      },
    },
  })
);

const validationSchema = Yup.object({
  email: Yup.string().email('It should be valid email address!').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  password: Yup.string()
    .label('Password')
    .min(8, 'Length must be at least 8 letters!')
    .max(50, 'Length must be less than 50 letters!')
    .required(),
  confirmPassword: Yup.string().when('password', (password: string, field) => {
    if (!password) return field;
    return field
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match');
  }),
  termsOfService: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

export interface SignupFormData {
  termsOfService: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  onSubmit: (data: Pick<SignupFormData, 'email' | 'firstName' | 'lastName' | 'password'>) => void;
  loading: boolean;
}

const SignupForm = ({ onSubmit, loading }: SignupFormProps) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched, isValid } =
    useFormik<SignupFormData>({
      initialValues: {
        termsOfService: false,
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: ({ email, firstName, lastName, password }) =>
        onSubmit({ email, firstName, lastName, password }),
    });

  const formatError = getErrorFormatter<SignupFormData>(touched, errors);

  const touchAllFields = () => {
    setFieldTouched('email');
    setFieldTouched('firstName');
    setFieldTouched('lastName');
    setFieldTouched('password');
    setFieldTouched('confirmPassword');
    setFieldTouched('termsOfService');
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div>
        <Grid item>
          <TextField
            label="Email Address"
            value={values.email}
            onChange={handleChange}
            onBlur={() => setFieldTouched('email')}
            name="email"
            variant="outlined"
            fullWidth
            margin="dense"
            autoComplete="new-email"
            required
            autoFocus
            helperText={formatError('email')}
            error={touched.email && Boolean(errors.email)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={() => setFieldTouched('firstName')}
            name="firstName"
            variant="outlined"
            fullWidth
            margin="dense"
            autoComplete="new-firstName"
            required
            helperText={formatError('firstName')}
            error={touched.firstName && Boolean(errors.firstName)}
            inputProps={{
              maxLength: 15,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={() => setFieldTouched('lastName')}
            name="lastName"
            variant="outlined"
            fullWidth
            margin="dense"
            autoComplete="new-lastName"
            required
            helperText={formatError('lastName')}
            error={touched.lastName && Boolean(errors.lastName)}
            inputProps={{
              maxLength: 15,
            }}
          />
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            fullWidth
            margin="dense"
            error={touched.password && Boolean(errors.password)}
          >
            <InputLabel>Password *</InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={() => setFieldTouched('password')}
              autoComplete="new-password"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disableRipple
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password *"
            />
            <FormHelperText color="secondary" error={touched.password && Boolean(errors.password)}>
              {formatError('password')}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            label="Confirm password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={() => setFieldTouched('confirmPassword')}
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="dense"
            autoComplete="new-confirmPassword"
            required
            helperText={formatError('confirmPassword')}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          />
        </Grid>
        <Grid item>
          <TermsCheckbox
            touched={Boolean(touched.termsOfService)}
            values={values.termsOfService}
            handleChange={handleChange}
            errors={errors.termsOfService || ''}
            setFieldTouched={() => setFieldTouched('termsOfService')}
          />
        </Grid>
      </div>
      <div
        role="button"
        onClick={() => touchAllFields()}
        onKeyPress={() => touchAllFields()}
        tabIndex={-1}
      >
        <LoadingButton
          text="Create an account"
          isLoading={loading}
          isDisabled={!touched?.email || !isValid}
        />
      </div>
      <Typography component="div" align="right" className={classes.otherText}>
        Already have an account?{' '}
        <MaterialLink component={Link} underline="none" to="/login">
          Login
        </MaterialLink>
      </Typography>
    </form>
  );
};

export default SignupForm;
