import PropTypes from "prop-types";
import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  })
);

export default function ContractDetails({ duration, price, terms }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        {terms}
      </Typography>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Duration" secondary={duration} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Price" secondary={price} />
        </ListItem>
      </List>
    </div>
  );
}

ContractDetails.propTypes = {
  duration: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  terms: PropTypes.string.isRequired
};
