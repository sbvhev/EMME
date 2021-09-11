import React, { useState } from "react";
import uuidAPIKey from "uuid-apikey";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  Button,
  Grid,
  Divider,
  TextField,
  FormLabel,
  IconButton,
  Select,
  MenuItem,
  // InputAdornment,
  // Snackbar,
} from "@material-ui/core";
import MailOutlineIconMt from "@material-ui/icons/MailOutline";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import { FormInput } from "components";
import { MailOutlineIcon } from "icons";

import SecurityImg from "assets/images/security.png";

interface Props {
  title?: string;
}

interface ApiAccessType {
  clientId: string;
  apiKey: string;
}

type StatusType = "disabled" | "confirm" | "enabled";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      boxShadow: "0px 64px 64px -48px rgba(15, 15, 15, 0.1)",
      background: "#18191D",
      borderRadius: "16px",
      padding: "40px",
    },
    button: {
      width: "auto",
      fontSize: "16px",
      lineHeight: "16px",
      padding: "16px 24px",
      borderRadius: "90px",
    },
    smallDarkText: {
      fontSize: "12px",
      lineHeight: "20px",
      color: "#353945",
      margin: "0",
    },
    title: {
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "48px",
      color: theme.palette.secondary.main,
      margin: "0 0 15px",
    },
    titleRed: {
      color: "#FF6838",
    },
    titleGreen: {
      color: "#58BD7D",
    },
    address: {
      display: "flex",
      alignItems: "center",
      marginBottom: "48px",
    },
    mailBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "48px",
    },
    mailText: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 500,
      margin: "0 0 0 13px",
      color: theme.palette.secondary.main,
    },
    subTitle: {
      color: theme.palette.secondary.main,
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "32px",
      margin: "0 0 24px",
    },
    desc: {
      color: "#E6E8EC",
      fontSize: "16px",
      lineHeight: "24px",
      margin: "0 0 24px",
    },
    viewImage: {
      maxWidth: "326px",
      margin: "0 auto 7px",
    },
    img: {
      width: "100%",
    },
    textConfirm: {
      color: "#777E",
      fontSize: "14px",
      lineHeight: "24px",
      textAlign: "center",
      margin: "0 0 19px",
    },
    actions: {
      marginTop: "50px",
      textAlign: "center",
    },
    btnOutlineGeneral: {
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "16px",
      color: "#FCFCFD",
      padding: "8px 16px",
      borderRadius: "90px",
      border: "2px solid #777E91",
      margin: "0 0",
    },
    btnOutline: {
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "16px",
      color: "#FCFCFD",
      padding: "14px 24px",
      borderRadius: "90px",
      border: "2px solid #777E91",
      margin: "0 0",
    },
    buttonContained: {
      background: "#FCFCFD",
      color: "#23262F",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "16px",
      padding: "16px 18px 16px 24px",
      display: "inline-flex",
      alignItems: "center",
      margin: "0 0 0 16px",
    },
    btnIcon: {
      fontSize: "16px",
      marginLeft: "12px",
    },
    divider: {
      marginBottom: "48px",
    },
    yourApiKeys: {
      marginBottom: "48px",
    },
    formLabel: {
      color: "#B1B5C4",
      fontSize: "12px",
      lineHeight: "12px",
      textTransform: "uppercase",
      fontWeight: "bold",
      margin: "0 0 12px",
      display: "flex",
    },
    formGroup: {
      marginBottom: "24px",
    },
    formControl: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    iconRemove: {
      width: "14px",
      marginLeft: "17px",
      padding: "0",
      color: '#777E91'
    },
    inputCustom: {
      width: "calc(100% - 31px)",

      "& .MuiInputBase-root": {
        height: "48px",
        border: "none",
        color: "#FCFCFD",
        fontSize: "14px",
        lineHeight: "24px",
        fontWeight: 500,
        padding: "12px 16px",
        background: "#23262F",
        borderRadius: "12px",
      },
    },
    inputCustomCopy: {
      width: "calc(100% - 31px)",

      "& .MuiInputBase-root": {
        height: "48px",
        background: "#141416",
        border: "2px solid #58BD7D",
        borderRadius: "12px",
        color: "#FCFCFD",
        padding: "12px 12px 12px 16px",
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: 500,
        textTransform: "uppercase",
      },

      "& .MuiButton-sizeSmall": {
        margin: 0,
        color: "#23262F",
        fontSize: "12px",
        lineHeight: "12px",
        fontWeight: "bold",
        padding: 8,
        background: "#FCFCFD",
        borderRadius: 4,
        textTransform: "uppercase",
        height: 26,
        width: 61,
      },
    },
    selectBox: {
      width: "calc(100% - 31px)",
      border: "none",
      background: "#23262F",
      borderRadius: "12px",
      padding: 0,
    },
    select: {
      color: "#FCFCFD",
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 500,
      padding: 0,
    },
    iconSelect: {
      right: "10px",
    },
    outlineSelect: {
      padding: "12px 16px !important",

      // paddingLeft: "0 !important",
    },
  })
);

