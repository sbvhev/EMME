import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { Notifications } from 'components';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchLoginUser } from 'stores/reducers/auth';

import LoginForm, { LoginFormData } from './LoginForm';
import AuthPageContainer from 'material/shared/AuthPageContainer';

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
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { isLogin, user, errors, loading } = useAppSelector((state) => state.auth);

  const [openNotification, setOpenNotification] = useState(false);
  const [notifyType, setNotifyType] = useState<Status>('success');
  const [notifyMessage, setNotifyMessage] = useState('');

  useEffect(() => {
    if (errors && isLogin === false) {
      setNotifyMessage(errors.message || 'The email or password you have entered do not match.');
      setNotifyType('warning');

      setOpenNotification(true);
    }
  }, [errors, isLogin]);

  useEffect(() => {
    if (isLogin && user) {
      setNotifyMessage('You’ve successfully logged into the system.');
      setNotifyType('success');

      setOpenNotification(true);

      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, user, dispatch]);

  const onLogin = async (formData: LoginFormData) => {
    console.log('onLogin', formData);
    dispatch(fetchLoginUser(formData));
  };

  return (
    <>
      <AuthPageContainer
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
