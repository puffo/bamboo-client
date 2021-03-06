import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import ProductCardControls from "./products/ProductCardControls";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
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

const templateProducts = [
  {
    id: "1asdfas",
    imageUrl:
      "https://images.unsplash.com/photo-1520089395365-001d26ba155b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    imageText: "iPhone image",
    title: "iPhone X",
    description: "Avoid drops and spills!",
    isFavorite: true
  },
  {
    id: "A13121",
    imageUrl:
      "https://images.unsplash.com/photo-1530173235220-f6825c107a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
    imageText: "Mountain bike image",
    title: "Mountain Bike",
    description: "Ride with confidence this weekend.",
    isFavorite: false
  },
  {
    id: "adfad",
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    imageText: "Jacket image",
    title: "Favourite Jacket",
    description: "Keep your best clothing intact.",
    isFavorite: false
  }
];

export default function ProductCards() {
  const classes = useStyles();
  const [products, setProducts] = useState(templateProducts);

  useEffect(() => {
    const fetchData = async () => {
      const url = "/.netlify/functions/products";
      const result = await axios({
        url: url,
        method: "get",
        headers: {
          Accept: "application/json"
        },
        withCredentials: false
      });
      setProducts(result.data);
    };

    fetchData();
  }, []);

  const handleAddContract = (product: Object) => {
    console.log(product);
    console.log(`Calling microservice to add product ${product}...`);
    const fetchData = async () => {
      const url = "/.netlify/functions/add-product";
      axios({
        url: url,
        method: "post",
        headers: {
          Accept: "application/json"
        },
        data: JSON.stringify(product),
        withCredentials: false
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(`Problem occured \n${err}`);
        });
    };

    return fetchData();
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={6}>
            {/* <ProductCard imageUrl={product.imageUrl} /> */}
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={product.imageUrl}
                title={product.imageText}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography>{product.description}</Typography>
              </CardContent>
              <ProductCardControls
                isFavorite={product.isFavorite}
                addFavoriteAction={() => {
                  handleAddContract(product);
                }}
              />
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
