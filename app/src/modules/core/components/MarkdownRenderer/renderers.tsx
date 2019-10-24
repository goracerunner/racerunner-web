import React, { FC } from "react";
import { Style } from "jss";

import Typography from "@material-ui/core/Typography";

import { HeadingProps } from "./types";

// Custom renderers for various Markdown components.

export const Paragraph: FC = ({ children }) => {
  return <Typography variant="body1">{children}</Typography>;
};

export const Heading: FC<HeadingProps> = ({ children, level }) => {
  let variant: Style = "body1";
  switch (level) {
    case 1:
      variant = "h1";
      break;
    case 2:
      variant = "h2";
      break;
    case 3:
      variant = "h3";
      break;
    case 4:
      variant = "h4";
      break;
    case 5:
      variant = "h5";
      break;
    case 6:
      variant = "h6";
      break;
  }
  return <Typography variant={variant}>{children}</Typography>;
};
