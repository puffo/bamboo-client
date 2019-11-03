import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";

import AdjustContractControls from "../contracts/AdjustContractControls";
import ContractDetails from "../contracts/ContractDetails";

const useStyles = makeStyles(theme => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export default function ProductCardControls({ isFavorite, addFavoriteAction }) {
  const [favourite, setFavourite] = useState(isFavorite);
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const handleFavouriteClick = () => {
    addFavoriteAction();
    handleExpandClick();
    setFavourite(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (favourite) {
    return (
      <div>
        <CardActions disableSpacing>
          <IconButton disabled aria-label="add to favorites">
            <FavoriteIcon color="secondary" />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ContractDetails
              duration={"1 Week"}
              price={"$10"}
              terms={"Covers scratches, breakages, and failures."}
            />

            {/* Replace functions and pass down props  */}
            <AdjustContractControls
              currentlyAccepted={true}
              validUntil={"11 Nov 2019"}
              removeAction={() => {
                console.log("Calling microservice to remove contract...");
              }}
              confirmAction={() => {
                console.log("Calling microservice to accept contract...");
              }}
            />
          </CardContent>
        </Collapse>
      </div>
    );
  } else {
    return (
      <div>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavouriteClick}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ContractDetails
              duration={"1 Week"}
              price={"$10"}
              terms={"Covers scratches, breakages, and failures."}
            />

            {/* TODO: Replace functions and pass down props  */}
            <AdjustContractControls
              currentlyAccepted={true}
              validUntil={"11 Nov 2019"}
              removeAction={() => {
                console.log("Calling microservice to remove contract...");
              }}
              confirmAction={() => {
                console.log("Calling microservice to accept contract...");
              }}
            />
          </CardContent>
        </Collapse>
      </div>
    );
  }
}

ProductCardControls.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  addFavoriteAction: PropTypes.func.isRequired
};