const ApiKeys: React.FC<Props> = () => {
  const classes = useStyles();

  const [status, setStatus] = useState<StatusType>("enabled");
  const [copied, setCopied] = useState(false);
  const [exchange, setExchange] = useState("1");
  const [enabledData, setEnabledData] = useState({
    clientId: "theschinner",
    apiKey: "OI8YEFOOP54SD54SDYEFO94YEFO",
  });

  const generateNewApiKey = async () => {
    const { apiKey } = await uuidAPIKey.create({ noDashes: true });
    setCopied(false);
    setEnabledData({ ...enabledData, apiKey: apiKey });
  };

  const handleClearInput = (name: string) => {
    if (name === "apiKey") {
      setCopied(false);
    }
    setEnabledData({ ...enabledData, [name]: "" });
  };

  const handleDisableApiKey = () => {
    setStatus("disabled");
  };

  const handleChangeExchange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setExchange(event.target.value as string);
  };

  const validationSchema = yup.object({
    clientId: yup.string().required("Please input your client id"),
    apiKey: yup.string().required("Please input API Key"),
  });

  const initialValues: ApiAccessType = {
    clientId: "",
    apiKey: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values: ", values);
      setStatus("confirm");
    },
  });

  return (
    <div className={classes.main}>
      {/* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={copied}
        onClose={() => setCopied(false)}
        message="Copied"
      /> */}

      {status === "disabled" && (
        <>
          <p className={classes.smallDarkText}>
            Enable API access on your account to generate rounds.
          </p>
          <h3 className={classes.title}>
            API Access is <span className={classes.titleRed}>Disabled</span>
          </h3>

          <div className={classes.address}>
            <MailOutlineIcon width={24} />
            <p className={classes.mailText}>schinner@icloud.com</p>
          </div>

          <h4 className={classes.subTitle}>Enable API keys</h4>
          <p className={classes.desc}>
            Enter your client ID and API key to Enable the rounds on of all
            exchanges
          </p>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <FormInput
                  label="CLIENT ID"
                  name="clientId"
                  value={formik.values.clientId}
                  handleChange={formik.handleChange}
                  id="clientId"
                  placeholder=""
                  type="text"
                  touched={formik.touched.clientId}
                  error={Boolean(formik.errors.clientId)}
                />
              </Grid>
              <Grid item md={6}>
                <FormInput
                  label="API KEY"
                  name="apiKey"
                  value={formik.values.apiKey}
                  handleChange={formik.handleChange}
                  id="apiKey"
                  placeholder=""
                  type="text"
                  touched={formik.touched.apiKey}
                  error={Boolean(formik.errors.apiKey)}
                />
              </Grid>
            </Grid>

            <Button type="submit" color="primary" className={classes.button}>
              Enable API keys
            </Button>
          </form>
        </>
      )}

      {status === "confirm" && (
        <>
          <div className={classes.viewImage}>
            <img className={classes.img} alt="" src={SecurityImg} />
          </div>

          <p className={classes.textConfirm}>
            Please check your email to confirm this action. <br />
            As a security measure, the confirmation link will expire in 15
            minutes.
          </p>

          <div className={classes.mailBox}>
            <MailOutlineIcon width={24} />
            <p className={classes.mailText}>schinner@icloud.com</p>
          </div>

          <div className={classes.actions}>
            <Button
              classes={{
                outlined: classes.btnOutline,
              }}
              variant="outlined"
              onClick={() => setStatus("enabled")}
            >
              Go to inbox
            </Button>
            <Button
              classes={{
                contained: classes.buttonContained,
              }}
              variant="contained"
            >
              Resend email <MailOutlineIconMt className={classes.btnIcon} />
            </Button>
          </div>
        </>
      )}

      {status === "enabled" && (
        <>
          <p className={classes.smallDarkText}>
            Enable API access on your account to generate rounds.
          </p>
          <h3 className={classes.title}>
            {/* API Access is <span className={classes.titleGreen}>Enabled</span> */}
            Bittrex API Keys
          </h3>

          <div className={classes.address}>
            <MailOutlineIcon width={24} />
            <p className={classes.mailText}>schinner@icloud.com</p>
          </div>

          <Divider
            classes={{
              root: classes.divider,
            }}
          />

          <div className={classes.yourApiKeys}>
            <h4 className={classes.subTitle}>Your API keys</h4>

            <div className={classes.formGroup}>
              <FormLabel className={classes.formLabel}>Exchange</FormLabel>
              <div className={classes.formControl}>
                <Select
                  className={classes.selectBox}
                  classes={{
                    root: classes.select,
                    icon: classes.iconSelect,
                    outlined: classes.outlineSelect,
                  }}
                  variant="outlined"
                  value={exchange}
                  onChange={handleChangeExchange}
                >
                  <MenuItem value={1}>Bittrex</MenuItem>
                  <MenuItem value={2}>Bitstamp</MenuItem>
                  <MenuItem value={3}>bitFlyer</MenuItem>
                  <MenuItem value={4}>KuCoin</MenuItem>
                  <MenuItem value={5}>Kraken</MenuItem>
                </Select>
                {/* <TextField
                  classes={{
                    root: classes.inputCustom,
                  }}
                  value={enabledData.clientId}
                  variant="outlined"
                /> */}
                {/* <IconButton
                  className={classes.iconRemove}
                  onClick={() => handleClearInput("clientId")}
                >
                  <CloseIcon />
                </IconButton> */}
              </div>
            </div>

            <div className={classes.formGroup}>
              <FormLabel className={classes.formLabel}>Client ID</FormLabel>
              <div className={classes.formControl}>
                <TextField
                  classes={{
                    root: classes.inputCustom,
                  }}
                  value={enabledData.clientId}
                  variant="outlined"
                />
                <IconButton
                  className={classes.iconRemove}
                  onClick={() => handleClearInput("clientId")}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>

            <div className={classes.formGroup}>
              <FormLabel className={classes.formLabel}>API key </FormLabel>
              <div className={classes.formControl}>
                <TextField
                  classes={{
                    root: classes.inputCustom,
                    // root: classes.inputCustomCopy,
                  }}
                  value={enabledData.apiKey}
                  variant="outlined"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <CopyToClipboard
                  //         text={enabledData.apiKey}
                  //         onCopy={() => setCopied(true)}
                  //       >
                  //         <Button size="small">
                  //           {copied ? "copied" : "copy"}
                  //         </Button>
                  //       </CopyToClipboard>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
                <IconButton
                  className={classes.iconRemove}
                  onClick={() => handleClearInput("apiKey")}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>

            <Button
              classes={{
                outlined: classes.btnOutlineGeneral,
              }}
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={generateNewApiKey}
            >
              Generate new API key
            </Button>
          </div>

          <Divider
            classes={{
              root: classes.divider,
            }}
          />

          <div>
            <h4 className={classes.subTitle}>Disable API keys</h4>
            <p className={classes.desc}>
              Enter your password and 2FA code to Disable the API keys
            </p>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <FormInput
                  label="PASSWORD"
                  name="apiKey"
                  value={formik.values.apiKey}
                  handleChange={formik.handleChange}
                  id="apiKey"
                  placeholder="Password"
                  type="password"
                  touched={formik.touched.apiKey}
                  error={Boolean(formik.errors.apiKey)}
                />
              </Grid>
              <Grid item md={6}>
                <FormInput
                  label="PASSWORD"
                  name="apiKey"
                  value={formik.values.apiKey}
                  handleChange={formik.handleChange}
                  id="apiKey"
                  placeholder="Password"
                  type="password"
                  touched={formik.touched.apiKey}
                  error={Boolean(formik.errors.apiKey)}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              color="primary"
              className={classes.button}
              onClick={handleDisableApiKey}
            >
              Disable API keys
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ApiKeys;
