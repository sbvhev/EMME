/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import AuthPageContainer from 'material/shared/AuthPageContainer';
import { Notifications } from 'components';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchCreateUser, resetData } from 'stores/reducers/auth';
import { SignupForm, SignupFormData } from './SignupForm';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(2),
    textTransform: 'initial',
  },
  textMessage: {
    fontSize: '14px',
    lineHeight: '23px',
  },
}));

type Status = 'success' | 'warning' | 'error';

const Signup = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);

  console.log('authStore; ', authStore);

  const [openNotification, setOpenNotification] = useState(false);
  const [notifyType, setNotifyType] = useState<Status>('success');
  const [notifyMessage, setNotifyMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authStore.errors && authStore.isRegister === false) {
      setNotifyMessage(authStore.errors.message || 'Error');
      setNotifyType('warning');

      setOpenNotification(true);
      setIsLoading(false);
    }
  }, [authStore.errors, authStore.isRegister]);

  useEffect(() => {
    if (authStore.isRegister && authStore.user) {
      setNotifyMessage('You have successfully created an account.');
      setNotifyType('success');

      setOpenNotification(true);

      dispatch(resetData());
      setTimeout(() => {
        setIsLoading(false);
        history.push('/home');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.isRegister, authStore.user, dispatch]);

  const handleSubmit = (
    formData: Pick<SignupFormData, 'email' | 'firstName' | 'lastName' | 'password'>
  ) => {
    console.log('register', formData);
    setIsLoading(true);
    dispatch(fetchCreateUser(formData));
  };

  return (
    <>
      <AuthPageContainer
        columnTitle="Sign up"
        columnComponent={<SignupForm onSubmit={handleSubmit} loading={isLoading} />}
      />
      <Notifications
        message={<span className={classes.textMessage}>{notifyMessage}</span>}
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        type={notifyType}
      />
    </>
  );
};

export default Signup;
