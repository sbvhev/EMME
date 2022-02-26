/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchCreateUser, resetAuthMessage } from 'stores/reducers/auth';
import AlertContext from 'context/alert/alertContext';

import AuthPageContainer from 'material/shared/components/AuthPageContainer';
import SignupForm, { SignupFormData } from './SignupForm';

const Signup = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { errors, success, loading, token } = useAppSelector((state) => state.auth);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (errors) {
      setAlert(errors || 'Unknown error', 'error');
    }

    if (success) {
      setAlert(success, 'success', 2500);
      setTimeout(() => {
        history.push('/login');
      }, 200);
    }

    dispatch(resetAuthMessage());
  }, [errors, success]);

  useEffect(() => {
    if (token) {
      history.push('/orderbook');
    }
  }, [token]);

  const handleSubmit = (
    formData: Pick<SignupFormData, 'email' | 'firstName' | 'lastName' | 'password'>
  ) => {
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
