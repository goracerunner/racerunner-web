import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Header from "../../../base/components/Header";
import Footer from "../../../base/components/Footer";
import Container from "../../../base/components/Container";
import Email from "../../../base/components/Email";

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
      <Container>
        <div className={classes.title}>
          <Header reduced />
        </div>
        <Typography variant="h5" className={classes.heading}>
          <b>Privacy Policy</b>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last updated 24th October, 2019
        </Typography>
        <Paper className={classes.paper}>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              1. Introduction
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              This Privacy Policy is designed to help you understand how your
              data is collected, used and disclosed by the <em>Race Runner</em>{" "}
              website, and applies to content and data that is collected, used
              and disclosed by the <em>Race Runner</em> website, located at{" "}
              <a className="dark link" href="https://goracerunner.web.app">
                goracerunner.web.app
              </a>{" "}
              (also referred to as the "Site").
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              This platform's intention is solely to provide a service with
              which can run a social event where participants, as individuals or
              teams, perform a series of challenges and collect points through
              various means through the application.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              Personal Information is information which identifies you, or from
              which you can be reasonably identified, and includes (but is not
              limited to) your full name, email address, images of you and
              geolocation data.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              To use this Site at its full capacity, we require you to create a
              personal account and disclose Personal Information. This Privacy
              Policy explains how we <b>collect</b>, <b>use</b> and{" "}
              <b>disclose</b> information about you.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              By using this Site, you authorise us to use your Personal
              Information in accordance with this Privacy Policy. Please note
              that this Privacy Policy acts in accordance with the Terms of Use,
              which you agree to when you use this Site.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              2. What information do we collect?
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              We collect Personal Information to help identify the users on the
              Site and to provide the functionality of the Site to each user. If
              you choose not to provide the information we request from you,
              some functionality on the Site may not be usable. We describe the
              main types of Personal Information we collect below.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              <b>Registration information</b> is collected when you register an
              account on the Site, such as your full name and email address.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              <b>Information from third party Social Media</b> may be recorded
              when you log in using platforms such as Facebook, and may include:
            </Typography>
            <ul>
              <li>your username and email for that service</li>
              <li>
                any information you have permitted that service to share with
                us, such as your profile picture
              </li>
              <li>
                any other information you have made public through that service
              </li>
            </ul>
            <Typography variant="body2" className={classes.paragraph}>
              We do not collect your social media profile password. When you
              access this Site through your social media profile, you authorise
              us to collect and handle your personal information in accordance
              with this Privacy Policy.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              <b>Participant involvement data</b> is collected when you
              participate in a race and upload data as part of event. This may
              include, but is not limited to:
            </Typography>
            <ul>
              <li>answers to challenges</li>
              <li>uploaded images</li>
              <li>geolocation data</li>
            </ul>
            <Typography variant="body2" className={classes.paragraph}>
              <b>Activity information</b> on the Site may be recorded and
              stored. Our servers may record information about your activity,
              such as your IP address, your device type, pages you viewed,
              resources you accessed, and other software or hardware
              information.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              3. How do we use your information?
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              We use the information we collect about you to provide services to
              you on this Site. We may use your Personal Information to:
            </Typography>
            <ul>
              <li>
                fulfill administrative functions on the Site (such as account
                management)
              </li>
              <li>
                allow you to participate in features on the Site that require
                identification
              </li>
              <li>
                measure and improve the functionality provided by this Site
              </li>
              <li>provide you with support and to respond to your enquiries</li>
            </ul>
            <Typography variant="body2" className={classes.paragraph}>
              The information we collect on this Site will never be given or
              sold to third parties. We will never use information you provide
              to us to deliver marketing or promotional materials to you.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              4. How do we disclose your information?
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              No Personal Information is publically accessible. Only protected
              areas of the Site, which require the use of verified credentials,
              may disclose Personal Information in accordance with this Privacy
              Policy. We use reasonable measures to safeguard the Personal
              Information we hold about you from loss, theft and unauthorised
              use, disclosure or modification.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              Your full name and profile picture may be disclosed to other users
              who use our Site. All of your Personal Information you provide to
              this site may be accessed by race managers and administrators for
              the purposes of running a <em>Race Runner</em> event. By using
              this Site, you are allowing the disclosure of such information by
              us. See the{" "}
              <Link className="dark link" to="terms">
                Terms of Use
              </Link>
              .
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              5. How can you access and update your information?
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              If you would like to access, review, correct or update your
              Personal Information, please contact us.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              6. Other important information
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              <b>Updates to Privacy Policy.</b> We may modify this Privacy
              Policy at any time. The date at the top of this Privacy Policy
              tells you when it was last updated. Any changes to this Privacy
              Policy become effective when we publish it online. If you do not
              agree with changes to this Privacy Policy, you may terminate your
              account with us.
            </Typography>
            <Typography variant="body2" className={classes.paragraph}>
              <b>Location of Data.</b> Some parts of the Site and data are
              hosted in and managed outside of Australia. In using this Site,
              you consent to this practice, understanding that your Personal
              Information may be accessible from or transmitted outside
              Australia.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.heading}>
              7. Feedback
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
