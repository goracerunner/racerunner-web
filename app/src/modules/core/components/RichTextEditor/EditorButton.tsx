import React, { FC } from "react";

import Tooltip from "@material-ui/core/Tooltip";

import { EditorButtonProps } from "./types";
import { useEditorButtonStyles } from "./styles";

/**
 * A custom implementation of a button for the editor that
 * won't cause the text area to lose focus when clicked.
 */
export const EditorButton: FC<EditorButtonProps> = props => {
  const { onClick = () => {}, tooltip = "", disabled, children } = props;
  const classes = useEditorButtonStyles(props);

  // Prevent the default action when the button is clicked.
  // This stops the text area from losing focus.
  const handler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!disabled) onClick();
  };

  return (
    <Tooltip title={tooltip} placement="top">
      <div onMouseDown={handler} className={classes.button}>
        {children}
      </div>
    </Tooltip>
  );
};
