import React, { FC } from "react";
import Preview from "react-json-view";

import { JSONPreviewProps } from "./types";
// import useStyles from "./styles";

/**
 * This is a wrapper component for rendering a `ReactJSONView`
 * component with some default values.
 */
export const JSONPreview: FC<JSONPreviewProps> = props => {
  return (
    <Preview
      name={null}
      enableClipboard={false}
      displayDataTypes={false}
      displayObjectSize={false}
      {...props}
    />
  );
};
