import React, { FC, useState, useEffect, useCallback } from "react";
import clsx from "clsx";

import {
  EditorState,
  RichUtils,
  DraftEditorCommand,
  getDefaultKeyBinding,
  ContentBlock
} from "draft-js";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import { RichTextEditorToolbar } from "./RichTextEditorToolbar";
import { createDecorators } from "./decorators";
import plugins from "./plugins";

import { MAX_INDENT_DEPTH } from ".";
import { RichTextEditorProps } from "./types";
import { useEditorStyles } from "./styles";
import "./custom.scss";

/**
 * This component shows a rich text editor built on top of `draft-js`.
 */
export const RichTextEditor: FC<RichTextEditorProps> = props => {
  const classes = useEditorStyles(props);
  const {
    value,
    onChange = () => {},
    tokens = [],
    placeholder = "",
    textAlignment = "left",
    hideToolbar = false,
    plain = false,
    readOnly = false,
    classes: { root, editor, toolbar } = {
      root: undefined,
      editor: undefined,
      toolbar: undefined
    }
  } = props;

  // Load the state with the given HTML if available.
  // Otherwise, create an empty state.
  const [knownTokens, setKnownTokens] = useState(tokens);
  const [editorState, setEditorState] = useState(
    value
      ? EditorState.createWithContent(
          stateFromHTML(value),
          createDecorators(tokens)
        )
      : EditorState.createEmpty(createDecorators(tokens))
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

  // Capture when the editor state changes and update
  // the parent state if we are not in `readOnly` mode.
  useEffect(() => {
    const content = editorState.getCurrentContent();
    if (plain) {
      onChange(content.getPlainText(), content.getPlainText());
    } else {
      onChange(content.getPlainText(), stateToHTML(content));
    }
  }, [onChange, editorState, readOnly, plain]);

  // Handle default key commands
  const handleKeyCommand = useCallback(
    (command: DraftEditorCommand, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    []
  );

  // Handle indentation for lists using the TAB key
  const handleKeyBindings = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const newState = RichUtils.onTab(e, editorState, MAX_INDENT_DEPTH);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    }
    return getDefaultKeyBinding(e);
  };

  const blockStyleFn = (block: ContentBlock) => {
    switch (block.getType()) {
      case "atomic":
        return "draft-component-atomic";
      default:
        return "";
    }
  };

  return (
    <div className={clsx(classes.root, root, "draft-rich-text")}>
      {!hideToolbar && !readOnly && !plain && (
        <RichTextEditorToolbar
          classes={{ toolbar }}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      )}
      <div className={clsx(classes.editor, editor)}>
        <Editor
          readOnly={readOnly}
          stripPastedStyles={plain}
          editorState={editorState}
          onChange={state => setEditorState(state)}
          handleKeyCommand={plain ? undefined : handleKeyCommand}
          keyBindingFn={handleKeyBindings}
          textAlignment={textAlignment}
          blockStyleFn={blockStyleFn}
          plugins={plugins}
          placeholder={
            // Only show the placeholder if there is no unstyled block.
            // This is to prevent visual glitches when the user creates
            // a list block (e.g. ul or ol) and the indentation for
            // the placeholder is incorrect.
            !editorState.getCurrentContent().hasText() &&
            editorState
              .getCurrentContent()
              .getBlockMap()
              .first()
              .getType() !== "unstyled"
              ? ""
              : placeholder
          }
        />
      </div>
    </div>
  );
};
