import React from "react";
import { Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

/**
 * The Footer component renders footer links.
 */
export const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.links}>
        <Link to="/" className="footer link">
          Home
        </Link>
        <span className={classes.spacer}>·</span>
        <Link to="/terms" className="footer link">
          Terms
        </Link>
        <span className={classes.spacer}>·</span>
        <Link to="/privacy" className="footer link">
          Privacy
        </Link>
        <span className={classes.spacer}>·</span>
        <a href="mailto:contact@benyap.com" className="footer link">
          Support
        </a>
      </div>
      <Divider className={classes.divider} />
      <Typography variant="body2" className={classes.bottom}>
        &copy; {new Date().getFullYear()}{" "}
        <a href="https://goracerunner.web.app" className="footer link">
          Race Runner
        </a>
      </Typography>
    </div>
  );
};
