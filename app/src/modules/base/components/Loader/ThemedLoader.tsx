import React from "react";

import Loader from "../Loader";
import Theme from "../Theme";

import { LoaderProps } from "./types";

/**
 * A variant of the loader which wraps it with the default
 * Material UI theme so that this component can be used
 * outside of the normal hierarchy whilst still having the
 * correct styles.
 */
export const ThemedLoader: React.FC<LoaderProps> = props => (
  <Theme>
    <Loader {...props} />
  </Theme>
);
