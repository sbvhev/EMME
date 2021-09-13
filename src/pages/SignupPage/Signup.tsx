import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchCreateUser } from 'stores/reducers/auth';
import AlertContext from 'context/alert/alertContext';

import AuthPageContainer from 'material/shared/components/AuthPageContainer';
import SignupForm, { SignupFormData } from './SignupForm';

const Signup = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { errors, isRegister, user, loading } = useAppSelector((state) => state.auth);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (errors && isRegister === false) {
      setAlert(errors.message || 'Error', 'error');
    } else if (isRegister && user) {
      setAlert('You have successfully created an account.', 'success');

      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, isRegister, user]);

  const handleSubmit = (
    formData: Pick<SignupFormData, 'email' | 'firstName' | 'lastName' | 'password'>
  ) => {
    console.log('register', formData);
    dispatch(fetchCreateUser(formData));
  };

  return (
    <AuthPageContainer
      columnTitle="Sign up"
      columnComponent={<SignupForm onSubmit={handleSubmit} loading={loading} />}
    />
  );
};

export default Signup;
