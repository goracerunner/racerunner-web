import React, { FC } from "react";
import { RichUtils } from "draft-js";
import clsx from "clsx";

import SizeIcon from "@material-ui/icons/FormatSize";
import BoldIcon from "@material-ui/icons/FormatBold";
import ItalicIcon from "@material-ui/icons/FormatItalic";
import UnderlineIcon from "@material-ui/icons/FormatUnderlined";
import StrikethroughIcon from "@material-ui/icons/StrikethroughS";
import UnorderedListIcon from "@material-ui/icons/FormatListBulleted";
import OrderedListIcon from "@material-ui/icons/FormatListNumbered";
import LinkIcon from "@material-ui/icons/InsertLink";
import ImageIcon from "@material-ui/icons/InsertPhoto";

import { useBooleanState } from "../../../base/hooks/useStateFactory";

import imagePlugin from "./plugins/imagePlugin";
import { EditorButton } from "./EditorButton";

import { RichTextEditorToolbarProps } from "./types";
import { useToolbarStyles } from "./styles";
import { AddImageDialog } from "./dialogs/AddImageDialog";

/**
 * This component shows the toolbar buttons for the rich text editor.
 */
export const RichTextEditorToolbar: FC<RichTextEditorToolbarProps> = props => {
  const classes = useToolbarStyles(props);
  const {
    editorState,
    setEditorState,
    classes: { toolbar } = { toolbar: null }
  } = props;

  const [showImage, openImage, closeImage] = useBooleanState(false);

  // Handler for applying inline styles
  const style = (inlineStyle: string) => () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // Handler for changing the block type
  const format = (blockType: string) => () => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Handler for inserting an image url
  const insertImage = (url: string) => {
    setEditorState(imagePlugin.addImage(editorState, url));
  };

  return (
    <>
      <div className={clsx(classes.toolbar, toolbar)}>
        <EditorButton disabled tooltip="This feature is currently unavailable.">
          <SizeIcon fontSize="small" color="disabled" />
        </EditorButton>
        <div className={classes.divider} />
        <EditorButton onClick={style("BOLD")} tooltip="Bold">
          <BoldIcon fontSize="small" />
        </EditorButton>
        <EditorButton onClick={style("ITALIC")} tooltip="Italic">
          <ItalicIcon fontSize="small" />
        </EditorButton>
        <EditorButton onClick={style("UNDERLINE")} tooltip="Underline">
          <UnderlineIcon fontSize="small" />
        </EditorButton>
        <EditorButton onClick={style("STRIKETHROUGH")} tooltip="Strikethrough">
          <StrikethroughIcon fontSize="small" />
        </EditorButton>
        <div className={classes.divider} />
        <EditorButton
          onClick={format("ordered-list-item")}
          tooltip="Numbered list"
        >
          <OrderedListIcon fontSize="small" />
        </EditorButton>
        <EditorButton
          onClick={format("unordered-list-item")}
          tooltip="Bullet list"
        >
          <UnorderedListIcon fontSize="small" />
        </EditorButton>
        <div className={classes.divider} />
        <EditorButton onClick={() => openImage()} tooltip="Insert image">
          <ImageIcon fontSize="small" />
        </EditorButton>
        <EditorButton disabled tooltip="This feature is currently unavailable.">
          <LinkIcon fontSize="small" color="disabled" />
        </EditorButton>
      </div>
      <AddImageDialog
        open={showImage}
        onClose={closeImage}
        onConfirm={url => insertImage(url)}
      />
    </>
  );
};
