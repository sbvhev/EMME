import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Link as MaterialLink } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { getErrorFormatter } from 'material/shared/util';
import LoadingButton from 'material/shared/LoadingButton';

const useStyles = makeStyles((theme) =>
  createStyles({
    otherText: {
      fontSize: '14px',
      lineHeight: '16px',
      fontWeight: 'bold',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      '& a': {
        color: '#3772FF',
      },
    },
  })
);

const validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(30, 'Too Long!').required('Required'),
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
}

export const LoginForm = ({ onSubmit, onIsDisabled, loading }: Props) => {
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
            margin="dense"
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
              autoComplete={'current-password'}
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
          <Typography component="div" align="right" className={classes.otherText}>
            <MaterialLink component={Link} underline="none" to="/reset-password">
              Forgot password?
            </MaterialLink>
          </Typography>
        </Grid>
      </div>
      <div>
        <LoadingButton text="Log in" isLoading={loading} isDisabled={!touched?.email || !isValid} />
      </div>
      <Typography component="div" align="right" className={classes.otherText}>
        Don’t have an account?{' '}
        <MaterialLink component={Link} underline="none" to="/signup">
          Sign up for free
        </MaterialLink>
      </Typography>
    </form>
  );
};

LoginForm.defaultProps = {
  message: null,
  onIsDisabled: undefined,
};

export default LoginForm;
