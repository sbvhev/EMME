import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";

import USDIcon from "assets/icons/usd.svg";
// import EURIcon from "assets/icons/eur.svg";

interface Props {
  title?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      boxShadow: "0px 64px 64px -48px rgba(15, 15, 15, 0.1)",
      background: "#18191D",
      borderRadius: "16px",
      padding: "40px",
    },
    title: {
      color: theme.palette.secondary.main,
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 600,
      margin: "0 0 36px",
    },
    tdHead: {
      color: "#B1B5C4",
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: "20px",
      padding: "16px 0",
      borderBottom: "1px solid #23262F",
    },
    tdBody: {
      color: "#B1B5C4",
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: "20px",
      padding: "16px 0",
      borderBottom: "1px solid #23262F",
    },
    tdTitle: {
      color: "#FCFCFD",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "24px",
      margin: "0 0",
    },
    tdDesc: {
      color: "#777E91",
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 400,
      margin: "0 0",
    },
    btnDefault: {
      margin: 0,
      color: "#23262F",
      fontSize: "12px",
      lineHeight: "12px",
      fontWeight: "bold",
      padding: "8px 12px",
      background: "#FCFCFD",
      borderRadius: 4,
      textTransform: "uppercase",
      height: 26,
      width: 61,
      display: "inline-flex",
      alignItems: "center",

      "&:hover": {
        color: "#23262F",
        background: "#FCFCFD",
        opacity: 0.7,
      },
    },
    actions: {
      marginTop: "36px",
      textAlign: "right",
    },
    mTop48: {
      marginTop: "48px",
    },
  })
);

const Sessions: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Active sessions</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              classes={{
                root: classes.tdHead,
              }}
            >
              Date / time
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdHead,
              }}
            >
              Device
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdHead,
              }}
              align="right"
            >
              Location
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
            >
              <h3 className={classes.tdTitle}>2021-06-16</h3>
              <p className={classes.tdDesc}>10:46:09</p>
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
            >
              <h3 className={classes.tdTitle}>Macbook Pro</h3>
              <p className={classes.tdDesc}>Mac OS Bigsur</p>
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
              align="right"
            >
              <Button className={classes.btnDefault}>
                <img alt="" src={USDIcon} /> USA
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
            >
              <h3 className={classes.tdTitle}>2021-06-16</h3>
              <p className={classes.tdDesc}>10:46:09</p>
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
            >
              <h3 className={classes.tdTitle}>Macbook Pro</h3>
              <p className={classes.tdDesc}>Mac OS Bigsur</p>
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
              align="right"
            >
              <Button className={classes.btnDefault}>
                <img alt="" src={USDIcon} /> USA
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className={classes.actions}>
        <Button variant="outlined">Log out all other devices</Button>
      </div>

      <h2 className={`${classes.title} ${classes.mTop48}`}>Login history</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              classes={{
                root: classes.tdHead,
              }}
            >
              Date / time
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdHead,
              }}
            >
              Device
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdHead,
              }}
              align="right"
            >
              Location
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
            >
              <h3 className={classes.tdTitle}>2021-06-16</h3>
              <p className={classes.tdDesc}>10:46:09</p>
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
            >
              <h3 className={classes.tdTitle}>Macbook Pro</h3>
              <p className={classes.tdDesc}>Mac OS Bigsur</p>
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
              align="right"
            >
              <Button className={classes.btnDefault}>
                <img alt="" src={USDIcon} /> USA
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
            >
              <h3 className={classes.tdTitle}>2021-06-16</h3>
              <p className={classes.tdDesc}>10:46:09</p>
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
            >
              <h3 className={classes.tdTitle}>Macbook Pro</h3>
              <p className={classes.tdDesc}>Mac OS Bigsur</p>
            </TableCell>
            <TableCell
              classes={{
                root: classes.tdBody,
              }}
              align="right"
            >
              <Button className={classes.btnDefault}>
                <img alt="" src={USDIcon} /> USA
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className={classes.actions}>
        <Button variant="outlined">Contact us</Button>
      </div>
    </div>
  );
};

export default Sessions;
