import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { getErrorFormatter } from 'material/shared/utils/util';
import LoadingButton from 'material/shared/components/LoadingButton';

const useStyles = makeStyles((theme) =>
  createStyles({
    otherText: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),
      '& a': {
        paddingLeft: 8,
        textDecoration: 'none',
      },
    },
  })
);

const validationSchema = Yup.object({
  email: Yup.string()
    .label('Email address')
    .email('It should be valid email address!')
    .required('Required'),
  password: Yup.string()
    .label('Password')
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Props {
  onSubmit: (data: LoginFormData) => void;
  onIsDisabled?: (data: boolean) => void;
  loading: boolean;
  isDense?: 'dense' | 'none' | 'normal';
}

export const LoginForm = ({ onSubmit, onIsDisabled, loading, isDense }: Props) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched, isValid } =
    useFormik<LoginFormData>({
      initialValues: {
        email: '',
        password: '',
        rememberMe: true,
      },
      validationSchema,
      onSubmit,
    });

  const formatError = getErrorFormatter<LoginFormData>(touched, errors);

  useEffect(() => {
    if (onIsDisabled) {
      onIsDisabled(!touched?.email || !isValid);
    }
  }, [isValid, onIsDisabled, touched]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.type === 'change') {
      setFieldTouched('email');
    }
    handleChange(e);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <Grid item>
          <TextField
            label="Email Address"
            value={values.email}
            onChange={handleEmailChange}
            onBlur={() => setFieldTouched('email')}
            name="email"
            variant="outlined"
            fullWidth
            margin={isDense}
            autoComplete="new-email"
            required
            // autoFocus
            helperText={formatError('email')}
            error={touched.email && Boolean(errors.email)}
          />
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            fullWidth
            margin={isDense}
            error={touched.password && Boolean(errors.password)}
          >
            <InputLabel>Password *</InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={() => setFieldTouched('password')}
              autoComplete="current-password"
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
          <Typography variant="h6" align="right" className={classes.otherText}>
            <Link component={RouterLink} underline="none" to="/login" color="primary">
              Forgot password?
            </Link>
          </Typography>
        </Grid>
      </div>
      <div>
        <LoadingButton text="Log in" isLoading={loading} isDisabled={!touched?.email || !isValid} />
      </div>
      <Typography variant="h6" align="right" className={classes.otherText}>
        Don’t have an account?
        <Link component={RouterLink} underline="none" to="/signup" color="primary">
          Sign up for free
        </Link>
      </Typography>
    </form>
  );
};

LoginForm.defaultProps = {
  onIsDisabled: undefined,
  isDense: 'normal',
};

export default LoginForm;
