import React, { useEffect, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Box,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  Typography,
  FormControl,
  TextField,
  Grid,
} from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AlertContext from 'context/alert/alertContext';
import AddIcon from '@material-ui/icons/Add';
import { getErrorFormatter } from 'material/shared/utils/util';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { createCredentials, fetchCredentials, resetMessage } from 'stores/reducers/users';

const validationSchema = yup.object({
  secret: yup.string().required('Please input your client id'),
  key: yup.string().required('Please input API Key'),
});

export interface ApiAccessType {
  exchangeId: string;
  secret: string;
  key: string;
}

interface Props {
  exchange: string;
  handleChangeExchange: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    subTitle: {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '32px',
      margin: '0 0 24px',
    },
    btnOutlineGeneral: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '16px',
      padding: '8px 16px',
      borderRadius: '90px',
      margin: '0 0',
    },
    yourApiKeys: {
      marginBottom: '48px',
    },
    formGroup: {
      marginBottom: '24px',
      width: '100%',
    },
    formControl: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    iconRemove: {
      width: '14px',
      marginLeft: '17px',
      padding: '0',
    },
    inputCustom: {
      width: '100%',

      '& .MuiInputBase-root': {
        height: '48px',
        fontSize: '14px',
        lineHeight: '24px',
        fontWeight: 500,
        padding: '12px 16px',
        borderRadius: '12px',
      },

      '& .MuiInputBase-input': {
        padding: 0,
      },
    },
    selectBox: {
      width: '100%',
      borderRadius: '12px',
      padding: 0,
    },
    select: {
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 500,
      padding: 0,
    },
    iconSelect: {
      right: '10px',
    },
    outlineSelect: {
      padding: '12px 16px !important',

      // paddingLeft: "0 !important",
    },
    formLabel: {
      fontSize: '12px',
      lineHeight: '12px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      margin: '0 0 12px',
      display: 'flex',
    },
  })
);

const Exchange: React.FC<Props> = ({ exchange, handleChangeExchange }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { errors: alertErrors, success } = useAppSelector((state) => state.users);
  const { exchanges } = useAppSelector((state) => state.exchange);

  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    dispatch(fetchCredentials());
  }, [dispatch]);

  useEffect(() => {
    if (alertErrors) {
      setAlert(alertErrors || 'Unknown error', 'error');
    }

    if (success) {
      setAlert(success, 'success', 2500);
    }

    dispatch(resetMessage());

    // eslint-disable-next-line
  }, [alertErrors, success]);

  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched } = useFormik<
    Pick<ApiAccessType, 'exchangeId' | 'secret' | 'key'>
  >({
    initialValues: {
      exchangeId: '',
      secret: '',
      key: '',
    },
    validationSchema,
    onSubmit: ({ secret, key }) => {
      dispatch(
        createCredentials({
          exchangeId: exchange,
          secret,
          key,
        })
      );
    },
  });

  const formatError = getErrorFormatter<ApiAccessType>(touched, errors);

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Box className={classes.yourApiKeys}>
        <Typography variant="h4" className={classes.subTitle}>
          Your API keys
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              fullWidth
              error={touched.exchangeId && Boolean(errors.exchangeId)}
            >
              <InputLabel>Exchange</InputLabel>
              <Select
                name="exchangeId"
                label="Exchange"
                variant="outlined"
                value={exchange}
                onChange={handleChangeExchange}
                required
              >
                {exchanges?.map((m) => (
                  <MenuItem value={m.id}>{m.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText color="secondary">{formatError('exchangeId')}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="secret"
              type="text"
              value={values.secret}
              onChange={handleChange}
              onBlur={() => setFieldTouched('secret')}
              autoComplete="secret"
              label="Client ID"
              variant="outlined"
              required
              helperText={formatError('secret')}
              error={touched.secret && Boolean(errors.secret)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="key"
              type="text"
              value={values.key}
              variant="outlined"
              onChange={handleChange}
              onBlur={() => setFieldTouched('key')}
              autoComplete="key"
              required
              label="API Key"
              helperText={formatError('key')}
              error={touched.key && Boolean(errors.key)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              classes={{
                outlined: classes.btnOutlineGeneral,
              }}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Submit API
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Exchange;
