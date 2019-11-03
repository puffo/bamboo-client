import React from "react";
import PropTypes, { InferProps } from "prop-types";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";

AdjustContractControls.propTypes = {
  currentlyAccepted: PropTypes.bool.isRequired,
  validUntil: PropTypes.string,
  removeAction: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired
};

export default function AdjustContractControls({
  currentlyAccepted,
  validUntil,
  removeAction,
  confirmAction
}: InferProps<typeof AdjustContractControls.propTypes>) {
  const button = () => {
    if (currentlyAccepted) {
      return (
        <Button
          size="small"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={removeAction}
        >
          Remove
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={confirmAction}
        >
          Confirm
        </Button>
      );
    }
  };
  const expiring = () => {
    if (currentlyAccepted) {
      return (
        <Typography variant="subtitle2" gutterBottom>
          Expiring: {validUntil}
        </Typography>
      );
    } else {
      return false;
    }
  };

  return (
    <div>
      {expiring()}
      {button()}
    </div>
  );
}
