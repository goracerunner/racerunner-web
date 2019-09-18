import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import logo from "../../../../assets/logo/logo.png";
import logoInverted from "../../../../assets/logo/logo-inverted.png";

import { RaceRunnerLogoProps } from "./types";
import useStyles from "./styles";

/**
 * Render the Race Runner Logo. Change the variation via the
 * `logoOnly` and `inverted` props.
 */
export const RaceRunnerLogo: React.FC<RaceRunnerLogoProps> = props => {
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

RaceRunnerLogo.propTypes = {
  inverted: PropTypes.bool,
  className: PropTypes.string,
  baseSize: PropTypes.number
};

RaceRunnerLogo.defaultProps = {
  inverted: false,
  className: "",
  baseSize: 40
};
