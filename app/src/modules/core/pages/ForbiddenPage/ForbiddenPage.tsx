import React, { FC } from "react";
import { Typography } from "@material-ui/core";

import Email from "../../../base/components/Email";
import Header from "../../../base/components/Header";
import Container from "../../../base/components/Container";
import BackButton from "../../../base/components/BackButton";
import Footer from "../../../base/components/Footer";

import useStyles from "./styles";

export const ForbiddenPage: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Header />
      </Container>
      <Container className={classes.container}>
        <Typography variant="h4" component="h1" className={classes.title}>
          <b>403 Forbidden</b>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Sorry, you do not have permission to view the page you requested.
          Please forward any enquiries to <Email dark />.
        </Typography>
        <div className={classes.back}>
          <BackButton variant="outlined" color="primary" />
        </div>
      </Container>
      <Footer />
    </div>
  );
};
