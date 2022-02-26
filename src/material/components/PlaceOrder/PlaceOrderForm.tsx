import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { getErrorFormatter } from 'material/shared/utils/util';
import LoadingButton from 'material/shared/components/LoadingButton';

const validationSchema = Yup.object({
  price: Yup.number().label('Price').moreThan(0).required('Required').nullable(true),
  baseVolume: Yup.number().label('Base volume').moreThan(0).required('Required').nullable(true),
  quoteVolume: Yup.number().label('Quote volume').moreThan(0).required('Required').nullable(true),
});

export interface PlaceOrderFormData {
  price: number;
  baseVolume: number;
  quoteVolume: number;
}

interface Props {
  onSubmit: (data: PlaceOrderFormData) => void;
  loading: boolean;
  isDense?: 'dense' | 'none' | 'normal';
  isDisabled?: boolean;
}

export const PlaceOrderForm = ({ onSubmit, loading, isDense, isDisabled }: Props) => {
  const { handleSubmit, handleChange, values, errors, touched, setFieldTouched, isValid } =
    useFormik<PlaceOrderFormData>({
      initialValues: {
        price: 0,
        baseVolume: 0,
        quoteVolume: 0,
      },
      validationSchema,
      onSubmit,
    });

  const formatError = getErrorFormatter<PlaceOrderFormData>(touched, errors);

  const touchAllFields = () => {
    setFieldTouched('price');
    setFieldTouched('baseVolume');
    setFieldTouched('quoteVolume');
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <Grid item>
          <TextField
            label="Price"
            value={values.price || ''}
            onBlur={() => setFieldTouched('price')}
            onChange={handleChange}
            type="number"
            name="price"
            variant="outlined"
            fullWidth
            margin={isDense}
            required
            helperText={formatError('price')}
            error={touched.price && Boolean(errors.price)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Base Volume"
            value={values.baseVolume || ''}
            onBlur={() => setFieldTouched('baseVolume')}
            onChange={handleChange}
            type="number"
            name="baseVolume"
            variant="outlined"
            fullWidth
            margin={isDense}
            required
            helperText={formatError('baseVolume')}
            error={touched.baseVolume && Boolean(errors.baseVolume)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Quote Volume"
            value={values.quoteVolume || ''}
            onBlur={() => setFieldTouched('quoteVolume')}
            onChange={handleChange}
            type="number"
            name="quoteVolume"
            variant="outlined"
            fullWidth
            margin={isDense}
            required
            helperText={formatError('quoteVolume')}
            error={touched.quoteVolume && Boolean(errors.quoteVolume)}
            disabled={isDisabled}
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
          text="Place order"
          isLoading={loading}
          isDisabled={!touched?.price || !isValid || isDisabled}
        />
      </div>
    </form>
  );
};

PlaceOrderForm.defaultProps = {
  isDense: 'normal',
  isDisabled: false,
};

export default PlaceOrderForm;
