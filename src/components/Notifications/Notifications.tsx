import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { IoCheckboxOutline } from "react-icons/io5";
import { ReactComponent as WarningIcon } from "assets/svg/warn.svg";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  open: boolean;
  message: React.ReactNode | string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  boxIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxIconSuccess: {
    background: " #44a969ae",
  },
  boxIconError: {
    background: " #e1481aac",
  },
}));

const Notifications: React.FC<Props> = ({ open, message, type, onClose }) => {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        iconMapping={{
          success: (
            <span
              className={`${classes.boxIcon} ${
                type === "success" ? classes.boxIconSuccess : ""
              }`}
            >
              <IoCheckboxOutline />
            </span>
          ),
          warning: (
            <span
              className={`${classes.boxIcon} ${
                type === "warning" ? classes.boxIconError : ""
              }`}
            >
              <WarningIcon style={{ width: "16px", height: "16px" }} />
            </span>
          ),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
