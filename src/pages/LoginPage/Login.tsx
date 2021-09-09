import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Notifications } from 'components';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchLoginUser, resetData } from 'stores/reducers/auth';

import LoginForm, { LoginFormData } from './LoginForm';
import TwoColumnContainer from 'material/shared/TwoColumnContainer';

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

const Login = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { isLogin, user, errors, loading } = useAppSelector((state) => state.auth);

  const [openNotification, setOpenNotification] = useState(false);
  const [notifyType, setNotifyType] = useState<Status>('success');
  const [notifyMessage, setNotifyMessage] = useState('');

  useEffect(() => {
    if (errors && isLogin === false) {
      setNotifyMessage(errors.message || 'The username or password you entered is incorrect.');
      setNotifyType('warning');

      setOpenNotification(true);
    }
  }, [errors, isLogin]);

  useEffect(() => {
    if (isLogin && user) {
      setNotifyMessage('You’ve successfully logged into the system.');
      setNotifyType('success');

      setOpenNotification(true);

      dispatch(resetData());
    }
  }, [isLogin, user, dispatch]);

  const onLogin = async (formData: LoginFormData) => {
    console.log('onLogin', formData);

    // try {
    //   login;
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    <>
      <TwoColumnContainer
        columnTitle="Sign in to EM.ME"
        columnComponent={<LoginForm onSubmit={onLogin} loading={loading} />}
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

export default Login;
