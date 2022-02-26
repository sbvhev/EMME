/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchLoginUser, resetAuthMessage } from 'stores/reducers/auth';
import { fetchUserInfo } from 'stores/reducers/users';
import AlertContext from 'context/alert/alertContext';

import AuthPageContainer from 'material/shared/components/AuthPageContainer';
import LoginForm, { LoginFormData } from './LoginForm';

const Login = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { errors, success, loading, token } = useAppSelector((state) => state.auth);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (errors) {
      setAlert(errors || 'The email or password you have entered do not match.', 'error');
    }

    if (success) {
      setAlert(success, 'success', 2500);
      setTimeout(() => {
        history.push('/orderbook');
      }, 200);
    }

    dispatch(resetAuthMessage());
  }, [errors, success]);

  useEffect(() => {
    if (token) {
      history.push('/orderbook');
    }
  }, [token]);

  const onLogin = async (formData: LoginFormData) => {
    try {
      await dispatch(fetchLoginUser(formData)).unwrap();

      dispatch(fetchUserInfo());
    } catch (err) {
      console.warn('catch login failed', err);
    }
  };

  return (
    <AuthPageContainer
      columnTitle="Sign in to EM.ME"
      columnComponent={<LoginForm onSubmit={onLogin} loading={loading} />}
    />
  );
};

export default Login;
