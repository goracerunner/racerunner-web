import React, { FC } from "react";
import { Typography } from "@material-ui/core";

import Email from "../../../base/components/Email";
import Header from "../../../base/components/Header";
import Container from "../../../base/components/Container";
import Footer from "../../../base/components/Footer";

import useStyles from "./styles";

export const NotFoundPage: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Header />
      </Container>
      <Container className={classes.container}>
        <Typography variant="h4" component="h1" className={classes.title}>
          <b>404 Not Found</b>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Sorry, the page you requested could not be found. Please forward any
          enquiries to <Email dark />.
        </Typography>
      </Container>
      <Footer />
    </div>
  );
};
