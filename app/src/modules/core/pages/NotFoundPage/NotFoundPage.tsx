import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Email from "../../../base/components/Email";
import Header from "../../../base/components/Header";
import BackButton from "../../../base/components/BackButton";
import Footer from "../../../base/components/Footer";

import useStyles from "./styles";

export const NotFoundPage: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Header />
      </Container>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h1" className={classes.title}>
          <b>404 Not Found</b>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Sorry, the page you requested could not be found. Please forward any
          enquiries to <Email dark />.
        </Typography>
        <div className={classes.back}>
          <BackButton variant="outlined" color="primary" />
        </div>
      </Container>
      <Footer />
    </div>
  );
};
