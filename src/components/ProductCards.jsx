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

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const cards = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1520089395365-001d26ba155b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    title: "iPhone X",
    description: "Avoid drops and spills!"
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1530173235220-f6825c107a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
    title: "Mountain Bike",
    description: "Ride with confidence this weekend."
  }
];

export default function ProductCards() {
  const classes = useStyles();
  const user = netlifyIdentity.currentUser();
  console.log({ user });

  return (
    <Container className={classes.cardGrid} maxWidth="l">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cards.map(card => (
          <Grid item key={card.id} xs={12} sm={6} md={6}>
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
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<AddShoppingCartIcon />}
                >
                  Buy Now
                </Button>
                <Button size="small" color="default" startIcon={<EditIcon />}>
                  Adjust
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </CardActions>
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
