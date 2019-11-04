import React, { useState, useEffect } from "react";

import SimpleDialog from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BambooIcon from "@material-ui/icons/VerifiedUser";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import AuthFlow from "./authentication/AuthFlow";
import MobileNumberDialog from "./simple_auth/MobileNumberDialog";
import ProductCards from "./ProductCards";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Bamboo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default function MainPage() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSuccessfulLogin = () => {
    setLoggedIn(true);
    console.log("logged in successfully!");
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const displayCards = () => {
    if (loggedIn) {
      return <ProductCards />;
    } else {
      return false;
    }
  };

  const displayAppBarLoginControls = () => {
    if (loggedIn) {
      return (
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      );
    } else {
      return displayHeroLoginButton();
    }
  };

  const displayHeroLoginButton = () => {
    if (loggedIn) {
      return false;
    } else {
      return (
        <MobileNumberDialog
          successActionCallback={() => handleSuccessfulLogin()}
        />
      );
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.appBar}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <BambooIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Bamboo
            </Typography>
            {displayAppBarLoginControls()}
          </Toolbar>
        </AppBar>
      </div>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Get protected.
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Review and purchase your short term insurance contracts
            </Typography>
            <div className={classes.heroButtons}>
              {displayHeroLoginButton()}
            </div>
          </Container>
        </div>
        {displayCards()}
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Taking care of your possessions.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
