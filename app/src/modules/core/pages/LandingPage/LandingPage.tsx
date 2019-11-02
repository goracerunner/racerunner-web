import React, { useCallback } from "react";
import firebase from "firebase/app";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";

import { DarkTheme } from "../../../base/components/Theme";
import Background from "../../../base/components/Background";
import Logo from "../../../base/components/Logo";
import Footer from "../../../base/components/Footer";

import { useTransition } from "../../hooks/useTransitions";
import { useAuth } from "../../hooks/useFirebase";
import LoginForm from "../../components/LoginForm";
import RedirectAfterLogin from "../../components/RedirectAfterLogin";
import Authenticated, {
  AuthenticatedLoader
} from "../../components/Authenticated";

import useStyles from "./styles";

/**
 * Render the landing page for the site.
 */
export const LandingPage: React.FC = () => {
  const classes = useStyles();
  const auth = useAuth();

  const startLogin = useCallback(
    () => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()),
    [auth]
  );

  const zoomTitle = useTransition({ duration: 100 });
  const zoomName = useTransition({
    delay: 200,
    duration: 500
  });
  const fade = useTransition({ delay: 800, duration: 1500 });

  return (
    <>
      <AuthenticatedLoader />
      <Authenticated loading inverted>
        <Authenticated>
          <RedirectAfterLogin />
        </Authenticated>
        <DarkTheme>
          <Background />
          <div className={classes.heading}>
            <Zoom {...zoomTitle}>
              <Typography variant="h5" color="textSecondary">
                <b>Welcome to</b>
              </Typography>
            </Zoom>
            <Zoom {...zoomName}>
              <div className={classes.title}>
                <Logo inverted baseSize={70} className={classes.logo} />
                <Typography variant="h1" className={classes.titleText}>
                  Race&nbsp;Runner
                </Typography>
              </div>
            </Zoom>
          </div>
          <Fade {...fade}>
            <div>
              <Container maxWidth="md">
                <Typography variant="h6" className={classes.subtitle}>
                  <em>The scavenger hunt experience brought online</em>
                </Typography>
                <Authenticated inverted>
                  <div className={classes.signIn}>
                    <Typography variant="body2">
                      <b>Sign in to continue</b>
                    </Typography>
                    <LoginForm startLogin={startLogin} />
                  </div>
                </Authenticated>
                <Footer />
              </Container>
            </div>
          </Fade>
        </DarkTheme>
      </Authenticated>
    </>
  );
};
