import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import AuthPageContainer from 'material/shared/AuthPageContainer';
import { Notifications } from 'components';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchCreateUser } from 'stores/reducers/auth';
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
  const { errors, isRegister, user, loading } = useAppSelector((state) => state.auth);

  const [openNotification, setOpenNotification] = useState(false);
  const [notifyType, setNotifyType] = useState<Status>('success');
  const [notifyMessage, setNotifyMessage] = useState('');

  useEffect(() => {
    if (errors && isRegister === false) {
      setNotifyMessage(errors.message || 'Error');
      setNotifyType('warning');

      setOpenNotification(true);
    }
  }, [errors, isRegister]);

  useEffect(() => {
    if (isRegister && user) {
      setNotifyMessage('You have successfully created an account.');
      setNotifyType('success');

      setOpenNotification(true);

      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegister, user, dispatch]);

  const handleSubmit = (
    formData: Pick<SignupFormData, 'email' | 'firstName' | 'lastName' | 'password'>
  ) => {
    console.log('register', formData);
    dispatch(fetchCreateUser(formData));
  };

  return (
    <>
      <AuthPageContainer
        columnTitle="Sign up"
        columnComponent={<SignupForm onSubmit={handleSubmit} loading={loading} />}
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
