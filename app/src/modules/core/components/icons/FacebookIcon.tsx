import React from "react";

import useStyles from "./styles";
import icon from "../../../../assets/icons/facebook.png";

const FacebookIcon: React.FC = () => {
  const classes = useStyles();
  return <img className={classes.img} src={icon} alt="facebook icon" />;
};

export default FacebookIcon;
