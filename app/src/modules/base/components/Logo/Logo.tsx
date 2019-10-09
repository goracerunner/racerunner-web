import React from "react";
import clsx from "clsx";

import logo from "../../../../assets/logo/logo.png";
import logoInverted from "../../../../assets/logo/logo-inverted.png";

import { LogoProps } from "./types";
import useStyles from "./styles";

/**
 * Render the logo. Change the variation via the
 * `logoOnly` and `inverted` props.
 */
export const Logo: React.FC<LogoProps> = props => {
  const classes = useStyles(props);

  const className = clsx(classes.img, props.className);
  const { inverted } = props;

  if (inverted) {
    return (
      <img className={className} src={logoInverted} alt="Race Runner logo" />
    );
  }

  return <img className={className} src={logo} alt="Race Runner logo" />;
};

Logo.defaultProps = {
  inverted: false,
  className: "",
  baseSize: 40
};
