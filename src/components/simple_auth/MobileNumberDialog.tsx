import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface ToggleProps {
  successActionCallback: () => void;
}

export default function FormDialog({ successActionCallback }: ToggleProps) {
  const [openMobileNumber, setOpenMobileNumber] = React.useState(false);
  const [openConfirmCode, setOpenConfirmCode] = React.useState(false);

  const handleClickOpenMobileNumber = () => {
    setOpenMobileNumber(true);
  };

  const handleCloseMobileNumber = () => {
    setOpenMobileNumber(false);
  };

  const handleSubmitMobileNumber = () => {
    setOpenMobileNumber(false);
    setOpenConfirmCode(true);
  };

  const handleCloseConfirmCode = () => {
    setOpenMobileNumber(false);
    setOpenConfirmCode(false);
  };

  const handleSubmitConfirmCode = () => {
    successActionCallback();
    handleCloseConfirmCode();
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
              type="phone"
              fullWidth
              required={true}
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
