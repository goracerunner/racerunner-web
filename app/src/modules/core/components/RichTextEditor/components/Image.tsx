import React, { FC } from "react";
import clsx from "clsx";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { CustomComponentProps } from "./types";

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    image: {
      width: "100%"
    }
  })
);

/**
 * This is a custom image component used to render
 * image blocks for the draft-js editor.
 */
const Image: FC<CustomComponentProps> = props => {
  const { image } = useStyles();
  const { contentState, block, className, theme = {} } = props;
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();

  return <img src={src} className={clsx(image, theme.image, className)} />;
};

export default Image;
