import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Breadcrumbs, Typography, Link, Grid, Container, Box } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// store
import MainLayout from 'material/shared/layout/MainLayout';
import { useAppDispatch } from 'stores/hooks';
import { fetchUserInfo, fetchUserBalance, fetchCredentials } from 'stores/reducers/users';

// components
import SideBar from './SideBar';
import ProfileInfo from './ProfileInfo';
import ApiKeys from './ApiKeys';
import Sessions from './Sessions';
import ChangePassword from './ChangePassword';

// interface Props {
//   title?: string;
// }

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    main: {
      margin: '0 auto 80px',
    },
    header: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '40px',
      width: '100%',
      marginBottom: '81px',
    },
    title: {
      fontSize: '48px',
      lineHeight: '56px',
      margin: '0 auto 0 0',
    },
    breadLi: {},
    linkText: {
      fontSize: '12px',
      lineHeight: '20px',
    },
    linkTextActive: {
      fontSize: '12px',
      lineHeight: '20px',
    },
    boxContent: {
      boxShadow: '0px 18px 24px 10px rgb(15 15 15 / 25%)',
      borderRadius: '16px',
      padding: '49px 40px',
    },
    mainHeader: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      marginBottom: '48px',
      width: '100%',
    },
    mainTitle: {
      fontSize: '24px',
      lineHeight: '32px',
      margin: '0 0',
    },
    mainSub: {
      fontSize: '14px',
      lineHeight: '24px',
      margin: '0 0 21px',
    },
    chipRoot: {
      border: '2px solid #353945',
      borderRadius: '90px',
      padding: '8px 0px',
      fontSize: '14px',
      lineHeight: '16px',
    },
    listItem: {
      padding: '12px 0px',
    },
    listItemSubheader: {
      padding: '16px 0 24px',
      textTransform: 'uppercase',
      fontSize: '12px',
      lineHeight: '12px',
      borderBottom: '1px solid #353945',
    },
    mb24: {
      marginBottom: '24px',
    },
    moreTextDark: {
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 500,
      margin: '0',
    },
    action: {
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: '24px',
    },
    btnSave: {
      width: 'auto',
      padding: '16px 24px',
      borderRadius: '90px',
      fontSize: '16px',
      lineHeight: '16px',
    },
    headerLeft: {
      marginRight: 'auto',
    },
    mainBox: {
      backgroundColor: theme.palette.neutralOne.main,
      flex: 1000,
    },
  })
);

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [menuIndex, setMenuIndex] = useState(1);
  // const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchUserBalance());
    dispatch(fetchCredentials());
  }, [dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
    history.push('/');
  };

  const handleChangeMenu = (index: number) => {
    setMenuIndex(index);
  };

  return (
    <MainLayout>
      <Box className={classes.mainBox}>
        <Container maxWidth="lg">
          <Box className={classes.header}>
            <Typography className={classes.title}>
              {menuIndex === 1 ? 'Profile info' : 'API keys'}
            </Typography>

            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link
                color="inherit"
                href="/"
                onClick={handleClick}
                classes={{
                  root: classes.linkText,
                }}
              >
                Home
              </Link>
              <Typography
                color="textPrimary"
                classes={{
                  root: classes.linkTextActive,
                }}
              >
                {menuIndex === 1 ? 'Profile info' : 'API keys'}
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box mb={6}>
            <Grid container spacing={6}>
              <Grid item md={3}>
                <SideBar active={menuIndex} onChange={handleChangeMenu} />
              </Grid>

              <Grid item md={9}>
                {menuIndex === 1 && <ProfileInfo />}
                {menuIndex === 2 && <ApiKeys />}
                {menuIndex === 3 && <Sessions />}
                {menuIndex === 4 && <ChangePassword />}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default ProfilePage;
