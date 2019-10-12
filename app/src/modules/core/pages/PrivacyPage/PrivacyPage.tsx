import React from "react";
import Helmet from "react-helmet";

import Header from "../../../base/components/Header";
import Footer from "../../../base/components/Footer";

import useStyles from "./styles";

/**
 * Show the application's privacy policy.
 */
export const PrivacyPage: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <div className={classes.title}>
        <Header reduced />
      </div>
      <Footer />
    </>
  );
};
