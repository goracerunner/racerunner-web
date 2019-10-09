import React, { FC } from "react";
import { Typography } from "@material-ui/core";

import Logo from "../../../base/components/Logo";
import Background from "../../../base/components/Background";

import useStyles from "./styles";
import { DarkTheme } from "../../../base/components/Theme";
import Email from "../../../base/components/Email";

export const InProgressPage: FC = () => {
  const classes = useStyles();
  return (
    <DarkTheme>
      <Background />
      <div className={classes.heading}>
        <Typography variant="h5">
          <b>Welcome to</b>
        </Typography>
        <div className={classes.title}>
          <Logo inverted baseSize={70} className={classes.logo} />
          <Typography variant="h1" className={classes.titleText}>
            Race Runner
          </Typography>
        </div>
      </div>
      <div className={classes.body}>
        <Typography variant="h6" component="p">
          This platform will be available soon. See you in a jiffy!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please forward any enquiries to <Email />
        </Typography>
      </div>
    </DarkTheme>
  );
};
