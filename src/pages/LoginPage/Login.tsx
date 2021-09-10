import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchLoginUser } from 'stores/reducers/auth';
import AlertContext from 'context/alert/alertContext';

import AuthPageContainer from 'material/shared/AuthPageContainer';
import LoginForm, { LoginFormData } from './LoginForm';

const Login = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLogin, user, errors, loading } = useAppSelector((state) => state.auth);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (errors && !isLogin) {
      setAlert(errors.message || 'The email or password you have entered do not match.', 'error');
    } else if (isLogin && user) {
      setAlert('You’ve successfully logged into the system.', 'success');

      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, isLogin, user]);

  const onLogin = async (formData: LoginFormData) => {
    console.log('onLogin', formData);
    dispatch(fetchLoginUser(formData));
  };

  return (
    <AuthPageContainer
      columnTitle="Sign in to EM.ME"
      columnComponent={<LoginForm onSubmit={onLogin} loading={loading} />}
    />
  );
};

export default Login;
