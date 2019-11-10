import React from "react";

import useStyles from "./styles";
import icon from "../../../../assets/icons/google.png";

const GoogleIcon: React.FC = () => {
  const classes = useStyles();
  return <img className={classes.img} src={icon} alt="google icon" />;
};

export default GoogleIcon;
