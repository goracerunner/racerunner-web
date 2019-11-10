import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import Header from "../../../base/components/Header";
import Footer from "../../../base/components/Footer";
import Email from "../../../base/components/Email";

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
      <Container maxWidth="md">
        <div className={classes.title}>
          <Header reduced />
        </div>
        <Typography variant="h5" className={classes.heading}>
          <b>Terms Of Use</b>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last updated 24th October, 2019
        </Typography>
        <Paper className={classes.paper}>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              1. Agreement
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              These Terms of Use apply to the Race Runner website located at{" "}
              <a className="dark link" href="https://goracerunner.web.app">
                goracerunner.web.app
              </a>{" "}
              (also referred to as the "Site").
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              <b>
                Your use of this Site is deemed to be your acceptance of these
                Terms of Use. Please do not use this Site if you do not agree to
                these Terms of Use.
              </b>
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              We may modify the Terms of Use at any time. The date at the top of
              these Terms of Use tell you when it was last updated. Any changes
              to these Terms of Use become effective when we publish it online.
              By accessing this Site and using its services, you accept and
              agree to the currently published revision of the Terms of Use.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              2. Content
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              The content available on this Site is soley to be used for running
              a <em>Race Runner</em> event, which is a social event which
              requires participants (as teams or individuals) to complete
              activities and enter data into this website for tracking progress
              and results.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              Personal information accessed via the Site must be used in
              accordance with these Terms of Use and our{" "}
              <Link className="dark link" to="/privacy">
                Privacy Policy
              </Link>
              .
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              The source code of this Site is licensed under the{" "}
              <a
                className="dark link"
                href="https://www.apache.org/licenses/LICENSE-2.0"
              >
                Apache-2.0 license.
              </a>
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              3. Use of the Site
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              You agree to use the Site only for lawful purposes, and in a
              manner that does not infringe the rights of or restrict or inhibit
              the use of this Site by any third party.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              You agree to use and disclose any Personal Information you have
              access to via the Site in accordance with our{" "}
              <Link className="dark link" to="/privacy">
                Privacy Policy
              </Link>
              , and for the sole purpose of running <em>Race Runner</em> events.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              You agree to use the Site for the sole purpose of running{" "}
              <em>Race Runner</em> events. Alternative uses of this Site are
              prohibited and is considered a violation of these Terms of Use.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              4. Accounts, Passwords and Security
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              The safety and security of your account on this Site is your
              responsibility. You are liable for all actions performed on the
              Site using your credentials.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              It is your responsibility to protect the password and access to
              your account to the best of your ability. Failure to do so is a
              violation of these Terms of Use.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              5. Privacy
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              The Site collects, uses and discloses Personal Information in
              accordance with our{" "}
              <Link className="dark link" to="/privacy">
                Privacy Policy
              </Link>
              . By using this site, you acknowledge and give consent for the use
              of your Personal Information in accordance our{" "}
              <Link className="dark link" to="/privacy">
                Privacy Policy
              </Link>
              .
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              6. Feedback
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              If you have any feedback or queries, please contact us through the
              email listed below.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              Email: <Email dark />
            </Typography>
          </div>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};
