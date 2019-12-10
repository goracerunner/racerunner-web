import React, { FC, useState, useEffect } from "react";
import clsx from "clsx";

import { EditorState, ContentBlock } from "draft-js";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import { stateFromHTML } from "draft-js-import-html";

import { createDecorators } from "./decorators";
import plugins from "./plugins";

import { RichTextPreviewProps } from "./types";
// import { usePreviewStyles } from "./styles";
import "./custom.scss";

export const RichTextPreview: FC<RichTextPreviewProps> = props => {
  // const classes = usePreviewStyles(props);
  const {
    value = "",
    tokens = [],
    textAlignment = "left",
    classes: { root, editor } = {
      root: undefined,
      editor: undefined
    }
  } = props;

  // Load the state with the given HTML if available.
  // Otherwise, create an empty state.
  const [knownTokens, setKnownTokens] = useState(tokens);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      stateFromHTML(value),
      createDecorators(tokens)
    )
  );

  // Update token decorators when recognised tokens change
  useEffect(() => {
    // If there is a difference in tokens, update editor decorators
    if (tokens.filter(x => knownTokens.includes(x)).length !== 0) {
      setKnownTokens(tokens);
      setEditorState(state =>
        EditorState.set(state, {
          // Create new decorator based on new tokens
          decorator: createDecorators(tokens)
        })
      );
    }
  }, [tokens, knownTokens, setKnownTokens, setEditorState]);

  // Update value when it changes
  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        stateFromHTML(value),
        createDecorators(tokens)
      )
    );
  }, [value, setEditorState, tokens]);

  const blockStyleFn = (block: ContentBlock) => {
    switch (block.getType()) {
      case "atomic":
        return "draft-component-atomic";
      default:
        return "";
    }
  };

  return (
    <div className={clsx(root, "draft-rich-text")}>
      <div className={clsx(editor)}>
        <Editor
          readOnly
          editorState={editorState}
          onChange={state => setEditorState(state)}
          textAlignment={textAlignment}
          blockStyleFn={blockStyleFn}
          plugins={plugins}
        />
      </div>
    </div>
  );
};
