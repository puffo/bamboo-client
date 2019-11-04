import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

interface ToggleProps {
  successActionCallback: () => void;
}

export default function FormDialog({ successActionCallback }: ToggleProps) {
  const [openMobileNumber, setOpenMobileNumber] = React.useState(false);
  const [openConfirmCode, setOpenConfirmCode] = React.useState(false);

  const [mobileNumber, setMobileNumber] = useState("");

  const createVerification = () => {
    const fetchData = async () => {
      const url = "/.netlify/functions/login";
      const result = await axios({
        url: url,
        method: "post",
        headers: {
          Accept: "application/json"
        },
        data: JSON.stringify({ to: mobileNumber }),
        withCredentials: false
      });
      console.log(result.data);
      setMobileNumber(result.data);
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

  const handleSubmitMobileNumber = () => {
    createVerification();
    setOpenMobileNumber(false);
    setOpenConfirmCode(true);
  };

  const handleCloseConfirmCode = () => {
    setOpenMobileNumber(false);
    setOpenConfirmCode(false);
  };
  const handleCloseMobileNumber = () => {
    setOpenMobileNumber(false);
  };

  const handleSubmitConfirmCode = () => {
    // if succeeded
    successActionCallback();
    handleCloseConfirmCode();
    // if failed
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
            <TextField
              autoFocus
              margin="normal"
              id="name"
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
              Verify
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
          {/* <DialogTitle id="form-dialog-title">Login</DialogTitle> */}
          <DialogContent>
            <DialogContentText variant="subtitle2">
              Enter your code
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Code"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmCode} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitConfirmCode} color="primary">
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
