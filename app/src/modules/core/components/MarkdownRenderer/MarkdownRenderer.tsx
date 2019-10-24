import React, { FC } from "react";

import { MarkdownRendererProps } from "./types";

import { Paragraph, Heading } from "./renderers";

// FIXME: Import issues with Typescript, so we have to go with a require
// See documentation: https://github.com/rexxars/react-markdown
const Markdown = require("react-markdown");

/**
 * This component renders Markdown source and displays it.
 * Uses the `react-markdown` package under the hood.
 */
export const MarkdownRenderer: FC<MarkdownRendererProps> = ({ source }) => {
  const decoded = source.replace(/\\n/g, "\n\n");
  return (
    <Markdown
      source={decoded}
      skipHtml
      renderers={{
        // TODO: add more custom renderers.
        paragraph: Paragraph,
        heading: Heading
        // break,
        // emphasis,
        // strong,
        // thematicBreak,
        // blockquote,
        // delete,
        // link,
        // image,
        // linkReference,
        // imageReference,
        // table,
        // tableHead,
        // tableBody,
        // tableRow,
        // tableCell,
        // list,
        // listItem,
        // definition,
        // inlineCode,
        // code,
        // html,
        // virtualHtml,
        // parsedHtml,
      }}
    />
  );
};
