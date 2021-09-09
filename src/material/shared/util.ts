import { FormikErrors, FormikTouched } from 'formik';

export function getErrorFormatter<T>(
  touched: FormikTouched<T>,
  errors: FormikErrors<T>
): (fieldName: keyof T) => string {
  // Add a non-breaking space to empty helperText to prevent inputs from jumping around
  return (fieldName) => (touched[fieldName] && (errors[fieldName] as string)) || '\xA0';
}
