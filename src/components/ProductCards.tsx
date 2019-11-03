import React from "react";
import netlifyIdentity from "netlify-identity-widget";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import EditIcon from "@material-ui/icons/Create";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import ProductCard from "./products/ProductCard";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandIcon from "@material-ui/icons/AddCircle";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";

import AdjustContractControls from "./contracts/AdjustContractControls";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(90deg)"
  }
}));

const cards = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1520089395365-001d26ba155b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    imageText: "iPhone image",
    title: "iPhone X",
    description: "Avoid drops and spills!"
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1530173235220-f6825c107a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
    imageText: "Mountain bike image",
    title: "Mountain Bike",
    description: "Ride with confidence this weekend."
  }
];

export default function ProductCards() {
  const classes = useStyles();
  const user = netlifyIdentity.currentUser();
  console.log({ user });

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cards.map(card => (
          <Grid item key={card.id} xs={12} sm={6} md={6}>
            {/* <ProductCard imageUrl={card.imageUrl} /> */}
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={card.imageUrl}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography>{card.description}</Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  {/* <EditIcon /> */}
                  <ExpandIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Duration: 1 Week</Typography>
                  <Typography paragraph>Price: $3</Typography>
                  <Typography paragraph>Terms: View terms</Typography>

                  {/* Replace functions and pass down props  */}
                  <AdjustContractControls
                    currentlyAccepted={true}
                    removeAction={() => {
                      console.log("Calling microservice to remove contract...");
                    }}
                    confirmAction={() => {
                      console.log("Calling microservice to accept contract...");
                    }}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  // return (
  //   <div>
  //     <h3>Protected Page</h3>
  //     You are logged in as <b>{user.email}</b>
  //   </div>
  // );
}
