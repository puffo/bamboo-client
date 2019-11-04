import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import LinearProgress from "@material-ui/core/LinearProgress";

interface ToggleProps {
  successActionCallback: () => void;
}

export default function MobileNumberDialog({
  successActionCallback
}: ToggleProps) {
  const [openMobileNumber, setOpenMobileNumber] = React.useState(false);
  const [openConfirmCode, setOpenConfirmCode] = React.useState(false);

  const [sendingCode, setSendingCode] = React.useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [code, setCode] = useState("");

  const login = () => {
    setSendingCode(true);
    const fetchData = async () => {
      const url = "/.netlify/functions/login";
      const result = axios({
        url: url,
        method: "post",
        headers: {
          Accept: "application/json"
        },
        data: JSON.stringify({ to: mobileNumber }),
        withCredentials: false
      })
        .then(response => {
          console.log("SMS sent");
          setSendingCode(false);
          setOpenMobileNumber(false);
          setOpenConfirmCode(true);
        })
        .catch(err => {
          alert(`Could not send sms! \n${err}`);
          setSendingCode(false);
        });
    };

    fetchData();
  };

  const confirm = () => {
    const fetchData = async () => {
      const url = "/.netlify/functions/confirm";
      axios({
        url: url,
        method: "post",
        headers: {
          Accept: "application/json"
        },
        data: JSON.stringify({ to: mobileNumber, code: code }),
        withCredentials: false
      })
        .then(response => {
          return handleSuccessfulLogin();
        })
        .catch(error => {
          return handleFailedLogin();
        });
    };

    fetchData();
  };

  const handleClickOpenMobileNumber = () => {
    setOpenMobileNumber(true);
  };

  const handleTypeMobileNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMobileNumber(event.target.value);
  };
  const handleTypeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSubmitMobileNumber = () => {
    login();
  };

  const handleCloseConfirmCode = () => {
    setOpenMobileNumber(false);
    setOpenConfirmCode(false);
  };
  const handleCloseMobileNumber = () => {
    setSendingCode(false);
    setOpenMobileNumber(false);
  };

  const handleSuccessfulLogin = () => {
    successActionCallback();
    handleCloseConfirmCode();
  };

  const handleFailedLogin = () => {
    alert(
      "Could not log you in. Please double check your phone number and the code sent via SMS."
    );
  };

  const mobileNumberDialog = () => {
    return (
      <div>
        <Button color="inherit" onClick={handleClickOpenMobileNumber}>
          Login
        </Button>
        <Dialog
          open={openMobileNumber}
          onClose={handleCloseMobileNumber}
          aria-labelledby="form-dialog-title"
        >
          {/* <DialogTitle id="form-dialog-title">Login</DialogTitle> */}
          <DialogContent>
            <DialogContentText variant="subtitle2">
              Confirm your mobile number
            </DialogContentText>
            <LinearProgress hidden={!sendingCode} />
            <TextField
              autoFocus
              margin="normal"
              id="mobile"
              label="Mobile Number"
              type="text"
              fullWidth
              required={true}
              onChange={handleTypeMobileNumber}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMobileNumber} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitMobileNumber} color="primary">
              confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const confirmCodeDialog = () => {
    return (
      <div>
        <Dialog
          open={openConfirmCode}
          onClose={handleCloseConfirmCode}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{mobileNumber}</DialogTitle>
          <DialogContent>
            <DialogContentText variant="subtitle2">
              Enter your code
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="code"
              label="Code"
              type="text"
              fullWidth
              onChange={handleTypeCode}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmCode} color="primary">
              Cancel
            </Button>
            <Button onClick={confirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  if (openMobileNumber) {
    return mobileNumberDialog();
  } else if (openConfirmCode) {
    return confirmCodeDialog();
  } else {
    return mobileNumberDialog();
  }
}
