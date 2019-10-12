import React from "react";
import Helmet from "react-helmet";

import Header from "../../../base/components/Header";
import Footer from "../../../base/components/Footer";

import useStyles from "./styles";

/**
 * Show the application's terms of use.
 */
export const TermsPage: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Terms Of Use</title>
      </Helmet>
      <div className={classes.title}>
        <Header reduced />
      </div>
      <Footer />
    </>
  );
};
