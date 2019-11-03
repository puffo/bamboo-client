import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";

export default function AdjustContractControls({
  currentlyAccepted,
  removeAction,
  confirmAction
}) {
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
}

AdjustContractControls.propTypes = {
  currentlyAccepted: PropTypes.bool.isRequired,
  removeAction: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired
};
